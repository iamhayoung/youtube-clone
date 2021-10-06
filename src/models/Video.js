import mongoose from 'mongoose';

// schema: shape of model. 실제 데이터는 안넣고 데이터 형식만 정의. 데이터가 어떤 형태로 구성될지 설정해주는것
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now }, // Date.now()에서 ()를 뺸이유는 바로 실행시키지 않기 위해
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

// mongoose에서는 document에 무슨 일이 생기기 전이나 후에 middleware를 적용할 수 있다
// 예를 들면 save하기 전,후로 middleware를 적용하거나 function을 실행할수 있다
// middleware는 무조건 model이 생성되기 전에 만들어야한다!
// pre: Mongoose에서 middleware를 생성하는 방법중 하나. "save"이벤트가 발생되기 전에 중간에 가로채서 2번째 인수인 함수를 먼저 실행
// "save"이벤트는 this로 업데이트 하려는 document에 접근이 가능하다
/*
videoSchema.pre("save", async function () {
  // this는 우리가 저장하고자 하는 document(input에서 입력된 값)를 가리킴
  this.hashtags = this.hashtags[0]
    .split(",")
    .map(word => word.startsWith("#") ? word : `#${word}`);
});
*/

// mongoose에서 제공하는 Schema.static 메소드로 static function(커스텀 함수)을 생성
// 컨트롤러에서 커스텀 함수를 사용하기 위해 import를 해줄 필요가 없음! 모델을 import하면 그안에 정의되어 있기 때문
videoSchema.static('formatHashtags', function (hashtags) {
  return hashtags
    .split(',')
    .map((word) => (word.startsWith('#') ? word : `#${word}`));
});

// model: 데이터가 어떻게 생겼는지 데이터베이스에게 설명해줌. title이 string인지, 배열인지, 숫자인지...
// model의 첫번째 인자: model의 이름
// 두번쨰 인자: 데이터의 형태인 schema
const Video = mongoose.model('Video', videoSchema);

export default Video;
