// =====================================================
// 2단계: 실제 백엔드 API 연동
// vite.config.js proxy → /api, /upload → http://localhost:3001
// =====================================================

const BASE = "/api";

// ── 공통 헬퍼 ─────────────────────────────────────────
function getToken() {
  return localStorage.getItem("dwitter_token");
}

function buildHeaders(auth = false) {
  const h = { "Content-Type": "application/json" };
  if (auth) h["Authorization"] = `Bearer ${getToken()}`;
  return h;
}

// ✅ 2단계: 401 응답 시 전역 이벤트 발생 → AuthContext가 자동 로그아웃 처리
async function request(url, options = {}) {
  const res  = await fetch(url, options);
  const data = await res.json();

  if (res.status === 401) {
    // 토큰 만료 또는 인증 실패 → 전역 이벤트로 AuthContext에 알림
    window.dispatchEvent(new Event("auth:401"));
    throw new Error(data.message || "인증이 만료되었습니다. 다시 로그인해주세요.");
  }

  if (!res.ok) throw new Error(data.message || "요청 실패");
  return data;
}

// ── Auth ──────────────────────────────────────────────
export const authAPI = {
  login: (body) =>
    request(`${BASE}/auth/login`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    }),

  register: (body) =>
    request(`${BASE}/auth/register`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    }),
};

// ── Tweets ────────────────────────────────────────────
export const tweetAPI = {
  getAll: () =>
    request(`${BASE}/tweets`, { headers: buildHeaders() }),

  getMy: () =>
    request(`${BASE}/tweets/my`, { headers: buildHeaders(true) }),

  create: (content) =>
    request(`${BASE}/tweets`, {
      method: "POST",
      headers: buildHeaders(true),
      body: JSON.stringify({ content }),
    }),

  update: (id, content) =>
    request(`${BASE}/tweets/${id}`, {
      method: "PUT",
      headers: buildHeaders(true),
      body: JSON.stringify({ content }),
    }),

  remove: (id) =>
    request(`${BASE}/tweets/${id}`, {
      method: "DELETE",
      headers: buildHeaders(true),
    }),
};
