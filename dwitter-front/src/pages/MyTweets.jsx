import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  //로그인 정보 담은 객체
import { tweetAPI } from "../api/authApi.js";
import TweetComposer from "../components/TweetComposer";
import TweetCard from "../components/TweetCard";
import styles from "./Feed.module.css";

export default function MyTweets() {
  const { user, ready } = useAuth();  //로그인 인증 여부 확인
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // if (!ready) return;
    if (!user) {
      navigate("/login");
      return;
    }

    //tweetAPI는 비동기식, promise 리턴!!
    tweetAPI.getMy()
      .then(setTweets)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [ready, user]);

  const handlePost = async (content) => {
    const tweet = await tweetAPI.create(content);
    setTweets((prev) => [tweet, ...prev]);
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
      <TweetComposer onPost={handlePost} />
      <div className={styles.pageTitle}>내 트윗</div>

      {loading && <p className={styles.state}>불러오는 중…</p>}
      {error && <p className={styles.err}>{error}</p>}
      {!loading && !error && tweets.length === 0 && (
        <p className={styles.state}>아직 작성한 트윗이 없습니다.</p>
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
