const mongoose =require("./db.js");
const { Schema } = mongoose

//创建Picture的schema结构
const PictureSchema=new Schema({
    title    :{type:String},
    path     :{type:String,index: {unique: true, dropDups: true}},
    date     :{type:Date,default:Date.now()},
    tag      :{type:String,default:""},
    abstract :{type:String,default:""},
});

//静态方法
//1.根据图片_id修改图片描述
PictureSchema.statics.AbstractUpdate=function(picture_id,update,cb){
    this.update({_id:picture_id},{"$set":{abstract:update}},cb);
}
//2.根据tag和abstract实现模糊查询
PictureSchema.statics.FindByTagNAbstract=function(picture_id,like,cb){
    this.find( {$or : [{title:like},{tag : like},{abstract :like}]},cb);
}

module.exports=mongoose.model('Picture',PictureSchema);