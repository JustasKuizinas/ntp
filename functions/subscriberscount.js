var subscriberscount = 2556;
 
exports.handler = function(event, context, callback) {

    if(event.httpMethod=='POST'){
        subscriberscount=subscriberscount+1; 
        callback(null, {
            statusCode: 200,
            body: ""+subscriberscount
        });
    }
    if(event.httpMethod=='GET'){
        callback(null, {
            statusCode: 200,
            body: ""+subscriberscount
        });
    }

}