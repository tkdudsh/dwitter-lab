// =====================================================
// 2단계: 로그인 — 실제 서버 API 연동
// authApi.js가 실제 fetch()를 호출하므로 이 파일은 1단계와 동일
// =====================================================
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/authApi.js";
import styles from "./Auth.module.css";

const RULES = {
  username: [
    { test: (v) => v.trim().length > 0,        msg: "아이디를 입력해주세요." },
    { test: (v) => v.trim().length >= 3,        msg: "아이디는 3자 이상이어야 합니다." },
    { test: (v) => /^[a-zA-Z0-9_]+$/.test(v),  msg: "영문, 숫자, 밑줄(_)만 사용 가능합니다." },
  ],
  password: [
    { test: (v) => v.length > 0,  msg: "비밀번호를 입력해주세요." },
    { test: (v) => v.length >= 6, msg: "비밀번호는 6자 이상이어야 합니다." },
  ],
};

function validate(form) {
  const errors = {};  
  for (const [field, rules] of Object.entries(RULES)) {
    for (const { test, msg } of rules) {
      if (!test(form[field])) { errors[field] = msg; break; }
    }
  }
  return errors;
}

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form,        setForm]        = useState({ username: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched,     setTouched]     = useState({});
  const [serverError, setServerError] = useState("");
  const [loading,     setLoading]     = useState(false);

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (touched[key]) {
        const errs = validate(next);
        setFieldErrors((prev) => ({ ...prev, [key]: errs[key] }));
      }
      return next;
    });
  };

  // input 폼에 name field가 존재하는 경우!!
  // const handleChange = (e) => {
  //   const {name, value} = e.target;
  //   setForm((f) => {
  //     const next = { ...f, [name]: value };
  //     if (touched[name]) {
  //       const errs = validate(next);
  //       setFieldErrors((prev) => ({ ...prev, [name]: errs[name] }));
  //     }
  //     return next;
  //   });
  // };

  const handleBlur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    const errs = validate(form);
    setFieldErrors((prev) => ({ ...prev, [key]: errs[key] }));
  };

  const handleSubmit = async () => {
    setTouched({ username: true, password: true });
    const errs = validate(form);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setServerError("");
    setLoading(true);
    try {
      // ✅ 2단계: 실제 서버 로그인 API 호출
      const data = await authAPI.login(form);
      login(data.user, data.token);  //localStorage에 token, user정보 저장
      navigate("/");
    } catch (e) {
      // 서버에서 반환한 에러 메시지 표시 (예: "아이디 또는 비밀번호가 틀렸습니다.")
      setServerError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => e.key === "Enter" && handleSubmit();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src="favicon.ico" className={styles.bird} />
          Dwitter 로그인
        </div>

        {serverError && <div className={styles.errorBox}>{serverError}</div>}

        <div className={styles.fieldWrapper}>
          <input
            className={`${styles.input} ${fieldErrors.username ? styles.inputError : ""}`}
            type="text"
            placeholder="아이디"
            // name="username"
            value={form.username}
            onChange={handleChange("username")} 
            onBlur={handleBlur("username")}
            // onKeyDown={onKey}
          />
          {fieldErrors.username && (
            <span className={styles.fieldError}>{fieldErrors.username}</span>
          )}
        </div>

        <div className={styles.fieldWrapper}>
          <input
            className={`${styles.input} ${fieldErrors.password ? styles.inputError : ""}`}
            type="password"
            placeholder="비밀번호"
            // name="password"
            value={form.password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            onKeyDown={onKey}
          />
          {fieldErrors.password && (
            <span className={styles.fieldError}>{fieldErrors.password}</span>
          )}
        </div>

        <button className={styles.btn} 
                onClick={handleSubmit} 
                disabled={loading}>
          {loading ? "로그인 중…" : "로그인"}
        </button>

        <p className={styles.foot}>
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
