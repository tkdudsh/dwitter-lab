import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useAuth } from '../context/AuthContext';
import styles from './TweetCard.module.css';

dayjs.extend(relativeTime);
dayjs.locale('ko');

// 유저명 첫 글자 + 색상으로 아바타 생성
const COLORS = ['#1da1f2','#e0245e','#17bf63','#ffad1f','#794bc4','#f45d22'];
function Avatar({ username, profileImage }) {

  const color   = COLORS[username.charCodeAt(0) % COLORS.length];
  const initial = username[0]?.toUpperCase() ?? '?';
  return (
    <div className={styles.avatar} style={{ background: color }}>
      { profileImage ? 
        <img  className={styles.avatar}
              src={`http://localhost:3001/uploads/${profileImage}`} 
              alt="프로필" />
        : initial
      }
    </div>
)}

export default function TweetCard({ tweet, onDelete, onUpdate }) {
  const { user } = useAuth();
  const [editing,  setEditing]  = useState(false);
  const [editText, setEditText] = useState(tweet.content);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState('');

  const isOwner = user?.id === tweet.user_id;

  const handleSave = async () => {
    if (!editText.trim()) return;
    setSaving(true);
    setError('');
    try {
      await onUpdate(tweet.id, editText.trim());
      setEditing(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('트윗을 삭제할까요?')) return;
    try { await onDelete(tweet.id); }
    catch (e) { alert(e.message); }
  };

  const cancelEdit = () => { setEditing(false); setEditText(tweet.content); setError(''); };

  return (
    <div className={styles.card}>
      <Avatar username={tweet.username}
              profileImage={tweet.avatar_url}/>

      <div className={styles.body}>
        {/* 헤더 */}
        <div className={styles.header}>
          <span className={styles.name}>{tweet.username}</span>
          <span className={styles.handle}>@{tweet.username}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.time}>{dayjs(tweet.created_at).fromNow()}</span>
        </div>

        {/* 본문 or 편집 */}
        {editing ? (
          <div className={styles.editWrap}>
            <input
              className={styles.editInput}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
            {error && <p className={styles.err}>{error}</p>}
            <div className={styles.editBtns}>
              <button className={styles.saveBtn}   onClick={handleSave}  disabled={saving}>
                {saving ? '저장 중…' : '저장'}
              </button>
              <button className={styles.cancelBtn} onClick={cancelEdit}>취소</button>
            </div>
          </div>
        ) : (
          <p className={styles.content}>{tweet.content}</p>
        )}
      </div>

      {/* 본인 트윗에만 수정/삭제 버튼 */}
      {isOwner && !editing && (
        <div className={styles.actions}>
          <button className={styles.editBtn}   onClick={() => setEditing(true)} title="수정">✎</button>
          <button className={styles.deleteBtn} onClick={handleDelete}           title="삭제">✕</button>
        </div>
      )}
    </div>
  );
}
