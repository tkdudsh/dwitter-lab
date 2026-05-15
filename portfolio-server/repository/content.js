import db from '../db/connection.js';            
            
/**
 *  
 */            
export const getHome = async() => {
    const sql = `select home from portfolio`;
    const [results] = await db.execute(sql, []);
    return await results[0].home;
}

/**
 * 
 */
export const getAbout = async() => {
    const sql = `select about from portfolio`;
    const [results] = await db.execute(sql, []);
    return await results[0].about;
}

/**
 * 
 */
export const getSkills = async() => {
    const sql = `select skills from portfolio`;
    const [results] = await db.execute(sql, []);
    return results[0].skills;
}

/**
 * 
 */
export const getWork = async() => {
    const sql = `select work from portfolio`;
    const [results] = await db.execute(sql, []);
    return results[0].work;
}

/**
 * 
 */
export const getTestimonials = async() => {
    const sql = `select work from portfolio`;
    const [results] = await db.execute(sql, []);
    return results[0].work;
}

/**
 * 
 */
export const getProject = async(pid) => {
    const sql = `select work from portfolio`;
    const [results] = await db.execute(sql, []);
    const projects = await results[0].work.projects;
    return projects.find(project => project.pid === pid);
}