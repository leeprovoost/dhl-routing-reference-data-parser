// This script takes the DHL country.txt file, only retains the used columns and then 
// stores the JSON document in MongoDB
// See developer documentation here: http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html

/*
TODO:
- memory analytics
- look into suburb thingy?
- dump to multiple 16 MB files
- sorting: indexes
- add country processing kessage
- speed up, loop probably not correct
*/

"use strict";

// start timer
var start = process.hrtime();

var Transform = require('stream').Transform,
    csv = require('csv-streamify'),
    JSONStream = require('JSONStream'),
    _ = require('lodash');

var nrOfRecords = 0;   
var nrOfReducedRecords = 0; 
var cityArray = [];

// see parser options defined here: https://github.com/klaemo/csv-stream
var csvToJson = csv({objectMode: true, delimiter: '|' });

var parser = new Transform({objectMode: true});
parser._transform = function (data, encoding, done) {
    var countryCode = data[0];
    var cityName = data[4];
    var postcodeFrom = data[6];
    var postcodeTo = data[7];
    var from;
    var to;
    var cityArray; // intermediate object for storing record
    if (postcodeFrom != "" && postcodeTo != "") {
        // postcode available
        if (postcodeFrom === postcodeTo) {
            // no postcode ranges so move on
            cityArray = [countryCode, cityName, String(postcodeFrom)];
            this.push(_.zipObject(['a', 'b', 'c'], cityArray));
            nrOfRecords++;
        } else {
            // unpack postcode ranges
            from = parseInt(postcodeFrom);
            to = parseInt(postcodeTo);
            for (var i = from; i <= to; i++) {
                cityArray = [countryCode, cityName, String(i)];
                this.push(_.zipObject(['a', 'b', 'c'], cityArray));
                nrOfRecords++;
            }
        }
    } else {
        // No postcode, just city
        cityArray = [countryCode, cityName, ""];
        this.push(_.zipObject(['a', 'b', 'c'], cityArray));
        nrOfRecords++;
    }
    done();
};
parser.on("end", function (done) {
    console.log("\nNr of records processed: " + nrOfRecords);
    console.log("Nr of final records: " + nrOfReducedRecords);
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log("Processing time: " + process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms"); // print message + time
});

var reducer = new Transform({objectMode: true});
reducer._transform = function (data, encoding, done) {
    var record = JSON.stringify(data);
    if (cityArray.indexOf(record) === -1 && data["a"] !== "Country Code") {
        cityArray.push(record);
        nrOfReducedRecords++;
        this.push(data);
    } 
    done();
};

process.stdin
.pipe(csvToJson)
.pipe(parser)
.pipe(reducer)
.pipe(JSONStream.stringify(false))
.pipe(process.stdout);









