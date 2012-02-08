var spawn = require('child_process').spawn;
var path = require('path');
var util = require('util');
var fs = require('fs');
var Stream = require('stream').Stream;

var s = new Stream();
s.write('ARTIST=Zeigeist');

//var stream = fs.createReadStream('./tags.txt');

var filePath = 'data/Zeigeist - The Jade Motel/1 - Humanitarianism.flac';
filePath = path.resolve(filePath);

var out = '';
var mf = spawn('metaflac', [
//	'--list', 
//	'--block-type=VORBIS_COMMENT', 
	'--import-tags-from=-', 
	filePath
]);

s.pipe(mf.stdin);

mf.stdout.on('data', function (data) {
	out += data;
});

mf.on('exit', function (code) {
	if (code !== 0) {
		console.log('Exited with code', code);
	} else {
		console.log(out);
	}
});

