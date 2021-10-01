import './db'; // db.js파일 자체를 import해줌으로써 내 서버가 mongoDB에 연결될거임
import './models/Video'; // db를 import한 후에 model을 import해야함
import './models/User'; // db를 import한 후에 model을 import해야함
import app from './server';

const PORT = 4001;

const handleListening = () =>
  console.log(`✅ Server listening on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
