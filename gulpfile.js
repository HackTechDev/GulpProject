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
            remotePath: '/lamp0/web/vhosts/********/htdocs/',
            user: '**********',
            pass: '**********'
        }));
}

const build = series(cleanDist, renameFile, minifyScript, uploadSFTP);

exports.rename = renameFile;
exports.script = minifyScript;
exports.clean = cleanDist;
exports.sftp = uploadSFTP
exports.build = build;

exports.default = build;


