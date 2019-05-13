var connect = require('./connect.js');
var getUser = function(username,callback){
    var sql = 'select * from userslist';
    connect.querySQL(sql,function(err,rows,fields){
        callback(err,rows,fields);        
    });
};
getUser();