const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
}).catch(err=>console.log(err))

module.exports = mongoose