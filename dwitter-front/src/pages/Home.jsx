import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { tweetAPI } from "../api/authApi.js";
import TweetComposer from "../components/TweetComposer.jsx";
import TweetCard from "../components/TweetCard.jsx";
import styles from "./Feed.module.css";

export default function Home() {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    tweetAPI
      .getAll()
      .then(setTweets)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [isCreated]);

  const handlePost = async (content) => {
    const {result} = await tweetAPI.create(content);
    if(result) setIsCreated(!isCreated);
  };

  const handleDelete = async (id) => {
    await tweetAPI.remove(id);
    setTweets((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdate = async (id, content) => {
    await tweetAPI.update(id, content);
    setTweets((prev) => prev.map((t) => (t.id === id ? { ...t, content } : t)));
  };

  return (
    <div className={styles.feed}>
      {user && <TweetComposer onPost={handlePost} />}

      {loading && <p className={styles.state}>불러오는 중…</p>}
      {error && <p className={styles.err}>{error}</p>}
      {!loading && !error && tweets.length === 0 && (
        <p className={styles.state}>아직 트윗이 없습니다.</p>
      )}

      {tweets.map((t) => (
        <TweetCard
          key={t.id}
          tweet={t}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
