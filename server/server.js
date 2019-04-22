var ws =require('nodejs-websocket');

var server = ws.createServer(function(conn) {
 
    conn.on('text', function(str) {
        console.log(str)
        conn.sendText(str);
    });
 
    conn.on('close', function(req,res) {
        console.log('closed')
    });
 
    conn.on('error', function(err) {
        console.log(err);
    });
}).listen(3000);

