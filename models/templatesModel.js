const mongoose = require('mongoose');
const slugify = require('slugify');
const wedding = require('./weddingModel');

const templatesSchema = new mongoose.Schema({
  wedding: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wedding'
    },
    titlePhoto: {
        type: String,
        default:"titlePhoto.jpg"
    },
    mainPhoto: {
        type: String,
        default:'wedding1.jpg'
    },
    middlePhoto: {
        type: String,
        default:"middlePhoto.jpg"
    },
    bottomPhoto: {
        type: String,
        default:"bottomPhoto.jpg"
    },
    bridegroomWord: {
        type: String,
        default:"Tình yêu là điều kiện trong đó hạnh phúc của người khác là điều cần thiết cho chính bạn."
    },
    mainWord: {
        type: String,
        default:"We’re Getting Married"
    },
    middleWord1: {
        type: String,
        default:"...Tình yêu không phải là nhìn chằm chằm vào nhau, mà là nhìn chằm chằm về cùng một hướng..."
    },
    middleWord2: {
        type: String,
        default:"-- Forever one love --"
    },
    storyWord: {
        type: String,
        default:"Tình yêu không làm cho thế giới quay tròn. Tình yêu là những gì làm cho chuyến đi đáng giá."
    },
    bridemaidWord: {
        type: String,
        default:"Tình yêu đích thực đứng về phía nhau trong những ngày tốt đẹp và sát cánh hơn trong những ngày tồi tệ."
    },
    guestbookWord: {
        type: String,
        default:"Tôi yêu bạn vì tất cả những gì bạn đang có, tất cả những gì bạn đã có, và tất cả những gì bạn chưa hiện hữu."
    },
    eventWord: {
        type: String,
        default:"Được ai đó yêu sâu sắc sẽ mang lại cho bạn sức mạnh, trong khi yêu ai đó sâu sắc sẽ cho bạn dũng khí."
    }
});

const Templates = mongoose.model('Templates', templatesSchema);
module.exports = Templates;
