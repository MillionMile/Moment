const pictureDao=require("../dao/pictureDao")

// pictureDao.create({
//     title:"picture6",
//     path:"/picture6.jpg",
//     tag:"生活",
//     abstract:"这是图片6",
// },(err,res)=>{
//     if(err)
//         console.log("图片插入失败",err)
//     else
//         console.log("图片插入成功",res);
// });

//修改图片描述
// pictureDao.update({_id:"5b07fe58960ddc17d404f8d6"},{"$set":{abstract:"这是图片5"}},(err,res)=>{
//     if(err)
//         console.log("图片修改失败",err)
//     else
//         console.log("图片修改成功",res);
// })

//根据tag和abstract实现模糊查询
// pictureDao.find(
//     {$or : [
//         {tag : /默认/},
//         {abstract :/默认/}
//     ]},(err,res)=>{
//     if(err)
//         console.log("图片查找失败",err)
//     else
//         console.log("图片查找成功",res);
// })

//方法2
pictureDao.FindByTagNAbstract("5b07fe58960ddc17d404f8d6",/生/,(err,res)=>{
    if(err)
        console.log("图片查找失败",err)
    else
        console.log("图片查找成功",res);
})