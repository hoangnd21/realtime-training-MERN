const user = require('../models/users');

const addUser = (req, res) => {
    user.create({
        name: req.body.name,
        password: req.body.password
    });

};
module.exports.addUser = addUser;

const getAllUser = (req, res) => {
    user.find({}).exec()
        .then((getAllUser) => {
            if (getAllUser) {
                res.send(getAllUser);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllUser = getAllUser;