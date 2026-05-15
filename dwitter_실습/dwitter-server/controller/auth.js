import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as repository from "../repository/signUp.js";

export const getAuth = async (req, res) => {
  const SECRET = process.env.JWT_SECRET; // .env에서 불러오기
  const { userName, password, profileImage } = req.body;

  try {
    //패스워드 암호화
    const hashed = await bcrypt.hash(req.body.password, 10);
      const result = await repository.signUp({
      userName,
      password: hashed,
      profileImage,
    });

    const token = jwt.sign({ id: result.insertId, userName }, SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ token, user: { id: result.insertId, userName } });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(409).json({ message: "이미 사용 중인 아이디입니다." });
    res.status(500).json({ message: "서버 오류" });
  }
};
