// This script takes the DHL country.txt file, only retains the used columns and then 
// stores the JSON document in MongoDB
// See developer documentation here: http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html

"use strict";

// start timer
var start = process.hrtime();

// MongoDB configuration
var db = require("mongojs").connect("test"); // "username:password@example.com/mydb"
var mycollection = db.collection('intl_routing_api_countrypc');

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
    console.log("Nr of records processed: " + nrOfRecords);
});

// store country document in MongoDB
var writeToMongo = new Transform({objectMode: true});
writeToMongo._transform = function (data, encoding, done) {
    mycollection.insert(data, function (err, saved) {
        if (err || !saved) {
            console.log(err);
        } else {
            nrOfRecords--;
            // TODO: not the most elegant solution, need to find something better
            if (nrOfRecords === 0) {
                db.close();
            }
        }
    });
    done();
};
writeToMongo.on("finish", function (done) {
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log("Processing time: " + process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms"); // print message + time
});

process.stdin
.pipe(csvToJson)
.pipe(parser)
.pipe(writeToMongo);









