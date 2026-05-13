import db from '../db/connection.js';

export const getFooter = async() => {
    const sql = `select footer from portfolio`;
    const [results] = await db.execute(sql, []);

    return await results[0].footer;
}