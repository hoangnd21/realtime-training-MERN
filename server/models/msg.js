const mongoose = require('mongoose');
const schema = mongoose.Schema;

const msgSchema = new schema({
    user: String,
    content: String
})

const msg = mongoose.model('msg', msgSchema);
module.exports = msg;