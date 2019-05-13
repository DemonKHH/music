const mysql = require('mysql');
const config={
    host     : '156.238.1.71',
    user     : 'demon',
    password : 'ht19980706',
    database : 'music'
  };
var pool = mysql.createPool(config);

exports.querySQL = function(sql, callback){
    pool.getConnection(function(err,conn){
        conn.query(sql,function(err,rows,fields){
            callback(err,rows,fields); 
            conn.release();   // 不要忘了释放
        });        
    });
}