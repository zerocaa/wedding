const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema({
  wedding: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wedding'
    // required: [true, 'A BrideGroom must have a Wedding ID ']
  },
  name: {
    type: String,
    default: 'LỄ CƯỚI NHÀ NỮ'
  },
  date: {
    type: String,
    default: '10/02/2023'
  },
  time: {
    type: String,
    default: '07:30 AM'
  },
  address: {
    type: String,
    default: 'Thôn Liên Sơn, Xã Phong Thịnh, Huyện, Thanh Chương, Tỉnh Nghệ An'
  },
  map: {
    type: String,
    default: 'https://www.google.com/maps/place/Ho%C3%A0ng+phi+h%C3%B9ng/@18.8569325,105.261481,20z/data=!4m5!3m4!1s0x3139e3dad829aedb:0x54286a4d290f4578!8m2!3d18.8569811!4d105.2616206'
  },
  eventPhoto: {
    type: String,
    default: 'eventPhoto.jpg'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
