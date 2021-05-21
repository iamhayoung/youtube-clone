import mongoose from "mongoose";

// schema: shape of model. 실제 데이터는 안넣고 데이터 형식만 정의. 데이터가 어떤 형태로 구성될지 설정해주는것
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }, // Date.now()에서 ()를 뺸이유는 바로 실행시키지 않기 위해
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

// model: 데이터가 어떻게 생겼는지 데이터베이스에게 설명해줌. title이 string인지, 배열인지, 숫자인지...
// model의 첫번째 인자: model의 이름
// 두번쨰 인자: 데이터의 형태인 schema
const Video = mongoose.model("Video", videoSchema);

export default Video;