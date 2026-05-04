import express from 'express';
import cors from 'cors';


const port = 9000;
const app = express();

app.use(cors()); //모든 프론트 허용
app.use(express.json());// 프론트서 넘어오는 타입을 json으로 변환
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{
    res.send('response -> server.js');
})
app.get('/api/get',(req,res,next)=>{
    console.log('/api/get 요청');

    const fruitList=[
        {name:"사과",
            color:"빨간색",
            emoji:"^^"
        },
        {name:"사과",
            color:"빨간색",
            emoji:"^^"
        }
        
    ]
    res.json({"list":fruitList});
})

app.post('/api/post',(req,res,next)=>{
    console.log('api/post 요청',req.body.name);
    res.json({"result":req.body.name});
});

app.listen(port,()=>{
    console.log(`${port}서버 실행`);
});