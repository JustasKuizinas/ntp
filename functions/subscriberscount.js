
exports.handler = function(event, context, callback) {
  
    if(event.httpMethod=='POST'){
        var subscriberscount = parseInt(process.env.subscribersCount) + 1;
        callback(null, {
            statusCode: 200,
            body: ""+subscriberscount
        });
    }
    if(event.httpMethod=='GET'){
        var subscriberscount = parseInt(process.env.subscribersCount);
        callback(null, {
            statusCode: 200,
            body: ""+subscriberscount
        });
    }

}