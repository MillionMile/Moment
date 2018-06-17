const operationDao=require("../dao/OperationDao.js");
const pictureDao=require("../dao/pictureDao")
const folderDao=require("../dao/folderDao.js");
const userDao=require("../dao/userDao.js");

//发布
// operationDao.create({
//     user_id:"5b04375510fe443358c0cf63",
//     picture:"5b07fe58960ddc17d404f8d6",
//     issue:{},
// },(err,res)=>{
//     if(err)
//         console.log("动作信息插入失败",err)
//     else
//         console.log("动作信息插入插入成功",res);
// })

//评论
// operationDao.create({
//     user_id:"5b04375510fe443358c0cf63",
//     picture:"5b07fe58960ddc17d404f8d6",
//     comment:{content:"这是评论4"},
// },(err,res)=>{
//     if(err)
//         console.log("动作信息插入失败",err);
//     else
//         console.log("动作信息插入插入成功",res);
// })

//点赞
// operationDao.create({
//     user_id:"5b04375510fe443358c0cf63",
//     picture:"5b07fe58960ddc17d404f8d6",
//     vote:{},
// },(err,res)=>{
//     if(err)
//         console.log("动作信息插入失败",err);
//     else
//         console.log("动作信息插入插入成功",res);
// })

//收藏
// operationDao.create({
//     user_id:"5b04375510fe443358c0cf63",
//     picture:"5b07fe58960ddc17d404f8d6",
//     favor:{folder:"5b04cf2e1dfdce07dca2dab1"},
// },(err,res)=>{
//         if(err)
//         console.log("动作信息插入失败",err);
//         else
//         console.log("动作信息插入插入成功",res);
// })

//统计数目（判断是否存在已经点赞、收藏）
//    operationDao.count(
//        {
//            $and:[
//                {user_id: "5b04375510fe443358c0cf63"},
//                {picture: "5b07fe58960ddc17d404f8d6"},
//                {favor:{$exists:true}},
//            ]
//        },
//        // {issue:1},
//        (err,res)=>{
//        if(err)
//            console.log("查找失败",err);
//        else
//            console.log("查找成功",res);
// })

//查找
// operationDao.find({
//            $and:[
//                {user_id: "5b04375510fe443358c0cf63"},
//                {picture: "5b07fe58960ddc17d404f8d6"},
//                {favor:{$exists:true}},
//            ]
//        },
//     {comment:1},
// (err,res)=>{
//     if(err)
//         console.log("查找成功",err);
//     else
//         console.log("查找失败",res);
// })

//查找文件夹名字
// operationDao.find({
//            $and:[
//                {user_id:""},
//                {picture: "5b07fe58960ddc17d404f8d6"},
//                {favor:{$exists:true}},
//            ]
//        },{favor:1})
//     // .populate('user_id picture favor.folder')
//     .populate({
//             path: 'favor.folder',
//             match: {},
//             select: 'folder_name',
//             options: {}
//         })
//     .exec((err,res)=>{
//       if(err)
//           console.log(err);
//       else
//           console.log(res[0].favor.folder.folder_name);
// });

// operationDao.find({
//            $and:[
//                {user_id: "5b04375510fe443358c0cf63"},
//                {picture: "5b07fe58960ddc17d404f8d6"},
//                {vote:{$exists:true}},
//            ]
//        },{user_id:1})
//     .populate('user_id')
//     .exec((err,res)=>{
//       if(err)
//           console.log(err);
//       else
//           console.log(res);
// });

// operationDao.find({
//            $and:[
//                {user_id: "5b04375510fe443358c0cf63"},
//                {'favor.folder':"5b04cf2e1dfdce07dca2dab1"},
//                {favor:{$exists:true}},
//            ]
//        },{picture:1})
//     .populate('picture')
//     .exec((err,res)=>{
//       if(err)
//           console.log(err);
//       else
//           console.log(res);
// });

// operationDao.remove({
//     'favor.folder':"5b04cf2e1dfdce07dca2dab1",
// },(err,res)=>{
//       if(err)
//           console.log(err);
//       else
//           console.log(res)
// })

// operationDao.remove({
//     picture:"5b07fe58960ddc17d404f8d6",
// },(err,res)=>{
//       if(err)
//           console.log(err);
//       else
//           console.log(res)
// })

//方法1
// operationDao.PictureIssue("5b0437611254ad24649c890f","5b07fd6862c56434d0154537",(err,res)=>{
//    if(err)
//        console.log(err);
//     else
//         console.log(res);
// })

//方法4
// operationDao.PictureComment("5b053a6cfdd9553110a13b8b","5b07fe58960ddc17d404f8d6","这是评论20",(err,res)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log(res);
// })

//方法5
// operationDao.OperationsCount({user_id:"5b0437611254ad24649c890f"},"5b07fd6862c56434d0154537",{issue:{$exists:true}},(err,res)=>{
//         if(err)
//         console.log(err);
//         else
//         console.log(res);
// })

// //方法10
// operationDao.OperationsAllDeleteByPicture("5b0a717babeaa124d8d554df",(err,res)=>{
//         if(err)
//         console.log(err);
//         else
//         console.log(res);
// })


//方法8
// operationDao.CommentsOfPicture("5b07fd6862c56434d0154537",(err,res)=>{
//         if(err)
//         console.log(err);
//         else
//         console.log(res);
// })

//方法7
// operationDao.PicturesOfFavor("5b04375510fe443358c0cf63","5b140927283af20ea473e1ef",(err,res)=>{
//         if(err)
//         console.log(err);
//         else
//         console.log(res);
// })
