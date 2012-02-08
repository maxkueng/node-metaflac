var metaflac = require('./lib/metaflac');
var path = require('path');
var util = require('util');

//var filePath = 'data/Zeigeist - The Jade Motel/1 - Humanitarianism.flac';
var filePath = 'data/B12 - 1996 - Time Tourist (album)/10 - Redcell - Radiophonic Workshop.flac';
filePath = path.resolve(filePath);

metaflac.showMD5sum([], filePath, function (err, sum) {
	if (err) console.log(err);
	if (sum) console.log(sum);
});

metaflac.showMinBlocksize([], filePath, function (err, size) {
	if (err) console.log(err);
	if (size) console.log(size);
});

metaflac.showMaxBlocksize([], filePath, function (err, size) {
	if (err) console.log(err);
	if (size) console.log(size);
});

metaflac.showMinFramesize([], filePath, function (err, size) {
	if (err) console.log(err);
	if (size) console.log(size);
});

metaflac.showMaxFramesize([], filePath, function (err, size) {
	if (err) console.log(err);
	if (size) console.log(size);
});

metaflac.showSampleRate([], filePath, function (err, rate) {
	if (err) console.log(err);
	if (rate) console.log(rate);
});

metaflac.showChannels([], filePath, function (err, channels) {
	if (err) console.log(err);
	if (channels) console.log(channels);
});

metaflac.showBps([], filePath, function (err, rate) {
	if (err) console.log(err);
	if (rate) console.log(rate);
});

metaflac.showTotalSamples([], filePath, function (err, samples) {
	if (err) console.log(err);
	if (samples) console.log(samples);
});

metaflac.showVendorTag([], filePath, function (err, tag) {
	if (err) console.log('err', err);
	if (tag) console.log(tag);
});

metaflac.showTag(['noUTF8Convert'], filePath, 'MUSICBRAINZ_DISCID', function (err, value) {
	if (err) console.log(err);
	if (value) console.log(value);
});

/*
metaflac.importPictureFrom([], filePath, 'xxx.jpg', function (err, value) {
	if (err) console.log(err);
	if (value) console.log(value);
});
*/

/*
metaflac.exportPictureTo([], filePath, 'xxx.jpg', function (err, value) {
	if (err) console.log(err);
	if (value) console.log(value);
});
*/

metaflac.vorbisComment(filePath, function (err, value) {
	if (err) console.log(err);
	if (value) console.log(value);
});

/*metaflac.list([
	[ 'blockType', 'PICTURE' ], 
], filePath, function (err, value) {
	if (err) console.log(err);
	if (value) console.log(value);
});*/
