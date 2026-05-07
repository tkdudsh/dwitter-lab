import express from 'express';

const router = express.Router();

router.get('/home', (req, res, next)=> {
    const home = {
            "img": "images/favicon.ico",
            "alt": "photo",
            "title": "Junior Developer",
            "name": "Judy",
            "description": "A software engineer currently residing in Seoul, South Korea",
            "href": "#",
            "menuName": "contact me"
        }
    res.json({"result": home});
});


export default router;