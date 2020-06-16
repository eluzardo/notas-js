const mongoose = require('mongoose');

const {NOTES_MONGODB_HOST, NOTES_MONGODB_DATABASE}=process.env;
const MONGODB_URI =`mongodb://${NOTES_MONGODB_HOST}/${NOTES_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));  