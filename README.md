Metaflac
========

A node.js wrapper for [metaflac][metaflac].

This project aims to be a more or less complete wrapper for the
`metaflac` command line utility. 

A work in progress.


Functions
---------

Load the `metaflac` module

```javascript
var mb = require('metaflac');
```

### Options

 - `preserveModtime` Preserve the original modification time in spite of edits. 
 - `withFilename` Prefix each output line with the FLAC file name (the default if more than one FLAC file is specified). 
 - `noFilename` Do not prefix each output line with the FLAC file name (the default if only one FLAC file is specified). 
 - `noUTF8Convert` Do not convert tags from UTF-8 to local charset, or vice versa. This is useful for scripts, and setting tags in situations where the locale is wrong. 
 - `dontUsepadding` By default metaflac tries to use padding where possible to avoid rewriting the entire file if the metadata size changes. Use this option to tell metaflac to not take advantage of padding this way.

### Show MD5 Sum

`--show-md5sum` Show the MD5 signature from the STREAMINFO block. 

```javascript
metaflac.showMD5Sum([], './beautiful-song.flac', function (err, sum) {
	if (err) { console.log('An error occurred'); return; }
	console.log('The MD5 sum is', sum);
});
```

### Show Blocksize

`--show-min-blocksize` Show the minimum block size from the STREAMINFO block. 

```javascript
metaflac.showMinBlocksize([], './beautiful-song.flac', function (err, blocksize) {
	if (err) { console.log('An error occurred'); return; }
	console.log('The minimum blocksize is', blocksize);
});
```

`--show-max-blocksize` Show the maximum block size from the STREAMINFO block. 

```javascript
metaflac.showMaxBlocksize([], './beautiful-song.flac', function (err, blocksize) {
	if (err) { console.log('An error occurred'); return; }
	console.log('The maximum blocksize is', blocksize);
});
```



--show-min-framesize
    Show the minimum frame size from the STREAMINFO block. 
--show-max-framesize
    Show the maximum frame size from the STREAMINFO block. 
--show-sample-rate
    Show the sample rate from the STREAMINFO block. 
--show-channels
    Show the number of channels from the STREAMINFO block. 
--show-bps
    Show the # of bits per sample from the STREAMINFO block. 
--show-total-samples
    Show the total # of samples from the STREAMINFO block. 
--show-vendor-tag
    Show the vendor string from the VORBIS_COMMENT block. 
--show-tag=name
    Show all tags where the the field name matches 'name'.

[metaflac]: http://flac.sourceforge.net/documentation_tools_metaflac.html
