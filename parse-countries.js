// This script takes the DHL country.txt file, only retains the used columns and then 
// stores the JSON document in MongoDB
// See developer documentation here: http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html

"use strict";

// MongoDB configuration
var databaseUrl = "test"; // "username:password@example.com/mydb"
var collections = ["test_country"];
var db = require("mongojs").connect(databaseUrl, collections);

var Transform = require('stream').Transform,
    csv = require('csv-streamify'),
    JSONStream = require('JSONStream'),
    _ = require('lodash');

// see parser options defined here: https://github.com/klaemo/csv-stream
var csvToJson = csv({objectMode: true, delimiter: '|' });

var parser = new Transform({objectMode: true});
parser._transform = function (data, encoding, done) {
    var result = this._parseRow(data);
    var countryCode = result['a'];
    if (countryCode !== "XX" && countryCode !== "XL" && countryCode !== "XA" ) {
        this.push(result);
    }
    done();
};
// Parse a data row into an object
parser._parseRow = function (row) {
    // convert Postcode Flag N/Y to booleans
    var postcode_flag = false;
    if (row[10] === "Y") {
        postcode_flag = true;
    }
    // filter the columns we are interested in, we're using single letter column 
    // names to save space in our MongoDB database
    // a: Country Code, b: Country Name, c: Currency Code, d: Use Postcode Flag
    var result = _.zipObject(
        ['a', 'b', 'c', 'd'],
        [row[0], row[1], row[8], postcode_flag]
    );
    return result;
};

// store country document in MongoDB
var writeToMongo = new Transform({objectMode: true});
writeToMongo._transform = function (data, encoding, done) {
    //this.push(this._parseRow(data));
    this._parseRow(data)
    done();
};
writeToMongo._parseRow = function (row) {
    db.test_country.insert(row, function (err, saved) {
        if (err || !saved) {
            console.log(err);
        } 
    });
    return row;
};

process.stdin
.pipe(csvToJson)
.pipe(parser)
.pipe(writeToMongo);


/*
process.stdin.on('finish', function() {
    // close mongodb connection
    db.close();
});
*/









