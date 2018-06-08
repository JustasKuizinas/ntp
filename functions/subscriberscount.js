var subscriberscount = 2556;
 
exports.handler = function(event, context, callback) {

    subscriberscount++;
    if(event.httpMethod=='POST'){
        subscriberscount++;
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