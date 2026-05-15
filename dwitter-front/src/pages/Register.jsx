// =====================================================
// 2단계: 회원가입 — 실제 파일 업로드 연동
// /upload 엔드포인트로 이미지 전송 후 profileImage 포함
// =====================================================
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/authApi.js";
import styles from "./Auth.module.css";

function validate(form) {
  const errors = {};
  if (!form.userName.trim()) {
    errors.userName = "아이디를 입력해주세요.";
  } else if (form.userName.length < 3) {
    errors.userName = "아이디는 3자 이상이어야 합니다.";
  } else if (!/^[a-zA-Z0-9_]+$/.test(form.userName)) {
    errors.userName = "아이디는 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.";
  }
  if (!form.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (form.password.length < 6) {
    errors.password = "비밀번호는 6자 이상이어야 합니다.";
  }
  return errors;
}

export default function Register() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]               = useState({ userName: "", password: "" });
  const [error, setError]             = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading]         = useState(false);
  const [file, setFile]               = useState(null);
  const [preview, setPreview]         = useState(null);

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if (!selected.type.startsWith("image/")) {
      setFieldErrors((prev) => ({ ...prev, file: "이미지 파일만 업로드할 수 있습니다." }));
      return;
    }
    const MAX_SIZE = 5 * 1024 * 1024;
    if (selected.size > MAX_SIZE) {
      setFieldErrors((prev) => ({ ...prev, file: "파일 크기는 5MB 이하여야 합니다." }));
      return;
    }
    setFieldErrors((prev) => ({ ...prev, file: "" }));
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async () => {
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setError("");
    setLoading(true);
    try {
      // ✅ 2단계: 파일이 있으면 서버 업로드 먼저
      let profileImage = "";
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res  = await fetch("/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("이미지 업로드 실패");
        const data = await res.json();
        profileImage = data.filename;
      }

      // ✅ 2단계: 실제 서버 회원가입 API 호출
      const data = await authAPI.register({ ...form, profileImage });
      login(data.user, data.token);
      navigate("/");
    } catch (e) {
      setError(e.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src="favicon.ico" className={styles.bird} /> Dwitter 회원가입
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <input
          className={`${styles.input} ${fieldErrors.userName ? styles.inputError : ""}`}
          type="text"
          placeholder="아이디"
          value={form.userName}
          onChange={handleChange("userName")}
        />
        {fieldErrors.userName && (
          <p className={styles.fieldError}>{fieldErrors.userName}</p>
        )}

        <input
          className={`${styles.input} ${fieldErrors.password ? styles.inputError : ""}`}
          type="password"
          placeholder="비밀번호 (6자 이상)"
          value={form.password}
          onChange={handleChange("password")}
        />
        {fieldErrors.password && (
          <p className={styles.fieldError}>{fieldErrors.password}</p>
        )}

        {/* 프로필 사진 — 2단계: 실제 업로드 동작 */}
        <div className={styles.fileWrap}>
          {preview && (
            <img src={preview} alt="프로필 미리보기" className={styles.preview} />
          )}
          <label className={styles.fileLabel}>
            📷 프로필 사진 선택
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
          {file && <span className={styles.fileName}>{file.name}</span>}
          {fieldErrors.file && (
            <p className={styles.fieldError}>{fieldErrors.file}</p>
          )}
        </div>

        <button className={styles.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? "처리 중…" : "회원가입"}
        </button>

        <p className={styles.foot}>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
}
