const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Moment', (error) => {
    if (error) {
        console.log(error.message)
    } else {
       console.log("数据库成功连接");
    }
});
module.exports=mongoose;