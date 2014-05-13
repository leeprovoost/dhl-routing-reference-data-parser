// This script takes the DHL countrypc.txt file, only retains the used columns and then 
// outputs JSON documents
// See developer documentation here: http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html

"use strict";

// start timer
var start = process.hrtime();

var Transform = require('stream').Transform,
    csv = require('csv-streamify'),
    JSONStream = require('JSONStream'),
    _ = require('lodash');

var nrOfRecords = 0;    

// see parser options defined here: https://github.com/klaemo/csv-stream
var csvToJson = csv({objectMode: true, delimiter: '|' });

var parser = new Transform({objectMode: true});
parser._transform = function (data, encoding, done) {
    var result = this._parseRow(data);
    this.push(result);
    nrOfRecords++;
    done();
};
// Parse a data row into an object
parser._parseRow = function (row) {
    // We're explicitly converting the postcode field to String, otherwise MongoDB
    // will use both Int32 and String field types
    var result = _.zipObject(
        ['a', 'b', 'c'],
        [row[0], String(row[1]), row[2]]
    );
    return result;
};
parser.on("end", function (done) {
    // Uncomment below if you are interested in debugging output
    /*
    console.log("Nr of records processed: " + nrOfRecords);
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log("Processing time: " + process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms"); // print message + time
    */
});

process.stdin
.pipe(csvToJson)
.pipe(parser)
.pipe(JSONStream.stringify(false))
.pipe(process.stdout);









