var subscribersCount = 2556;
 
exports.handler = function(event, context, callback) {

    subscribersCount++;
    callback(null, {
        statusCode: 200,
        body: ""+subscribersCount
    });
}