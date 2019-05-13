const mysql      = require('mysql');
// const express = require("express");
// const bodyParser = require('body-parser');
// const url = require("url");
// const querystring = require('querystring');
// const session = require("express-session");
// const cookie = require("cookie-parser");
// const app = express();
// app.use(cookie());
// app.use(express.static('public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.get('/',function(req,res){
//     res.sendFile(__dirname+'/'+'index.html')
// })
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//      next();
// });

// app.post('/login',function(req,res){
//     var user = req.body;
//     // console.log(user.name)
//     // addUser(user.num1,user.num2)
//   checkUser(user.name,function(resdata){
//       console.log(resdata);
//       res.send('ok')
//         // var data={};
//         // if(resdata==''){
//         //     data.type='err';
//         //     data.value='用户不存在'
//         // }
//         // else
//         // {   
//         //     var obj={};
//         //     for(let i in resdata){
//         //           obj.name=resdata[i].uname;
//         //           obj.pwd=resdata[i].upwd;
//         //       }
//         //     //   console.log(user.pwd,obj.pwd)
//         //     if(user.pwd==obj.pwd){
//         //           data.type='success';
//         //           data.value=user.name;
//         //         }
//         //     else{
//         //         data.type='err';
//         //         data.value='密码错误'
//         //     }
//         // }
//         // // console.log(data)
//         // res.send(JSON.stringify(data))
//     })

// })


// app.post('/register',function(req,res){
//     var user = req.body;
//     checkUser(user.name,function(resdata){
//         console.log(resdata)
//         var data={};
//         if(resdata!=''){
//             data.type='err';
//             data.value='用户已存在'
//             res.send(JSON.stringify(data))
//         }
//         else{
//             addUser(user.name,user.pwd,function(resdata1){
//                 if(resdata1==''){
//                     data.type='err';
//                     data.value='注册失败'
//                 }
//                 else{
//                     data.type='success';
//                     data.value=user.name;
//                 }
//                 res.send(JSON.stringify(data))
//          })
//         }
//         return 
//     })
  
    
// })

// app.listen(3000)

const connect = mysql.createConnection({
  host     : '154.221.255.53',
  user     : 'music',
  password : 'ht19980706',
  database : 'music'
});
connect.connect((err,res)=>{
  if(err)
  console.log(err)
  console.log(res)
})
// function checkUser(uname,callback){
//         var sql = `select * from userslist`
//         connect.query(sql,(err,res,fields)=>{
//             if (err)
//             console.log(err);
//              callback(res)
//         });

// }



// function addUser(uname,upassword,callback){
//   var adduser = `INSERT INTO userslist(uname,upwd) VALUES ('${uname}','${upassword}')`
//   connect.query(adduser,(err,res,fields)=>{
//       if(err)
//       return err
//      callback(res)
//   });
//   connect.end();
// }





















