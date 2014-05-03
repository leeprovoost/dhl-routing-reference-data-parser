// This script takes the DHL country.txt file, only retains the used columns and then 
// stores the JSON document in MongoDB
// See developer documentation here: http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html

/*
TODO:
- remove doubles/triples
- compare nr of postcodes here: http://www.goeievraag.nl/vraag/maatschappij/samenleving/verschillende-postcodes-inclusief-letters-nederland.118761
- get new relic working
*/

"use strict";
require('newrelic');

// start timer
var start = process.hrtime();

// MongoDB configuration
var db = require("mongojs").connect("test"); // "username:password@example.com/mydb"
var mycollection = db.collection('test_ESD_1');

var Transform = require('stream').Transform,
    csv = require('csv-streamify'),
    JSONStream = require('JSONStream'),
    _ = require('lodash');

var nrOfRecords = 0;    

// see parser options defined here: https://github.com/klaemo/csv-stream
var csvToJson = csv({objectMode: true, delimiter: '|' });

var parser = new Transform({objectMode: true});
parser._transform = function (data, encoding, done) {
    var countryCode = data[0];
    var cityName = data[4];
    var postcodeFrom = data[6];
    var postcodeTo = data[7];
    var result;
    var from;
    var to;
    // get rid of first title record
    if (countryCode == "NL") {
        if (postcodeFrom != "" && postcodeTo != "") {
            // postcode available
            if (postcodeFrom === postcodeTo) {
                // no postcode ranges so move on
                result = _.zipObject(
                    ['a', 'b', 'c'],
                    [countryCode, cityName, String(postcodeFrom)]
                );
                this.push(result);
                nrOfRecords++;
            } else {
                // postcode ranges
                from = parseInt(postcodeFrom);
                to = parseInt(postcodeTo);
                if (postcodeFrom == "8041") console.log("From: " + from + ", To: " + to);
                for (var i = from; i <= to; i++) {
                    result = _.zipObject(
                        ['a', 'b', 'c'],
                        [countryCode, cityName, String(i)]
                    );
                    this.push(result);
                    if (postcodeFrom == "8041") console.log("Nr: " + nrOfRecords + ", Counter: " + i);
                    if (postcodeFrom == "8041") console.log(result);
                    nrOfRecords++;
                }
            }
        } else {
            // No postcode, just city
            result = _.zipObject(
                ['a', 'b', 'c'],
                [countryCode, cityName, ""]
            );
            this.push(result);
            nrOfRecords++;
        }
    }
    done();
};
parser.on("end", function (done) {
    console.log("Nr of records processed: " + nrOfRecords);
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log("Processing time: " + process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms"); // print message + time
});

process.stdin
.pipe(csvToJson)
.pipe(parser)
.pipe(process.stdout);









