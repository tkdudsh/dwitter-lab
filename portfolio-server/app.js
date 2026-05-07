import express from 'express';
import cors from 'cors';
import headerRouter from './routes/header.js';
import contentRouter from './routes/content.js';
import footerRouter from './routes/footer.js';

const PORT = 9000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/header', headerRouter);
app.use('/content', contentRouter);
app.use('/footer', footerRouter);


app.listen(PORT, ()=> {
    console.log(`서버 실행 ---->> `, PORT);
});
