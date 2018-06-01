const folderDao=require("../dao/folderDao.js");

//写入数据
folderDao.create(
    {
        folder_name:"folder"
    },(err,res)=>{
        if(err)
            console("插入失败",err);
        else
            console.log("插入成功",res);

})