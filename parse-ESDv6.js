// This script takes the DHL ESDv6.txt file, only retains the used columns and then
// outputs JSON documents
// See developer documentation here: http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html

"use strict";

// start timer
var start = process.hrtime();

var Transform = require('stream').Transform,
    csv = require('csv-streamify'),
    JSONStream = require('JSONStream'),
    fs = require('fs'),
    _ = require('lodash');

var nrOfRecords = 0;
var cityArray = [];

// see parser options defined here: https://github.com/klaemo/csv-stream
var fstream = fs.createReadStream('temp4.txt');
var csvToJson = csv({objectMode: true, delimiter: '|' });

var parser = new Transform({objectMode: true});
parser._transform = function (data, encoding, done) {
    var countryCode = data[0];
    var cityName = data[1];
    var suburbName = data[2];
    var postcodeFrom = data[3];
    var postcodeTo = data[4];
    var from;
    var to;
    var cityArray; // intermediate object for storing record
    if (postcodeFrom != "" && postcodeTo != "") {
        // postcode available
        if (postcodeFrom === postcodeTo) {
            // no postcode ranges so move on
            cityArray = [countryCode, cityName, suburbName, String(postcodeFrom)];
            this.push(_.zipObject(['a', 'b', 'c', 'd'], cityArray));
            nrOfRecords++;
        } else {
            // unpack postcode ranges
            from = parseInt(postcodeFrom);
            to = parseInt(postcodeTo);
            for (var i = from; i <= to; i++) {
                cityArray = [countryCode, cityName, suburbName, String(i)];
                this.push(_.zipObject(['a', 'b', 'c', 'd'], cityArray));
                nrOfRecords++;
            }
        }
    } else {
        // No postcode, just city
        cityArray = [countryCode, cityName, suburbName, ""];
        this.push(_.zipObject(['a', 'b', 'c', 'd'], cityArray));
        nrOfRecords++;
    }
    done();
};
parser.on("end", function (done) {
    console.log("\nNr of records processed: " + nrOfRecords);
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log("Processing time: " + process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms"); // print message + time
});

fstream
.pipe(csvToJson)
.pipe(parser)
.pipe(JSONStream.stringify(false))
.pipe(process.stdout);
