var spawn = require('child_process').spawn;
var binPath = 'metaflac';

var options = {
	'preserveModtime'       : '--preserve-modtime', 
	'withFilename'          : '--with-filename', 
	'noFilename'            : '--no-filename', 
	'noUTF8Convert'         : '--no-utf8-convert', 
	'dontUsePadding'        : '--dont-use-padding'
};

var blockOptions = {
	'blockNumber'           : '--block-number', 
	'blockType'             : '--block-type', 
	'exceptBlockType'       : '--except-block-type'
};

var operations = {
	'showMD5sum'            : '--show-md5sum', 
	'showMinBlocksize'      : '--show-min-blocksize', 
	'showMaxBlocksize'      : '--show-max-blocksize', 
	'showMinFramesize'      : '--show-min-framesize', 
	'showMaxFramesize'      : '--show-max-framesize', 
	'showMaxFramesize'      : '--show-max-framesize', 
	'showSampleRate'        : '--show-sample-rate', 
	'showChannels'          : '--show-channels', 
	'showBps'               : '--show-bps', 
	'showTotalSamples'      : '--show-total-samples', 
	'showVendorTag'         : '--show-vendor-tag', 
	'showTag'               : '--show-tag', 
	'removeTag'             : '--remove-tag', 
	'removeFirstTag'        : '--remove-first-tag', 
	'removeAllTags'         : '--remove-all-tags', 
	'setTag'                : '--set-tag', 
	'setTagFromFile'        : '--set-tag-from-file', 
	'importTagsFrom'        : '--import-tags-from', 
	'exportTagsTo'          : '--export-tags-to', 
	'importCuesheetFrom'    : '--import-cuesheet-from', 
	'exportCuesheetTo'      : '--export-cuesheet-to', 
	'importPictureFrom'     : '--import-picture-from', 
	'exportPictureTo'       : '--export-picture-to', 
	'addReplayGain'         : '--add-replay-gain', 
	'removeReplayGain'      : '--remove-replay-gain', 
	'addSeekpoint'          : '--add-seekpoint', 
	'addPadding'            : '--add-padding', 
	'list'                  : '--list', 
	'applicationDataFormat' : '--application-data-format', 
	'remove'                : '--remove', 
	'removeAll'             : '--remove-all', 
	'mergePadding'          : '--merge-padding', 
	'sortPadding'           : '--sort-padding'
};

var metaflac = function (args, callback) {
	var out = '';
	var mf = spawn(binPath, args);
	mf.stdout.on('data', function (data) {
		out += data;
	});

	mf.on('exit', function (code) {
		if (code !== 0) {
			callback({ 'code' : code, 'message' : 'Couldn\'t read metadata' }, null)
		} else {
			callback(false, out)
		}
	});
};

var checkOpts = function (opts) {
	if (opts) {
		for (var i = 0; i < opts.length; i++) {
			var opt = opts[i];
			if (typeof options[opt] === 'undefined') return false;
		}
	}

	return true;
};

var shorthandOperation = function (opts, path, callback, operation, value) {
	if (!checkOpts(opts)) { 
		callback(true, null); 
		return;
	}

	var args = [];
	for (var i = 0; i < opts.length; i++) {
		args.push(options[opts[i]]);
	}

	operation = operations[operation];

	if (typeof value !== 'undefined') {
		operation += '=' + value;
	}
	args.push(operation);
	args.push(path);

	metaflac(args, callback);
};

var showMD5sum = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMD5sum');
};

var showMinBlocksize = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMinBlocksize');
};

var showMaxBlocksize = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMaxBlocksize');
};

var showMinFramesize = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMinFramesize');
};

var showMaxFramesize = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMaxFramesize');
};

var showSampleRate = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showSampleRate');
};

var showChannels = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showChannels');
};

var showBps = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showBps');
};

var showTotalSamples = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showTotalSamples');
};

var showVendorTag = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showVendorTag');
};

var showTag = function (opts, path, tag, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(tag + '=', '');
		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showTag', tag);
};

var removeTag = function (opts, path, tag, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeTag', tag);
};

var vorbisComment = function (path, callback) {
	metaflac([
		'--list', 
		'--block-type=VORBIS_COMMENT', 
		path
	], function (err, data) {
		if (err) {
			callback(err, null);
			return;
		}

		var tags = {};
		var regex = /:\s+(.+)=(.+)$/;

		var lines = data.split("\n");
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var matches = regex.exec(line);

			if (matches) {
				tags[matches[1]] = matches[2];
			}
		}

		callback(null, tags);
	});
};

exports.showMD5sum = showMD5sum;
exports.showMinBlocksize = showMinBlocksize;
exports.showMaxBlocksize = showMaxBlocksize;
exports.showMinFramesize = showMinFramesize;
exports.showMaxFramesize = showMaxFramesize;
exports.showSampleRate = showSampleRate;
exports.showChannels = showChannels;
exports.showBps = showBps;
exports.showTotalSamples = showTotalSamples;
exports.showVendorTag = showVendorTag;
exports.showTag = showTag;
exports.removeTag = removeTag;


exports.vorbisComment = vorbisComment;
