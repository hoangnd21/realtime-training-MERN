const msg = require('../models/msg');

const addMsg = (req, res) => {
    console.log(req.body)
    msg.create({
        user: req.body.user,
        content: req.body.content
    }).then(
        res.send("okk")
    )

};
module.exports.addMsg = addMsg;

const getAllMsg = (req, res) => {
    msg.find({}).exec()
        .then((getAllMsg) => {
            if (getAllMsg) {
                res.send(getAllMsg);
            }
            else {
                res.send('fail');
            }
        })
};
module.exports.getAllMsg = getAllMsg;