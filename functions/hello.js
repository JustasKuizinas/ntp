
exports.handler = function(event, context, callback) {
    var subscribersCount = 2556; 
    subscribersCount++;
    callback(null, {
        statusCode: 200,
        body: subscribersCount
    });
}