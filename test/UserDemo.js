const userDao=require("../dao/userDao.js");
const folderDao = require('../dao/folderDao')

//写入数据
// userDao.create(
//     {   username:'test1',
//         password:"123456",
//         sex     :"男"
//     },(err,result)=>{
//     if(err)
//         console.log("插入失败",err);
//     else
//     console.log("插入成功",result);
// })

//查找数据
// userDao.find(
//     {},//查询全部
//     {username : 1,sex:1},//只显示姓名和密码
//     {
//         sort : { _id : -1 },// 按照 _id倒序排列
//         limit : 1, // 查询100条
//         skip:1
//     },
//     (err,result)=> {
//         if(err)
//             console.log("查找失败",err);
//         else
//             console.log("全部查找",result);
// })

//根据ID查找
// userDao.findById(
//     {_id:"5b04375510fe443358c0cf63"},
//     {username : 1,sex:1},
//     (err,res)=>{
//     if(err)
//         console.log("根据Id查找失败",err);
//     else
//         console.log("根据Id查找成功",res);
// })

//向用户中的“文件数组”插入相应的文件ID
// userDao.update(
//         {username:"test2"},
//         {'$push':{folders:{ _id: "5b04cf3b609e0d03e450db45"}}},
//         (err,res)=>{
//             if(err)
//                 console.log("插入失败",err);
//             else
//                 console.log("插入成功",res);
// })

//从用户中的“文件数组”排除相应的文件ID
//  userDao.update(
//      {username:"test2"},
//      {'$pull':{folders:"5b04cf3b609e0d03e450db45"}},
//      (err,res)=>{
//          if(err)
//              console.log("删除失败",err)
//          else
//              console.log('删除成功',res)
// })

//删除相应的用户
// userDao.remove({ _id :"5b043747201c760f087594ad"},(err,res)=> {
//             if(err)
//                  console.log("删除失败",err)
//             else
//                  console.log('删除成功',res)
// })

//填充
// userDao.find({username:"test2"})
//     .populate({
//         path: 'folders',
//         match: {},
//         select: 'folder_name',
//         options: {}
//     })
//     .exec((err,res)=>{
//             if(err)
//                  console.log('查找失败',err);
//             else
//                  //console.log('查找成功',res);
//                  console.log('查找成功',res[0].folders[0].folder_name);
// })

//使用静态方法一
// userDao.findUserById("5b04375510fe443358c0cf63",(err,res)=>{
//     if(err)
//         console.log("根据Id查找失败",err);
//     else
//         console.log("根据Id查找成功",res);
// })

//使用静态方法二
// userDao.findUFoldersById("5b04375510fe443358c0cf63",(err,res)=> {
//     if (err)
//         console.log("根据Id查找失败",err);
//     else
//         console.log("根据Id查找成功",res);
//         })

//使用静态方法三
// let folder=new folderDao({folder_name:"folder3"});
// folder.save();

// userDao.FolderAdd("5b053a6cfdd9553110a13b8b",folder._id,(err,res)=>{
//     if (err)
//         console.log("新收藏夹添加失败",err);
//     else
//         console.log("新收藏夹添加成功",res);
// })

//使用静态方法四
// userDao.FolderDelete("5b053a6cfdd9553110a13b8b","5b07d6692bba1417789a71f8",(err,res)=>{
//     if(err)
//         console.log("收藏夹删除失败",err);
//     else
//         console.log("收藏夹删除成功",res);
// })
