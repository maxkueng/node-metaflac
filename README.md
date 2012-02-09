Metaflac
========

This module aims to be a more or less complete wrapper for the
[metaflac][metaflac] command line utility. 

A work in progress.

### Limitations

 - Can only run one operation per execution
 - Can only process one FLAC file per execution


API
---

Load the `metaflac` module

```javascript
var mb = require('metaflac');
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

 - __metaflac.importPictureFrom(options, fileName, picture, callback(err))__  
   `--import-picture-from=FILENAME` Import a picture and store it in a _PICTURE_ metadata block. Read below for more info.

 - __metaflac.importPictureFrom(options, fileName, specifiction, callback(err))__  
   `--import-picture-from=SPECIFICATION` Import a picture and store it in a _PICTURE_ metadata block.  
   The _specification_ is a object with the following properties: `type`, `mimeType`, `description`, `dimensions`, `file`.
   - `type` (optional) is one of:
     0. Other
	 1. 32x32 pixels 'file icon' (PNG only)
	 2. Other file icon
	 3. Cover (front) (DEFAULT)
	 4. Cover (back)
     5. Leaflet page
     6. Media (e.g. label side of CD)
     7. Lead artist/lead performer/soloist
     8. Artist/performer
     9. Conductor
     10. Band/Orchestra
     11. Composer
     12. Lyricist/text writer
     13. Recording Location
     14. During recording
     15. During performance
     16. Movie/video screen capture
     17. A bright coloured fish
     18. Illustration
     19. Band/artist logotype
     20. Publisher/Studio 
   - `mimeType` is optional; if left blank, it will be detected from the file. For best compatibility with players, use pictures with MIME type image/jpeg or image/png. The MIME type can also be --> to mean that FILE is actually a URL to an image, though this use is discouraged. 
 


[metaflac]: http://flac.sourceforge.net/documentation_tools_metaflac.html
