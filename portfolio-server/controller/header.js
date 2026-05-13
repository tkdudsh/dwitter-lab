import * as repository from '../repository/header.js';

export const getHeader = async(req, res, next) => {
    const header = await repository.getHeader();
    res.json({"result": header});
}