const AWS = require('aws-sdk');
const util = require("util");
const request = require("request");
const fs = require('fs');
var dateFormat = require('dateformat');
const jsonexport = require('jsonexport');

// const s3 = new AWS.S3({//     accessKeyId: ``,//     secretAccessKey: ``//   });
let apiOptions = {  
    url: `http://dummy.restapiexample.com/api/v1/employees`,  
    method: "GET",
    // auth: {
    //     user: ``,
    //     pass: ``,
    // },  
    timeout: 99999999, // Miliseconds  
    rejectUnauthorized: false
};

let startTime = new Date();

console.log("Execution started at ==> " , dateFormat(startTime, "dddd, mmmm dS, yyyy, h:MM:ss TT") );
const requestPromise = util.promisify(request);
return requestPromise(apiOptions, function (err, res, body) {
    if (err) {    console.log(err);  } 
    else {  
        let endTime = new Date();  
        console.log("Execution ended at ==> " , dateFormat(endTime, "dddd, mmmm dS, yyyy, h:MM:ss TT") );
        let json = JSON.parse(body);  
        jsonexport(json.data, function(err, csv){
            if (err) return console.error(err);   
            console.log(csv);
            const params = {        
                Bucket: `virens3bucketforsampletest123`,        
                Key: 'materials1.csv',         
                Body: csv  
            };
            s3.upload(params, function(s3Err) {
            if (s3Err) throw s3Err        
            console.log(`File uploaded successfully `);    
        });   
    });     
}});

