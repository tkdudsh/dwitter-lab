//1. express 라이브러리, 미들웨어 임포트 
// const express = require('express'); //type=commonjs
import express from 'express';
import cors from 'cors';

//2. express 객체 생성
const PORT = 9000;
const app = express();

//3. 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//4. 라우팅
app.get("/api/get", (req, res, next) => {
    const fruits = [
        { "name": "apple", "color": "red", "emoji": "🍎" },
        { "name": "lemon", "color": "yellow", "emoji": "🍋" },
        { "name": "tomato", "color": "red", "emoji": "🍅" },
    ]
    res.json({"fruits": fruits});
});

app.get("/api/products", (req, res, next) => {
    const products = [
        {
            "pid": "P0001",
            "name": "갸또 쇼콜라",
            "price": 43000,
            "img": "/images/product1.jpg"
        },
        {
            "pid": "P0002",
            "name": "쉭쎄",
            "price": 20000,
            "img": "/images/product2.jpg"
        },
        {
            "pid": "P0003",
            "name": "초코 구운과자 묶음",
            "price": 13000,
            "img": "/images/product3.jpg"
        },
        {
            "pid": "P0004",
            "name": "통팥앙금빵",
            "price": 2500,
            "img": "/images/product4.jpg"
        },
        {
            "pid": "P0005",
            "name": "브라우니",
            "price": 20800,
            "img": "/images/product5.jpg"
        }
        ];
    res.json({"products": products});
});

//pid 값이 파라미터로 전달
app.get("/api/products/:pid", (req, res) => {  
    // console.log(req.params.pid);
    res.json({"result": `${req.params.pid}의 상세정보`});
});

app.post("/api/post",(req,res)=>{
    console.log(req.body);
})


//5. 서버 시작
app.listen(PORT, () => {
    console.log(`서버 실행 ==>> ${PORT}`);
});