import { useState } from 'react';
import styles from './TweetComposer.module.css';

export default function TweetComposer({ onPost }) {
  const [text,    setText]    = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const submit = async () => {
    if (!text.trim() || loading) return;
    setError('');
    setLoading(true);
    try {
      await onPost(text.trim());
      setText('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <input
          className={styles.input}
          placeholder="Edit your tweet"
          value={text}
          maxLength={280}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => (e.ctrlKey || e.metaKey) && e.key === 'Enter' && submit()}
        />
        <button className={styles.btn} onClick={submit} disabled={!text.trim() || loading}>
          {loading ? '...' : 'Post'}
        </button>
      </div>
      {error && <p className={styles.err}>{error}</p>}
    </div>
  );
}
