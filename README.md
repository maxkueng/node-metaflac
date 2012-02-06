Metaflac
========

A node.js wrapper for [metaflac][metaflac].

A work in progress.

Example
-------

```javascript
var mb = require('metaflac');

metaflac.showMD5Sum([], './awesome-song.flac', function (err, sum) {
	if (err) { console.log('An error occurred'); return; }

	console.log('The MD5 sum is', sum);
});
```

[metaflac]: http://flac.sourceforge.net/documentation_tools_metaflac.html
