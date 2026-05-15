const users = [
        { "id": "test", "pwd": "1234" },
        { "id": "hong", "pwd": "1111" },
        { "id": "test1234", "pwd": "test1234" }
    ];

export const getLogin = (id, pwd) => {
    const userIdx = users.findIndex(user => user.id === id && user.pwd === pwd );
    return userIdx;
}   

export const getUsers = () => {
    return users;
}