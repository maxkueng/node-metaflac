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
	'importCuesheetFrom'    : [ '--import-cuesheet-from', options ], 
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

function collect () {
	var ret = {};
	var len = arguments.length;
	for (var i=0; i<len; i++) {
		for (p in arguments[i]) {
			if (arguments[i].hasOwnProperty(p)) {
				ret[p] = arguments[i][p];
			}
		}
	}
	return ret;
}

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

var shorthandOperation = function (opts, path, callback, operation, value) {
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


	if (typeof value !== 'undefined') {
		operationArg += '=' + value + '';
	}
	args.push(operationArg);
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

var removeFirstTag = function (opts, path, tag, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeFirstTag', tag);
};

var removeAllTags = function (opts, path, tag, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeAllTags', tag);
};

var setTag = function (opts, path, tag, value, callback) {
	var field = tag + '=' + value;

	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'setTag', field);
};

// TODO: implement
// var setTagFromFile = function (opts, path, tag, file, callback) {};

var importTagsFrom = function (opts, path, file, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'importTagsFrom', file);
};

var exportTagsTo = function (opts, path, file, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'exportTagsTo', file);
};

var importCuesheetFrom = function (opts, path, file, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'importCuesheetFrom', file);
};

var exportCuesheetTo = function (opts, path, file, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'exportCuesheetTo', file);
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

	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'importPictureFrom', specification);
};

var exportPictureTo = function (opts, path, file, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'exportPictureTo', file);
};

// TODO: implement
// var addReplayGain = function (opts, path, callback) {};

var removeReplayGain = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeReplayGain');
};

var addSeekpoint = function (opts, path, pattern, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'addSeekpoint', pattern);
};

var addPadding = function (opts, path, length, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'addPadding', length);
};

var list = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 

		callback(false, parseMetadataBlocks(ret));

	}, 'list');
};

var remove = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'remove');
};

var removeAll = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'removeAll');
};

var mergePadding = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'mergePadding');
};

var sortPadding = function (opts, path, callback) {
	shorthandOperation(opts, path, function (err, ret) {
		if (err) { callback(true); return; } 
		callback(false);

	}, 'sortPadding');
};

var vorbisComment = function (path, callback) {
	list([
		['blockType', 'VORBIS_COMMENT']
	], path, function (err, blocks) {
		var i in blocks;
		console.log(i);
	});
};

function camelize (str) {
	return str.replace( /[-_\s]([a-z])/ig, function (z, b) { 
		return b.toUpperCase();
	});
}

function parseMetadataBlocks (metadata) {
	var lines = metadata.split("\n");

	var metadataBlocks = {};

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

	if (currentBlock) metadataBlocks[currentBlock.blockNumber] = currentBlock;

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
exports.exportTagsTo = exportTagsTo;
exports.importCuesheetFrom = importCuesheetFrom;
exports.exportCuesheetTo = exportCuesheetTo;
exports.importPictureFrom = importPictureFrom;
exports.exportPictureTo = exportPictureTo;
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
