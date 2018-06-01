const mongoose =require("./db.js");
const { Schema } = mongoose;
const issueDao=require("./issueDao");
const favorDao=require("./favorDao");
const voteDao=require("./voteDao");
const commentDao=require("./commentDao");

//创建Operation的schema结构
const OperationSchema=new Schema({
    user_id   :{type:Schema.ObjectId , ref: 'User' },
    picture   :{type:Schema.ObjectId , ref: 'Picture'},
    date      :{type:Date,default:Date.now()},
    issue     : issueDao.issueSchema,
    favor     : favorDao.favorSchema,
    vote      : voteDao.voteSchema,
    comment   : commentDao.commentSchema,
});

//静态方法
//默认静态方法（如find findOne remove等）不作改变
//1.发布了新的图片
OperationSchema.statics.PictureIssue=function (user_id,picture_id,cb) {
    this.create({user_id:user_id, picture:picture_id, issue:{}},cb);
}
//2.收藏了新的图片
OperationSchema.statics.PictureFavor=function (user_id,picture_id,folder_id,cb) {
    this.create({user_id:user_id,picture:picture_id,favor:{folder:folder_id}},cb);
}
//3.点赞新的图片
OperationSchema.statics.PictureVote=function (user_id,picture_id,cb){
    this.create({user_id:user_id,picture:picture_id,vote:{}},cb);
}
//4.评论新的图片
OperationSchema.statics.PictureComment=function (user_id,picture_id,content,cb) {
    this.create({user_id:user_id,picture:picture_id,comment:{content:content}},cb);
}
//5.数目统计（可判断图片是否收藏或点赞==》大于1时）
//option=>issue/favor/vote/comment
//user_id={}是查找所有users
//operations={}是查找所有动作
OperationSchema.statics.OperationsCount=function (user_id,picture_id,operations,cb) {
        this.count({$and:[user_id,{picture:picture_id},operations]},cb);
}
//6.遍历某图所有点赞人物
OperationSchema.statics.UsersOfVote=function(picture_id,cb){
    this.find({$and:[{picture:picture_id},{vote:{$exists:true}}]},{user_id:1})
    .populate('user_id').exec(cb);
}
//7.遍历某人某收藏夹的所有图片
OperationSchema.statics.PicturesOfFavor=function (user_id,folder_id,cb) {
    this.find({$and:[{user_id: user_id},{'favor.folder':folder_id},{favor:{$exists:true}},]},{picture:1})
        .populate('picture').exec(cb);
}
//8.遍历某图所有评论
OperationSchema.statics.CommentsOfPicture=function (picture_id,limitNumber,page,cb) {
    this.find({$and:[{picture:picture_id},{comment:{$exists:true}}]},{user_id:1,comment:1,date:1})
    .populate('user_id').limit(limitNumber).skip(page*limitNumber).exec(cb);;
}
//9.删除某收藏夹对应的图片所有收藏操作
OperationSchema.statics.FavorsAllDeleteByFolder=function (folder_id,cb) {
    this.remove({'favor.folder':folder_id},cb);
}
//10.删除某张图片对应的所有操作
OperationSchema.statics.OperationsAllDeleteByPicture=function (Picture_id,cb) {
    this.remove({picture:Picture_id},cb);
}

module.exports=mongoose.model('Operation',OperationSchema);