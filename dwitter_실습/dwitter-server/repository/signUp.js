import pool from "../db.js";

export const signUp = async (userData) => {
  const { userName, password, profileImage } = userData;

  const sql = `insert into users (username, password, avatar_url, created_at) 
                values (?, ?, ?, now())`;

  const [results] = await pool.execute(sql, [userName, password, profileImage]);

  return results;
};
