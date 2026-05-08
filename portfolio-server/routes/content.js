import express from 'express';

const router = express.Router();

const work = {
            "categories" : [
                {"category": "All", "count": "8"},
                {"category": "Front-end", "count": "4"},
                {"category": "Back-end", "count": "2"},
                {"category": "Mobile", "count": "2"}
            ],
            "projects": [
                {
                    "pid": "P001",
                    "img": "images/projects/project1.webp",
                    "alt": "project-img",
                    "title": "Project#1",
                    "description": "Clone Coding with HTML, CSS"
                },
                {
                    "pid": "P002",
                    "img": "images/projects/project2.webp",
                    "alt": "project-img",
                    "title": "Project#2",
                    "description": "Clone Coding with HTML, CSS"
                },
                {
                    "pid": "P003",
                    "img": "images/projects/project3.webp",
                    "alt": "project-img",
                    "title": "Project#3",
                    "description": "Clone Coding with HTML, CSS"
                },
                {
                    "pid": "P004",
                    "img": "images/projects/project4.webp",
                    "alt": "project-img",
                    "title": "Project#4",
                    "description": "Clone Coding with HTML, CSS"
                },
                {
                    "pid": "P005",
                    "img": "images/projects/project5.webp",
                    "alt": "project-img",
                    "title": "Project#5",
                    "description": "Clone Coding with HTML, CSS"
                },
                {
                    "pid": "P006",
                    "img": "images/projects/project6.webp",
                    "alt": "project-img",
                    "title": "Project#6",
                    "description": "Clone Coding with HTML, CSS"
                },
                {
                    "pid": "P007",
                    "img": "images/projects/project7.webp",
                    "alt": "project-img",
                    "title": "Project#7",
                    "description": "Clone Coding with HTML, CSS"
                },
                {
                    "pid": "P008",
                    "img": "images/projects/project8.webp",
                    "alt": "project-img",
                    "title": "Project#8",
                    "description": "Clone Coding with HTML, CSS"
                }
            ]
        }


router.get('/work/project/:pid', (req, res, next)=>{
    const pid = req.params.pid;
    const project = work.projects.find(project => project.pid === pid);
    res.json({"result": project});
});

router.get('/testimonials', (req, res, next)=>{
    const testimonials = [
                {
                    "img": "images/testimonials/people1.webp",
                    "alt": "people1",
                    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit",
                    "name": "James",
                    "company": "Samsung"
                },
                {
                    "img": "images/testimonials/people2.webp",
                    "alt": "people2",
                    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit",
                    "name": "Smith",
                    "company": "Google"
                },
                {
                    "img": "images/testimonials/people3.webp",
                    "alt": "people3",
                    "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit",
                    "name": "Anne",
                    "company": "Samsung"
                }
            ]
    
            res.json({"result": testimonials});
});


router.get('/work', (req, res, next)=>{ 
        res.json({"result": work});
});


router.get('/skills', (req, res, next)=>{
    const skills = {
            "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            "coding": [
                        { "title":"HTML",       "value": "98%", "width": "98%"},
                        { "title":"CSS",        "value": "90%", "width": "90%"},
                        { "title":"JavaScript", "value": "80%", "width": "80%"},
                        { "title":"TypeScript", "value": "90%", "width": "90%"},
                        { "title":"React",      "value": "88%", "width": "88%"},
                        { "title":"Node.js",    "value": "75%", "width": "75%"}
                    ],
            "tools": [
                        "Visual Studio Code",
                        "IntelliJ",
                        "Android Studio",
                        "Eclipse",
                        "MySQL Workbench"
                    ],
            "etc":  [ "Git", "Scrum Master", "SVN"]
        }

        res.json({"result": skills});
});


router.get('/about', (req, res, next)=>{
    const about = {
            "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat odio dicta necessitatibus libero magnam est alias nisi laborum nesciunt!",
            "majors": [
                {"icon": "html", "title": "Front-end", "subjects": "HTML, CSS, JavaScript, TypeScript, React, WebAPIs"},
                {"icon": "mobile", "title": "Mobile", "subjects": "Android Studio, React Native, iOS, Swift, Java, Kotlin"},
                {"icon": "server", "title": "Back-end", "subjects": "Java, JavaScript, Go, Kotlin, Spring, Spring Boot"}
            ],
            "jobs": [
                {   "img":"images/jobs/google.png", 
                    "alt":"google", 
                    "name":"Google as Junior Software Engineer", 
                    "period":"2019 Oct - Until now"
                },
                {   "img":"images/jobs/samsung.png", 
                    "alt":"samsung", 
                    "name":"Samsung as Junior Software Engineer", 
                    "period":"2010 Oct - 2019 Oct"
                }
            ]
        }
    res.json({"result": about});
});


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