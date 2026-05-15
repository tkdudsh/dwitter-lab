import pool from "../db.js";

/**
 * 로그인
 */
export const getLogin = async(username) => {
  const sql = `
      SELECT
        (SELECT COUNT(*) FROM users WHERE username = ?) AS count,
        v.id,
        v.username,
        v.password,
        v.avatar_url
    FROM (SELECT 1) dummy
    LEFT JOIN (
        SELECT id, username, password, avatar_url
        FROM users
        WHERE username = ?
    ) v ON 1=1
  `;
  const [rows] = await pool.execute(sql, [username, username]);
  return rows[0];  //{ count:1, password:...}
}



/**
 * 회원가입
 */
export const signUp = async (userData) => {
  const { userName, password, profileImage } = userData;

  const sql = `insert into users (username, password, avatar_url, created_at) 
                values (?, ?, ?, now())`;

  const [results] = await pool.execute(sql, [userName, password, profileImage]);

  return results;
};
