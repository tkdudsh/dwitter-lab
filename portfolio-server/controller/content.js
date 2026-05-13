import * as repository from '../repository/content.js';

/**
 * 
 */
export const getHome = (req, res, next)=> {
    const home = repository.getHome();
    res.json({"result": home});
}

/**
 * 
 */
export const getAbout = (req, res, next)=>{
    const about = repository.getAbout();
    res.json({"result": about});
}

/**
 * 
 */
export const getSkills =  (req, res, next)=>{
    const skills = repository.getSkills();
    res.json({"result": skills});
}


/**
 * 
 */
export const getWork = (req, res, next)=>{ 
    const work = repository.getWork();
    res.json({"result": work});
}


/**
 * 
 */
export const getTestimonials = (req, res, next)=>{
    const testimonials = repository.getTestimonials();
    res.json({"result": testimonials});
}


/**
 * 
 */
export const getProject = (req, res, next)=>{
    const project = repository.getProject(req.params.pid);    
    res.json({"result": project});
}
