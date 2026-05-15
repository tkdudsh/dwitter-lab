import * as repository from '../repository/tweets.js';


/**
 * getAll
 */
export const getAll = async (req, res) => {
    try {
        const rows = await repository.getAll();
        res.json(rows);
    } catch (err) {
        console.error('[GET /tweets]', err);
        res.status(500).json({ message: '서버 오류' });
    }
}


/**
 * MyTweet Create
 */
export const createMyTweet = async (req, res) => {
    const { content } = req.body;

    try {
        const result = await repository.create(content, req.user.id);
        if(result.affectedRows) {
            res.status(201).json({"result": result.affectedRows});
        }
    } catch (err) {
        console.error('[POST /tweets]', err);
        res.status(500).json({ message: '서버 오류' });
    }
}


/**
 * MyTweet Delete
 */
export const getMyTweetsDelete = async (req, res) => {
    const { id } = req.params;
    
    try {
        const rows = await repository.getDelete(id, req.user.id);
        if(rows) res.json({ message: '삭제되었습니다.' });
    } catch (err) {
        console.error('[DELETE /tweets/:id]', err);
        res.status(500).json({ message: '서버 오류' });
    }
}


/**
 * MyTweets Update
 */
export const getMyTweetsUpdate = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const rows = await repository.getUpdate(id, content, req.user.id);
        if(rows) {
            res.json({ message: '수정되었습니다.' });
        }
    } catch (err) {
        console.error('[PUT /tweets/:id]', err);
        res.status(500).json({ message: '서버 오류' });
    }
}



/**
 * MyTweets
 */
export const getMyTweets = async (req, res) => {
    try {
        const rows = await repository.getMyTweets(req.user.id);        
        res.json(rows);
    } catch (err) {
        console.error('[GET /tweets/my]', err);
        res.status(500).json({ message: '서버 오류' });
    }
}