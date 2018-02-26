# gulp-web

## Build Setup

``` bash
npm install

打开node_modules\gulp-rev\index.js
第134行 manifest[originalFile] = revisionedFile;
更新为: manifest[originalFile] = originalFile + '?v=' + file.revHash;

打开node_modules\rev-path\index.js
10行 return filename + '-' + hash + ext;
更新为: return filename + ext;

打开node_modules\gulp-rev-collector\index.js
40行 let cleanReplacement =  path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ); 
更新为: let cleanReplacement =  path.basename(json[key]).split('?')[0];

打开node_modules\gulp-rev-collector\index.js
第139行 regexp: new RegExp( dirRule.dirRX + pattern, 'g' ),
更新为: regexp: new RegExp( dirRule.dirRX + pattern+'(\\?v=\\w{10})?', 'g' ),

gulp-clean
gulp-default
gulp-rev
gulp-watch
```

For any questions, please leave a email to 944831575@qq.com Thank you :smile: