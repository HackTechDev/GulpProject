1/

util01@station02:~$ npm install -g gulp-cli
util01@station02:~$ gulp --version
CLI version: 2.2.0
Local version: 4.0.2


2/ 

util01@station02:~$ cd HACKTECH.DEV/
util01@station02:~/HACKTECH.DEV$ mkdir hacktech.devmkdir

util01@station02:~/HACKTECH.DEV$ cd hacktech.dev/
util01@station02:~/HACKTECH.DEV/hacktech.dev$ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ mkdir htdocs
util01@station02:~/HACKTECH.DEV/hacktech.dev$ mkdir src


3/ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ npm init


4/ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ npm install gulp --save-dev


5/ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ npm i --save-dev gulp-rename


6/ 

Créer : 

gulpfile.js

Ajouter : 

const { src, dest } = require('gulp');
const rename = require('gulp-rename');


function renameFiles() {

    return src('src/*.htm')
        .pipe(rename({ extname: '.html' }))
        .pipe(dest('htdocs/'));
}

exports.rename = renameFiles;


7/ 

Créer :

src/index.htm

Ajouter :

<html>
<head>
</head>
<body>
HackTechDev
</body>
</html>


8/ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ gulp rename
[19:21:04] Using gulpfile ~/HACKTECH.DEV/hacktech.dev/gulpfile.js
[19:21:04] Starting 'rename'...
[19:21:04] Finished 'rename' after 45 ms
util01@station02:~/HACKTECH.DEV/hacktech.dev$ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ ls -l htdocs/
total 8
-rw-rw-r-- 1 util01 util01 57 mai   12 19:20 index.html
util01@station02:~/HACKTECH.DEV/hacktech.dev$ 


9/ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ npm i --save-dev gulp-minify

util01@station02:~/HACKTECH.DEV/hacktech.dev$ npm i --save-dev del


10/ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ mkdir -p src/js


Créer : 

src/js/main.js

Ajouter : 

function hello() {

    return 'Hello there!';
}

hello();


11/ 

Ouvrir : 

gulpfile.js

Supprimer tout

Ajouter :

const { src, dest, series } = require('gulp');
const minify = require("gulp-minify");
const rename = require('gulp-rename');
const del = require('del');


const cleanDist = () => del([ 'dist' ]);


function renameFile() {

    return src('src/*.htm')
        .pipe(rename({ extname: '.html' }))
        .pipe(dest('htdocs/'));
}

function minifyScript() {

    return src('src/js/main.js', { allowEmpty: true }) 
        .pipe(minify({noSource: true}))
        .pipe(dest('htdocs/js'))
}


const build = series(cleanDist, renameFile, minifyScript);

exports.rename = renameFile;
exports.script = minifyScript;
exports.clean = cleanDist;
exports.build = build;

exports.default = build;


12/ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ gulp build
[19:46:59] Using gulpfile ~/HACKTECH.DEV/hacktech.dev/gulpfile.js
[19:46:59] Starting 'build'...
[19:46:59] Starting 'cleanDist'...
[19:46:59] Finished 'cleanDist' after 19 ms
[19:46:59] Starting 'renameFile'...
[19:46:59] Finished 'renameFile' after 26 ms
[19:46:59] Starting 'minifyScript'...
[19:46:59] Finished 'minifyScript' after 27 ms
[19:46:59] Finished 'build' after 75 ms
util01@station02:~/HACKTECH.DEV/hacktech.dev$ 



13/ 

util01@station02:~/HACKTECH.DEV/hacktech.dev$ npm i -D git+https://git@github.com/webksde/gulp-sftp

https://github.com/gtg092x/gulp-sftp/issues/78#issuecomment-448987310

14/

Ouvrir :

gulpfile.js

Supprimer tout

Ajouter :

const { src, dest, series } = require('gulp');
const minify = require("gulp-minify");
const rename = require('gulp-rename');
const del = require('del');
const sftp = require('gulp-sftp');

const cleanDist = () => del([ 'dist' ]);


function renameFile() {

    return src('src/*.htm')
        .pipe(rename({ extname: '.html' }))
        .pipe(dest('htdocs/'));
}

function minifyScript() {

    return src('src/js/main.js', { allowEmpty: true }) 
        .pipe(minify({noSource: true}))
        .pipe(dest('htdocs/js'))
}


function uploadSFTP() {
    return src('htdocs/*')
        .pipe(sftp({
            host: 'sftp.sd3.gpaas.net',
            remotePath: '/lamp0/web/vhosts/hacktech.dev/htdocs/',
            user: '3579438',
            pass: '$LAYER666@ngel'
        }));
}

const build = series(cleanDist, renameFile, minifyScript, uploadSFTP);

exports.rename = renameFile;
exports.script = minifyScript;
exports.clean = cleanDist;
exports.sftp = uploadSFTP
exports.build = build;

exports.default = build;


14/

util01@station02:~/HACKTECH.DEV/hacktech.dev$ gulp build
[20:11:11] Using gulpfile ~/HACKTECH.DEV/hacktech.dev/gulpfile.js
[20:11:11] Starting 'build'...
[20:11:11] Starting 'cleanDist'...
[20:11:11] Finished 'cleanDist' after 12 ms
[20:11:11] Starting 'renameFile'...
[20:11:11] Finished 'renameFile' after 26 ms
[20:11:11] Starting 'minifyScript'...
[20:11:11] Finished 'minifyScript' after 28 ms
[20:11:11] Starting 'uploadSFTP'...
[20:11:11] Authenticating with password.
[20:11:16] gulp-sftp: Uploaded: index.html => /lamp0/web/vhosts/hacktech.dev/htdocs/index.html
[20:11:16] gulp-sftp: Uploaded: index.php => /lamp0/web/vhosts/hacktech.dev/htdocs/index.php
[20:11:16] gulp-sftp: 2 files uploaded successfully
[20:11:16] SFTP :: SFTP session closed
[20:11:16] Finished 'uploadSFTP' after 5.6 s
[20:11:16] Finished 'build' after 5.67 s
[20:11:16] Connection :: end
[20:11:16] Connection :: closed
util01@station02:~/HACKTECH.DEV/hacktech.dev$ 



