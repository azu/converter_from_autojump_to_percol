var fs = require('fs');
var es = require('event-stream');
var path = require("path");
var autojumpDB = process.argv[2];
if (autojumpDB == null) {
    throw new Error("Usage : node index.js /path/to/autojump.txt");
}

/**
 * line by line
 */
function main() {
    return es.map(function (line, cb) {
        var split = line.split("\t");
        var count = parseInt(split[0], 10),
            dirPath = String(split[1]);
        var output = "";
        for(var i=0;i<count;i++) {
            output += dirPath + "\n";
        }
        cb(null, output)
    });
}

fs.createReadStream(path.resolve(autojumpDB), {flags: 'r'})
    .pipe(es.split())
    .pipe(main())
    .pipe(process.stdout);