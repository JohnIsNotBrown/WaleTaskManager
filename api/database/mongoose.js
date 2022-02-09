//This file handles connection logic to the MongoDB database

const mongoose = require('mongoose');

//Setting mongoose to use global javascript promise
mongoose.Promise = global.Promise;

//Attemps to connect to database then
mongoose.connect('mongodb://localhost:27017/TaskMangager', {useNewUrlParser: true}).then(()=>{
    console.log("Connection to MongoDB successful");
    //Displays if connection to database is successful
}).catch((e)=>{
    console.log("Unsuccessful connection to MongoDB");
    console.log(e);
    //Displays if connection to database is unsuccessful
});

//Prevention of deprectation warnings (from MongoDB native driver)
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

//Exports the mongoose object
module.exports = {mongoose};