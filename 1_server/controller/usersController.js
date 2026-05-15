import * as repository from '../repository/usersRepository.js';
    
export const getLogin = (req, res) => {
    const { id, pwd } = req.body.data;
    const userIdx = repository.getLogin(id, pwd);
    const result = userIdx !== -1 ? true : false;
    res.json({"result": result});
}

export const getUsers = (req, res) => {
    const users = repository.getUsers();
    res.json({"users": users});
}