const https = require('https');
var config = require('./config');

//console.time('Total Time');
console.log(config.version.toPrecision(2));
console.log(config.tag);

var host = 'data.mixpanel.com';
var fromDate = '2018-03-21';
var toDate = '2018-03-21';
var eventName = '["SEARCH-RESULT"]';
var query = '/api/2.0/export/?from_date='+fromDate+'&to_date='+toDate+'&event='+eventName;
var username = '72752490e9ad06acd42d0737358a9579';
var passw = 'tsmore';
var data = "";

const options = {
    hostname: host,
    path: query,
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + new Buffer(username + ':' + passw).toString('base64')
    }
};


const req = https.request(options, function (res) {
    //console.time('Get Info')
    console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);

    res.on('data', function(d) {
        data += d;
    });

    res.on('end', function(){
        //console.timeEnd('Get Info')
        //console.time('Writing JSON')
        console.log('Request finished');
        var fs = require('fs');
        fs.writeFile("out.json", data, function(err) {
            if(err) {
                console.log("unable to write data");
                return console.log(err);
            }
            else
            {
                //console.timeEnd('Writing JSON')
                console.log("The data has been recodered!");
            }
        });
        //console.timeEnd('Total Time');
    });
});

req.on('error', (e) => { console.log("Unable to fetch data"); console.error(e); });
req.end();
