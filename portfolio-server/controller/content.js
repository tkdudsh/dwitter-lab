import * as repository from '../repository/content.js';

/**
 * 
 */
export const getHome = async(req, res, next)=> {
    const home = await repository.getHome();
    res.json({"result": home});
}

/**
 * 
 */
export const getAbout = async(req, res, next)=>{
    const about = await repository.getAbout();
    res.json({"result": about});
}

/**
 * 
 */
export const getSkills = async (req, res, next)=>{
    const skills = await repository.getSkills();
    res.json({"result": skills});
}


/**
 * 
 */
export const getWork = async(req, res, next)=>{ 
    const work = await repository.getWork();
    res.json({"result": work});
}


/**
 * 
 */
export const getTestimonials = async(req, res, next)=>{
    const testimonials = await repository.getTestimonials();
    res.json({"result": testimonials});
}


/**
 * 
 */
export const getProject = async(req, res, next)=>{
    const project = await repository.getProject(req.params.pid);    
    res.json({"result": project});
}
