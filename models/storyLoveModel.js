const mongoose = require('mongoose');
const slugify = require('slugify');

const storyLoveSchema = new mongoose.Schema({
  wedding: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wedding',
    required: [true, 'A BrideGroom must have a Wedding ID ']
  },
  title: {
    type: String,
    default: 'Bạn có tin vào tình yêu online không?'
  },
  time: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default:
      'Tôi đã từng không tin vào tình yêu online. Đã từng nghĩ làm sao có thể thích một người chưa từng gặp mặt? Vậy mà giờ đây tôi lại đang như vậy, bây giờ tôi đã hiểu: thế giới ảo tình yêu thật đấy!!! Ngày ấy vu vơ đăng một dòng status trên facebook than thở, vu vơ đùa giỡn nói chuyện với một người xa lạ chưa từng quen. Mà nào hay biết, 4 năm sau người ấy lại là chồng mình.'
  },
  storyPhoto: {
    type: String,
    default: 'noImg.png'
  }
});

//
const StoryLove = mongoose.model('StoryLove', storyLoveSchema);
module.exports = StoryLove;
