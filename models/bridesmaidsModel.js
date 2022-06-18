const mongoose = require('mongoose');
const slugify = require('slugify');

const bridesmaidsSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.ObjectId,
      ref: 'Wedding',
      required: [true, 'A BrideGroom must have a Wedding ID ']
    },
    name: {
      type: String,
      default: "Hoàng Gia Bảo"
    },
    birthday: {
      type: String,
      default: ''
    },
    introduce: {
      type: String,
      default: 'Hòa đồng, xông xáo, nhiệt tình và có trách nhiệm trong công việc. Là chàng trai yêu động vật, thích chơi game, thích ăn cơm nhà và nước uống có ga…'
    },
    fb: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: 'noImg.png'
    },
    fename: {
      type: String,
      default: 'Ngô Thị Bích Thủy'
    },
    feintroduce: {
      type: String,
      default: 'Bích Thủy sở hữu ngoại hình dễ thương, xinh xắn và nấu ăn rất ngon. Là cô gái thật thà, hiền lành, hơi ít nói bởi vì nhiều lúc không biết nên nói gì...'
    },
    febirthday: {
      type: String,
      default: ''
    },
    fefb: {
      type: String,
      default: ''
    },
    feavatar: {
      type: String,
      default: 'noImg.png'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const bridesMaids = mongoose.model('BridesMaids', bridesmaidsSchema);
module.exports = bridesMaids;
