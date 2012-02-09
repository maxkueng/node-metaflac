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

The valid block types are: _STREAMINFO_, _PADDING_, _APPLICATION_, _SEEKTABLE_, _VORBIS_COMMENT_. You may narrow down the types of _APPLICATION_ blocks displayed as follows:

`APPLICATION:abcd` The _APPLICATION_ block(s) whose textual representation of the 4-byte ID is "abcd"  
`APPLICATION:0xXXXXXXXX` The _APPLICATION_ block(s) whose hexadecimal big-endian representation of the 4-byte ID is "0xXXXXXXXX". For the example "abcd" above the hexadecimal equivalalent is 0x61626364 

### Functions

The `options` argument is an array containing none or more of the above _options_. 

 - __metaflac.showMD5sum(options, fileName, function(err, md5sum))__
   `--show-md5sum` Show the MD5 signature from the STREAMINFO block. 

 - __metaflac.showMinBlocksize(options, fileName, function(err, size))__  
  `--show-min-blocksize` Show the minimum block size from the STREAMINFO block. 


--show-max-blocksize
    Show the maximum block size from the STREAMINFO block. 
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
