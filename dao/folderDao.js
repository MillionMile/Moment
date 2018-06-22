const mongoose =require("./db.js")
const { Schema } = mongoose

//创建Folder的schema结构
const FolderSchema=new Schema({
    folder_name :{type:String,index:true},
})

module.exports=mongoose.model('Folder',FolderSchema)

