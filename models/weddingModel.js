const mongoose = require('mongoose');
const slugify = require('slugify');
const bridesMaids = require('./bridesmaidsModel');
const Story = require('./storyLoveModel');
const Event = require('./eventModel');
// const User = require('./userModel');
// const Contact = require('./contactModel');
const weddingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A wedding must have a user']
    },
    createAt: {
      type: Date,
      default: Date.now()
    },
    bridesmaids: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'BridesMaids'
      }
    ],
    event: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
      }
    ],
    storyLove: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'StoryLove'
      }
    ],
    contact: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Contact'
      }
    ],
    templates: 
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Templates'
      },
    date: {
      type: String,
      required: [true, 'Cần Phải Nhập Ngày Cưới']
    },
    malename: {
      type: String,
      required: [true, 'Cần Phải Nhập Tên Chú Rễ']
    },
    maleshortname: {
      type: String,
      default: ''
    },
    maleintroduce: {
      type: String,
      default:
        'Chàng trai sinh ra và lớn lên bởi mảnh đất Vĩnh Bảo, mang trong mình lòng say mê nhiệt thành của nghề "bác tài". Là một người hiền lành và ít nói. Luôn coi trọng tình cảm và yêu thương gia đình. Với anh: “Gia đình là điểm tựa vững chắc nhất và là bến đỗ bình yên không đâu sánh bằng đối với mỗi con người. Đó luôn là nơi tràn ngập tình yêu thương để ta trở về"'
    },
    malefb: {
      type: String,
      default: ''
    },
    maledate: {
      type: String,
      default: ''
    },
    malelocation: {
      type: String,
      default: ''
    },
    malephoto: {
      type: String,
      default: 'undefined.jpg'
    },
    fename: {
      type: String,
      required: [true, 'Cần Phải Nhập Tên Cô Dâu']
    },
    feshortname: {
      type: String,
      default: ''
    },
    feintroduce: {
      type: String,
      default: 'Cô gái đến từ xứ Huế mộng mơ, hiện đang sinh sống và làm việc tại Sài Gòn. Sau khi tốt nghiệp Học viện Báo chí và Tuyên truyền, quyết tâm theo đuổi đam mê làm phóng viên du lịch. Là một người hay cười nhưng lại sống nội tâm, thích đọc sách, trồng cây và yêu thiên nhiên. Ngoài ra còn rất thích vẽ vời, nuôi mèo và nuôi ước mơ có cho mình một vườn hồng khoe sắc.'
    },
    fefb: {
      type: String,
      default: ''
    },
    fedate: {
      type: String,
      default: ''
    },
    felocation: {
      type: String,
      default: ''
    },
    fephoto: {
      type: String,
      default: 'undefined.jpg'
    },
    templateId: {
      type: Number
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

weddingSchema.index({ slug: 1 });
weddingSchema.index({ startLocation: '2dsphere' });
weddingSchema.index({ user: 1, wedding: 3 }, { unique: true });

// select -id find
// Virtual Populate
weddingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user'
  })
    .populate({
      path: 'bridesmaids'
    })
    .populate({
      path: 'event'
    })
    .populate({
      path: 'storyLove'
    })
    .populate({
      path: 'contact'
    }).populate({
      path: 'templates'
    });
  next();
});

weddingSchema.pre('save', async function(next) {
  const bridesmaidsPromises = this.bridesmaids.map(
    async id => await bridesMaids.findById(id)
  );
  this.bridesmaids = await Promise.all(bridesmaidsPromises);
  next();
});
// middle ware get slugify
// weddingSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

const wedding = mongoose.model('Wedding', weddingSchema);
module.exports = wedding;
