exports.handler = function (event, context, callback) {

    if (event.httpMethod == 'POST') {
        process.env.subscribersCount = parseInt(process.env.subscribersCount) + 1;
        var subscriberscount = process.env.subscribersCount;
        callback(null, {
            statusCode: 200,
            body: "" + subscriberscount
        });
    }
    if (event.httpMethod == 'GET') {
        var subscriberscount = parseInt(process.env.subscribersCount);
        callback(null, {
            statusCode: 200,
            body: "" + subscriberscount
        });
    }

}