import express from 'express';
import cors from 'cors';

const PORT = 9000;
const app = express();

app.use(cors());
app.use(express.json()); 

//app 라우팅 추가

app.listen(PORT, () => {
    console.log(`📡 Server Start ==>> ${PORT}`);
});
