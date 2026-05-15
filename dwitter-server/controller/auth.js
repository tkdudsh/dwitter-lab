import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import * as repository from "../repository/auth.js";

dotenv.config();

/**
 * 로그인
 */
export const getLogin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await repository.getLogin(username);
    
    if(!user.count) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }   
    
    const token = jwt.sign({ 
      id: user.id, 
      username: user.username 
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
    res.json({  token, 
                user: { id: user.id, 
                        username: user.username, 
                        profileImage: user.avatar_url 
              } });
    
  } catch {
    res.status(500).json({ message: '서버 오류' });
  }
}


/**
 * 회원가입
 */
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
