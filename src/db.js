import mongoose from 'mongoose';

// connect: DB에 연결
mongoose.connect('mongodb://127.0.0.1:27017/youtube-clone');

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connected to DB');
const handleError = (error) => console.log('❌ DB Error', error); // argument인 error는 몽구스로부터 받음. 만약 DB connection에 에러가 나면 이 event가 발생

// on 이벤트는 여러번 계속 발생시킬 수 있다
// once 이벤트는 한번만 일어남
db.on('error', handleError);
db.once('open', handleOpen);
