const mongoose=require('mongoose');
 mongoose.connect('mongodb://127.0.0.1:27017/Moment', () => {
    console.log("数据库成功连接");
});
module.exports=mongoose;