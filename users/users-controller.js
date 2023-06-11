import people from './users.js'
import * as usersDao from "./users-dao.js";

let users = people
const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const updateUser = async (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;

    const newUser = await usersDao.updateUser(userId, updates)
    req.session['currentUser'] = newUser;
    // users[ndx] = newUser;

    // users = users.map((usr) =>
    //     usr._id === userId ?
    //         { ...usr, ...updates } :
    //         usr
    // );
    console.log(users);
    res.sendStatus(200);
}


const deleteUser = async (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr => usr._id !== userId);
    res.sendStatus(200);
}


const createUser = async (req, res) => {
    let newUser = req.body;
    newUser ["_id"] = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
    console.log(users);
}

const findUserById = async (req, res) => {
    const userId = req.params.uid;
    const user = users
        .find(u => u._id === userId);
    res.json(user);
}

const findUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();

    // const type = req.query.type
    // if (type) {
    //     const usersOfType = users
    //         .filter(u => u.type === type)
    //     res.json(usersOfType)
    //     return
    // }
    res.json(users)
}

export default UserController