import * as repository from '../repository/footer.js';

/**
 * 
 */
export const getFooter = async(req, res, next) => {
    const footer = await repository.getFooter();
    res.json({"result": footer});
}