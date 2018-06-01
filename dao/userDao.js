const mongoose =require("./db.js");
const { Schema } = mongoose

//创建User的schema结构
const userSchema=new Schema({
    username :{type:String,index: {unique: true, dropDups: true}},
    password :{type:String},
    avatar   :{type:String},
    sex      :{type:String},
    phone    :{type:String,default:""},
    folders  :[{type:Schema.Types.ObjectId ,ref:"Folder"}]
});

//静态方法
//默认静态方法（如find findOne remove等）不作改变
//1.根据ID遍历用户的基础信息（username，avatar，sex，phone）
userSchema.statics.findUserById = function (_id,cb){
    this.findById({ _id: _id },{password:0,folders:0}, cb);
}
//2.根据ID遍历用户的收藏夹信息
userSchema.statics.findUFoldersById = function (_id,cb){
    this.findById({ _id: _id },{folders:1}).populate('folders').exec(cb);
}
//3.添加新的收藏夹
userSchema.statics.FolderAdd = function (_id,folder_id,cb) {
    this.update(
        {_id:_id},
        {'$push':{folders:{ _id: folder_id}}},
        cb
    )
}
//4.删除收藏夹
userSchema.statics.FolderDelete = function (_id,folder_id,cb) {
    this.update(
        {_id:_id},
        {'$pull':{folders:folder_id}},
        cb
    )
}

module.exports=mongoose.model('User',userSchema);