// =====================================================
// 2단계: AuthContext — 401 자동 로그아웃 추가
// 토큰 만료/인증 실패 시 전역에서 감지하여 로그아웃 처리
// =====================================================
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  // 새로고침 시 localStorage에서 복원
  useEffect(() => {
    const savedToken = localStorage.getItem("dwitter_token");
    const savedUser = localStorage.getItem("dwitter_user");
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("dwitter_token");
        localStorage.removeItem("dwitter_user");
      }
    }
    setReady(true);
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("dwitter_token", jwt);
    localStorage.setItem("dwitter_user", JSON.stringify(userData));
  };

  // ✅ 2단계: useCallback으로 메모이제이션 (이벤트 리스너에서 안정적으로 사용)
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("dwitter_token");
    localStorage.removeItem("dwitter_user");
  }, []);

  // ✅ 2단계: 전역 401 감지 — API 어디서든 인증 실패 시 자동 로그아웃
  useEffect(() => {
    const handle401 = () => {
      logout();
      // 로그인 페이지로 이동 (navigate는 Context 밖이므로 이벤트 방식 사용)
      window.location.href = "/login";
    };
    window.addEventListener("auth:401", handle401);
    return () => window.removeEventListener("auth:401", handle401);
  }, [logout]);

  // TODO (3단계): Refresh Token 자동 갱신 로직 추가 예정

  return (
    <AuthContext.Provider value={{ user, token, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
