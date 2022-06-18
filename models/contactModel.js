const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    wedding: {
        type: mongoose.Schema.ObjectId,
        ref: 'Wedding'
    },
    name: {
        type: String,
        default:'CEO của Behappy'
    },
    email: {
        type: String,
        lowercase: true,
        default:'info@biihappy.com'
    },
    content: {
        type: String,
        default:'"Một cuộc hôn nhân thành công đòi hỏi phải yêu nhiều lần, và luôn ở cùng một người" - Chúc cho hai bạn sẽ có được một cuộc hôn nhân viên mãn, trăm năm hạnh phúc!'
    }
});

//
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
