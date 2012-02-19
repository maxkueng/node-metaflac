var spawn = require('child_process').spawn;
var Stream = require('stream').Stream;
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
	'showMD5sum'            : [ '--show-md5sum', options ], 
	'showMinBlocksize'      : [ '--show-min-blocksize', options ], 
	'showMaxBlocksize'      : [ '--show-max-blocksize', options ], 
	'showMinFramesize'      : [ '--show-min-framesize', options ], 
	'showMaxFramesize'      : [ '--show-max-framesize', options ], 
	'showMaxFramesize'      : [ '--show-max-framesize', options ], 
	'showSampleRate'        : [ '--show-sample-rate', options ], 
	'showChannels'          : [ '--show-channels', options ], 
	'showBps'               : [ '--show-bps', options ], 
	'showTotalSamples'      : [ '--show-total-samples', options ], 
	'showVendorTag'         : [ '--show-vendor-tag', options ], 
	'showTag'               : [ '--show-tag', options ], 
	'removeTag'             : [ '--remove-tag', options ], 
	'removeFirstTag'        : [ '--remove-first-tag', options ], 
	'removeAllTags'         : [ '--remove-all-tags', options ], 
	'setTag'                : [ '--set-tag', options ], 
	'setTagFromFile'        : [ '--set-tag-from-file', options ], 
	'importTagsFrom'        : [ '--import-tags-from', options ], 
	'exportTagsTo'          : [ '--export-tags-to', options ], 
	'importCuesheetFrom'    : [ '--import-cuesheet-from', collect(options, { 'noCuedSeekpoints' : '--no-cued-seekpoints' }) ], 
	'exportCuesheetTo'      : [ '--export-cuesheet-to', options ], 
	'importPictureFrom'     : [ '--import-picture-from', options ], 
	'exportPictureTo'       : [ '--export-picture-to', collect(options, { 'blockNumber' : blockOptions['blockNumber'] }) ], 
	'addReplayGain'         : [ '--add-replay-gain', options ], 
	'removeReplayGain'      : [ '--remove-replay-gain', options ], 
	'addSeekpoint'          : [ '--add-seekpoint', options ], 
	'addPadding'            : [ '--add-padding', options ], 
	'list'                  : [ '--list', collect(options, blockOptions, { 'applicationDataFormat' : '--application-data-format' }) ],  
	'applicationDataFormat' : [ '--application-data-format', options ], 
	'remove'                : [ '--remove', collect(options, blockOptions) ],  
	'removeAll'             : [ '--remove-all', options ], 
	'mergePadding'          : [ '--merge-padding', options ], 
	'sortPadding'           : [ '--sort-padding', options ]
};

var checkOpts = function (opts, validOpts) {
	if (opts) {
		for (var i = 0; i < opts.length; i++) {
			var opt = opts[i];
			if (opt.constructor == Array) opt = opt[0];
			if (typeof validOpts[opt] === 'undefined') return false;
		}
	}

	return true;
};

var metaflac = function (opts, path, callback, operation, value) {
	var operationArg = operations[operation][0];
	var operationOpts = operations[operation][1];

	if (!checkOpts(opts, operationOpts)) { 
		callback(true, null); 
		return;
	}

	var args = [];
	for (var i = 0; i < opts.length; i++) {
		var opt = opts[i];
		if (opt.constructor == Array) {
			var o = operationOpts[opt[0]];
			var v = opt[1];
			if (v.constructor == Array) v = v.join(',');
			opt = o + '=' + v;
		} else {
			opt = operationOpts[opt];
		}
		args.push(opt);
	}

	var stream;
	if (value instanceof Stream) {
		stream = value;
		value = '-';
	}

	if (typeof value !== 'undefined') {
		operationArg += '=' + value + '';
	}
	args.push(operationArg);
	args.push(path);

	var out = '';
	var mf = spawn(binPath, args);

	if (stream && typeof stream.readable !== 'undefined') {
		stream.pipe(mf.stdin);
	}

	if (stream && typeof stream.writable !== 'undefined') {
		out = null;
		mf.stdout.pipe(stream);

	} else {
		mf.stdout.on('data', function (data) {
			out += data;
		});
	}

	mf.on('exit', function (code) {
		if (code !== 0) {
			callback(true, null)
		} else {
			callback(false, out)
		}
	});
};

var showMD5sum = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMD5sum');
};

var showMinBlocksize = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMinBlocksize');
};

var showMaxBlocksize = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMaxBlocksize');
};

var showMinFramesize = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMinFramesize');
};

var showMaxFramesize = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showMaxFramesize');
};

var showSampleRate = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showSampleRate');
};

var showChannels = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showChannels');
};

var showBps = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showBps');
};

var showTotalSamples = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showTotalSamples');
};

var showVendorTag = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showVendorTag');
};

var showTag = function (opts, path, tag, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true, null); return; } 

		ret = ret.replace(tag + '=', '');
		ret = ret.replace(/[\s\n]*$/, '');
		callback(false, ret);

	}, 'showTag', tag);
};

var removeTag = function (opts, path, tag, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeTag', tag);
};

var removeFirstTag = function (opts, path, tag, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeFirstTag', tag);
};

var removeAllTags = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeAllTags');
};

var setTag = function (opts, path, tag, value, callback) {
	var field = tag + '=' + value;

	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'setTag', field);
};

// TODO: implement
// var setTagFromFile = function (opts, path, tag, file, callback) {};

var importTagsFrom = function (opts, path, file, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'importTagsFrom', file);
};

var importTagsFromStream = function (opts, path, stream, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'importTagsFrom', stream);
};

var exportTagsTo = function (opts, path, file, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'exportTagsTo', file);
};

var exportTagsToStream = function (opts, path, stream, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'exportTagsTo', stream);
};

var importCuesheetFrom = function (opts, path, file, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'importCuesheetFrom', file);
};

var importCuesheetFromStream = function (opts, path, stream, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'importCuesheetFrom', stream);
};

var exportCuesheetTo = function (opts, path, file, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'exportCuesheetTo', file);
};

var exportCuesheetToStream = function (opts, path, stream, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'exportCuesheetTo', stream);
};

var importPictureFrom = function (opts, path, specification, callback) {
	// [TYPE]|[MIME-TYPE]|[DESCRIPTION]|[WIDTHxHEIGHTxDEPTH[/COLORS]]|FILE 
	if (specification.constructor == Object) {
		var specs = [
			( (typeof specification.type        !== 'undefined') ? specification.type : '' ), 
			( (typeof specification.mimeType    !== 'undefined') ? specification.mimeType : '' ), 
			( (typeof specification.description !== 'undefined') ? specification.description : '' ), 
			( (typeof specification.dimensions  !== 'undefined') ? specification.dimensions : '' ), 
			( (typeof specification.file        !== 'undefined') ? specification.file : '' )
		];
		specification = specs.join('|');
	}

	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'importPictureFrom', specification);
};

var exportPictureTo = function (opts, path, file, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'exportPictureTo', file);
};

var exportPictureToStream = function (opts, path, stream, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'exportPictureTo', stream);
};

// TODO: implement
// var addReplayGain = function (opts, path, callback) {};

var removeReplayGain = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeReplayGain');
};

var addSeekpoint = function (opts, path, pattern, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'addSeekpoint', pattern);
};

var addPadding = function (opts, path, length, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'addPadding', length);
};

var list = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 

		callback(false, parseMetadataBlocks(ret));

	}, 'list');
};

var remove = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'remove');
};

var removeAll = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeAll');
};

var mergePadding = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'mergePadding');
};

var sortPadding = function (opts, path, callback) {
	metaflac(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'sortPadding');
};

var vorbisComment = function (path, keysToUpper, callback) {
	if (typeof callback == 'undefined') {
		callback = keysToUpper;
		keysToUpper = false;
	}

	list([
		['blockType', 'VORBIS_COMMENT']
	], path, function (err, blocks) {
		if (err) { callback(true); return; } 
		if (blocks.length < 1) { callback(true); return; } 

		var block = blocks[0];
		var comments = parseVorbisComments(block.comments, keysToUpper);
		callback(false, comments);
	});
};

function camelize (str) {
	return str.replace( /[-_\s]([a-z])/ig, function (z, b) { 
		return b.toUpperCase();
	});
}

function collect () {
	var ret = {};
	var len = arguments.length;
	for (var i = 0; i < len; i++) {
		for (p in arguments[i]) {
			if (arguments[i].hasOwnProperty(p)) {
				ret[p] = arguments[i][p];
			}
		}
	}
	return ret;
}

function parseVorbisComments (data, keysToUpper) {
	var comments = {};
	var lines = data.split("\n");

	for (var i = 0; i <  lines.length; i++) {
		var line = lines[i];
		if (match = /^([^=]+)=(.*)$/i.exec(line)) {
			var tag = match[1];
			if (keysToUpper) tag = tag.toUpperCase(); 
			var value = match[2];

			if (typeof comments[tag] === 'undefined') {
				comments[tag] = value;
			} else if (comments[tag].constructor == Array) {
				comments[tag].push(value);
			} else {
				comments[tag] = [ comments[tag] ];
				comments[tag].push(value);
			}
		}
	}

	return comments;
}

function parseMetadataBlocks (metadata) {
	var lines = metadata.split("\n");

	var metadataBlocks = [];

	var currentBlock;
	var prevProperty;
	var dataBlock = false;

	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];

		if (match = /^METADATA block #([0-9]+)$/.exec(line)) {
			if (currentBlock) metadataBlocks[currentBlock.blockNumber] = currentBlock;
			currentBlock = { 'blockNumber' : match[1] };
			continue;
		}

		if ((typeof currentBlock.blockType === 'undefined') 
				&& (match = /^  type: ([0-9]+) \(([A-Z_]+)\)$/.exec(line))) {
			currentBlock.blockType = { 'name' : match[2], 'number' : match[1] };
			continue;
		}

		if (match = /^  ([a-z].+):(\s+(.*))?$/.exec(line)) {
			var name = camelize(match[1]);
			currentBlock[name] = null;

			if (match[3]) {
				var value = match[3];

				if (match = /^([^\(]) \(.*$/.exec(value)) {
					value = match[1];
				}

				currentBlock[name] = value;
			}

			prevProperty = name;
			continue;
		}

		if ((typeof prevProperty !== 'undefined')
				&& (match = /^    [^:]+: (.*)$/.exec(line))) {

			if (!dataBlock) {
				currentBlock[prevProperty] = match[1];
				dataBlock = true;
			} else {
				currentBlock[prevProperty] += "\n" + match[1];
			}

			continue;

		} else {
			dataBlock = false;
		}

	}

	if (currentBlock) metadataBlocks.push(currentBlock);

	return metadataBlocks;
}

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
exports.removeFirstTag = removeFirstTag;
exports.removeAllTags = removeAllTags;
exports.setTag = setTag;
//exports.setTagFromFile = setTagFromFile;
exports.importTagsFrom = importTagsFrom;
exports.importTagsFromStream = importTagsFromStream;
exports.exportTagsTo = exportTagsTo;
exports.exportTagsToStream = exportTagsToStream;
exports.importCuesheetFrom = importCuesheetFrom;
exports.importCuesheetFromStream = importCuesheetFromStream;
exports.exportCuesheetToStream = exportCuesheetToStream;
exports.importPictureFrom = importPictureFrom;
exports.exportPictureTo = exportPictureTo;
exports.exportPictureToStream = exportPictureToStream;
//exports.addReplayGain = addReplayGain;
exports.removeReplayGain = removeReplayGain;
exports.addSeekpoint = addSeekpoint;
exports.addPadding = addPadding;
exports.list = list;
exports.remove = remove;
exports.removeAll = removeAll;
exports.mergePadding = mergePadding;
exports.sortPadding = sortPadding;

exports.vorbisComment = vorbisComment;
