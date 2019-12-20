const msg = require('../models/msg');

const addMsg = (req, res) => {
    msg.create({
        name: req.body.name,
        password: req.body.password
    });

};
module.exports.addMsg = addMsg;

const getAllMsg = (req, res) => {
    msg.find({}).exec()
        .then((getAllMsg) => {
            if (getAllmsg) {
                res.send(getAllMsg);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllMsg = getAllMsg;