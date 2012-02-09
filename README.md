Metaflac
========

This module aims to be a more or less complete wrapper for the
[metaflac][metaflac] command line utility. 

Most documentation ist shamelessly stolen from the [metaflac(1) man page][man].

#### Limitations

 - Can only run one operation at a time
 - Can only process one FLAC at a time

API
---

Load the `metaflac` module

```javascript
var metaflac = require('metaflac');
```

### Options

 - `preserveModtime` Preserve the original modification time in spite of edits. 
 - `withFilename` Prefix each output line with the FLAC file name (the default if more than one FLAC file is specified). 
 - `noFilename` Do not prefix each output line with the FLAC file name (the default if only one FLAC file is specified). 
 - `noUTF8Convert` Do not convert tags from UTF-8 to local charset, or vice versa. This is useful for scripts, and setting tags in situations where the locale is wrong. 
 - `dontUsePadding` By default metaflac tries to use padding where possible to avoid rewriting the entire file if the metadata size changes. Use this option to tell metaflac to not take advantage of padding this way.
 - `blockNumber` (only for `list`, `remove` and  `exportPictureTo` operations) Has a value of either a single block number or an array of block numbers to display. The first block, the _STREAMINFO_ block, is block 0.
 - `blockType` (only for `list` and `remove` operations) Has a value of either a single block type or an array of block types to be included with this operation.
 - `exceptBlockType` (only for `list` and `remove` operations) Has a value of either a single block type or an array of block types to be excluded with this operation.
 - `applicationDataFormat` (only for `list` operation) If the application block you are displaying contains binary data but your --data-format=text, you can display a hex dump of the application data contents instead using --application-data-format=hexdump. 
 - `noCuedSeekpoints` (only for `importCuesheetFrom` operation) 

The valid block types are: _STREAMINFO_, _PADDING_, _APPLICATION_, _SEEKTABLE_, _VORBIS_COMMENT_. You may narrow down the types of _APPLICATION_ blocks displayed as follows:

`APPLICATION:abcd` The _APPLICATION_ block(s) whose textual representation of the 4-byte ID is "abcd"  
`APPLICATION:0xXXXXXXXX` The _APPLICATION_ block(s) whose hexadecimal big-endian representation of the 4-byte ID is "0xXXXXXXXX". For the example "abcd" above the hexadecimal equivalalent is 0x61626364 

### Functions

The `options` argument is an array containing none or more of the above _options_. Options with a value are represented as an array. Multiple values ara again represented as an array.
`fileName` is the path to the FLAC file.
`callback` is a function that gets an error as boolean and sometimes a return value.


Options Example:

```javascript
var options = [
	'noUTF8Convert', 
	[ 'blockType', 'VORBIS_COMMENT' ], 
	[ 'blockNumber', [2,3,5] ]
];
```

 - __metaflac.showMD5sum(options, fileName, callback(err, md5sum))__  
   `--show-md5sum` Show the MD5 signature from the _STREAMINFO_ block. 

 - __metaflac.showMinBlocksize(options, fileName, callback(err, blocksize))__  
  `--show-min-blocksize` Show the minimum block size from the _STREAMINFO_ block. 

 - __metaflac.showMaxBlocksize(options, fileName, callback(err, blocksize))__  
   `--show-max-blocksize` Show the maximum block size from the _STREAMINFO_ block. 

 - __metaflac.showMinFramesize(options, fileName, callback(err, framesize))__  
   `--show-min-framesize` Show the minimum frame size from the _STREAMINFO_ block. 

 - __metaflac.showMaxFramesize(options, fileName, callback(err, framesize))__  
   `--show-max-framesize` Show the maximum frame size from the _STREAMINFO_ block. 

 - __metaflac.showSampleRate(options, fileName, callback(err, sampeRate))__  
   `--show-sample-rate` Show the sample rate from the _STREAMINFO_ block. 

 - __metaflac.showChannels(options, fileName, callback(err, channels))__  
   `--show-channels` Show the number of channels from the _STREAMINFO_ block. 

 - __metaflac.showBps(options, fileName, callback(err, bps))__  
   `--show-bps` Show the # of bits per sample from the _STREAMINFO_ block. 

 - __metaflac.showTotalSamples(options, fileName, callback(err, totalSamples))__  
   `--show-total-samples` Show the total # of samples from the _STREAMINFO_ block. 

 - __metaflac.showVendorTag(options, fileName, callback(err, vendorTag))__  
   `--show-vendor-tag` Show the vendor string from the _VORBIS_COMMENT_ block. 

 - __metaflac.showTag(options, fileName, name, callback(err, value))__  
   `--show-tag=name` Show all tags where the the field name matches 'name'. 

 - __metaflac.removeTag(options, fileName, name, callback(err))__  
   `--remove-tag=name` Remove all tags whose field name is 'name'. 

 - __metaflac.removeFirstTag(options, fileName, name, callback(err))__  
   `--remove-first-tag=name` Remove first tag whose field name is 'name'. 

 - __metaflac.removeAllTags(options, fileName, callback(err))__  
   `--remove-all-tags` Remove all tags, leaving only the vendor string. 

 - __metaflac.removeAllTags(options, fileName, name, value, callback(err))__  
   `--set-tag=field` Add a tag. If there is currently no tag block, one will be created. 

 - __metaflac.setTagFromFile ...__ NOT IMPLEMENTED  

 - __metaflac.importTagsFrom(options, fileName, file, callback(err))__  
   `--import-tags-from=file` Import tags from a file. Each line should be of the form NAME=VALUE. Multi-line comments are currently not supported. Specify `noUTF8Convert` option if necessary. 

 - __metaflac.importTagsFromStream(options, fileName, stream, callback(err))__  
   `--import-tags-from=-` Import tags from a _Readable Stream_. Each line should be of the form NAME=VALUE. Multi-line comments are currently not supported. Specify `noUTF8Convert` option if necessary. 

 - __metaflac.exportTagsTo(options, fileName, file, callback(err))__  
   `--export-tags-to=file` Export tags to a file. Each line will be of the form NAME=VALUE. Specify `noUTF8Convert` option if necessary. 

 - __metaflac.exportTagsToStream(options, fileName, stream, callback(err))__  
   `--export-tags-to=-` Export tags to a _Writable Stream_. Each line will be of the form NAME=VALUE. Specify `noUTF8Convert` option if necessary. 

 - __metaflac.importCuesheetFrom(options, fileName, cuesheet, callback(err))__  
   `--import-cuesheet-from=file` Import a cuesheet from a file. A seekpoint will be added for each index point in the cuesheet to the _SEEKTABLE_ unless the `noCuedSeekpoints` option is specified. 

 - __metaflac.importCuesheetFrom(options, fileName, stream, callback(err))__  
   `--import-cuesheet-from=-` Import a cuesheet from a _Readable Stream_. A seekpoint will be added for each index point in the cuesheet to the _SEEKTABLE_ unless the `noCuedSeekpoints` option is specified. 

 - __metaflac.exportCuesheetTo(options, fileName, cuesheet, callback(err))__  
`--export-cuesheet-to=file` Export _CUESHEET_ block to a cuesheet file, suitable for use by CD authoring software.

 - __metaflac.exportCuesheetToStream(options, fileName, stream, callback(err))__  
`--export-cuesheet-to=-` Export _CUESHEET_ block to a _Writable Stream_, suitable for use by CD authoring software.

 - __metaflac.importPictureFrom(options, fileName, picture, callback(err))__  
   `--import-picture-from=FILENAME` Import a picture and store it in a _PICTURE_ metadata block. Read below for more info.

 - __metaflac.importPictureFrom(options, fileName, specifiction, callback(err))__  
   `--import-picture-from=SPECIFICATION` Import a picture and store it in a _PICTURE_ metadata block.  
   The _specification_ is a object with the following properties: `type`, `mimeType`, `description`, `dimensions`, `file`.
   - `type` (optional) is one of:  
     0: Other  
     1: 32x32 pixels 'file icon' (PNG only)  
     2: Other file icon  
     3: Cover (front) (DEFAULT)  
     4: Cover (back)  
     5: Leaflet page  
     6: Media (e.g. label side of CD)  
     7: Lead artist/lead performer/soloist  
     8: Artist/performer  
     9: Conductor  
     10: Band/Orchestra  
     11: Composer  
     12: Lyricist/text writer  
     13: Recording Location  
     14: During recording  
     15: During performance  
     16: Movie/video screen capture  
     17: A bright coloured fish  
     18: Illustration  
     19: Band/artist logotype  
     20: Publisher/Studio   
   - `mimeType` is optional; if left blank, it will be detected from the file. For best compatibility with players, use pictures with MIME type image/jpeg or image/png. The MIME type can also be --> to mean that `file` is actually a URL to an image, though this use is discouraged. 
   - `description` is optional; the default is an empty string.
   - `dimensions` The next part specfies the resolution and color information. If the MIME-TYPE is image/jpeg, image/png, or image/gif, you can usually leave this empty and they can be detected from the file. Otherwise, you must specify the width in pixels, height in pixels, and color depth in bits-per-pixel. If the image has indexed colors you should also specify the number of colors used. When manually specified, it is not checked against the file for accuracy. 
   - `file` is the path to the picture file to be imported, or the URL if MIME type is --> 
 
 - __metaflac.exportPictureTo(options, fileName, picture, callback(err))__  
 `--export-picture-to=file` Export _PICTURE_ block to a file. The first _PICTURE_ block will be exported unless the `blockNumber` option is set to specify the exact metadata block to extract.

 - __metaflac.exportPictureToStream(options, fileName, stream, callback(err))__  
 `--export-picture-to=-` Export _PICTURE_ block to a _Writable Stream_. The first _PICTURE_ block will be exported unless the `blockNumber` option is set to specify the exact metadata block to extract.

 - __metaflac.addReplayGain ...__ NOT IMPLEMENTED  

 - __metaflac.removeReplayGain(options, fileName, callback(err))__  
  `--remove-replay-gain` Removes the ReplayGain tags.

 - __metaflac.addSeekpoint(options, fileName, pattern, callback(err))__  
   `--add-seekpoint={#|X|#x|#s}` Add seek points to a _SEEKTABLE_ block. Using #, a seek point at that sample number is added. Using X, a placeholder point is added at the end of a the table. Using #x, # evenly spaced seek points will be added, the first being at sample 0. Using #s, a seekpoint will be added every # seconds (# does not have to be a whole number; it can be, for example, 9.5, meaning a seekpoint every 9.5 seconds). If no _SEEKTABLE_ block exists, one will be created. If one already exists, points will be added to the existing table, and any duplicates will be turned into placeholder points.

 - __metaflac.addPadding(options, fileName, length, callback(err))__  
   `--add-padding=length` Add a padding block of the given length (in bytes). The overall length of the new block will be 4 + length; the extra 4 bytes is for the metadata block header.

 - __metaflac.list(options, fileName, callback(err, metadataBlocks))__  
   `--list` Get one or more metadata blocks. By default, all metadata blocks are provided as JavaScript objects. Use the following options to change this behavior: `blockType`, `blockNumber`, `exceptBlockType`.

 - __metaflac.vorbisComment(options, fileName, callback(err, comments))__  
   Returns a JavaScript object containing all _VORBIS_COMMENT_ tags.

 - __metaflac.remove(options, fileName, callback(err))__  
   `--remove` Remove one or more metadata blocks. By default, all metadata blocks will be removed. Use the following options to change this behavior: `blockType`, `blockNumber`, `exceptBlockType`. Unless the `dontUsePadding` option is specified, the blocks will be replaced with padding. You may not remove the _STREAMINFO_ block. 

 - __metaflac.removeAll(options, fileName, callback(err))__  
   `--remove-all` Remove all metadata blocks (except the _STREAMINFO_ block) from the metadata. Unless the `dontUsePadding` option is specified, the blocks will be replaced with padding. 

 - __metaflac.mergePadding(options, fileName, callback(err))__  
   `--merge-padding` Merge adjacent _PADDING_ blocks into single blocks. 

 - __metaflac.sortPadding(options, fileName, callback(err))__  
   `--sort-padding` Move all _PADDING_ blocks to the end of the metadata and merge them into a single block.

### Examples

Print all VorbisComment tags

```javascript
metaflac.vorbisComment([], './songAboutButterflies.flac', function (err, comments) {
	if (err) { console.log('we have a problem'); return; }

	for (var name in comments) {
		console.log(name, '=', comments[name]);
	}
});
```



[metaflac]: http://flac.sourceforge.net/documentation_tools_metaflac.html
[man]: http://linux.die.net/man/1/metaflac
