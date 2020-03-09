const mongoose = require('mongoose');//conecta con mongo db

const {KARMERSI_APP_MONGODB_HOST, KARMERSI_APP_MONGODB_DATABASE} = process.env;
const MONGODB_URL ='mongodb://'+KARMERSI_APP_MONGODB_HOST+'/'+KARMERSI_APP_MONGODB_DATABASE;

mongoose.connect(MONGODB_URL, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true
})
.then(db=> console.log('Base de datos conectada'))
.catch(err => console.log(err));