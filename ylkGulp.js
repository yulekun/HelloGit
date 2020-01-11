var gulp = require("gulp");
var gLog = require("gulp-util");
var combined = require("stream-combiner2");
var uglify = require(`gulp-uglify`);
var concat = require(`gulp-concat`);
var exec = require("child_process").exec;

gulp.task(`log1`, async function () {
    gLog.log(gLog.colors.blue("--------->编译脚本"));
    var comb = combined.obj([
        gulp.src("./text*.js"),
        uglify(),
        concat("ylkconcat.js"),
        gulp.dest("./test1")]);
    comb.on("error", handleError);
});



gulp.task('add', async function () {
    exec('cd ./test1', function (erro, stdout, stderr) { });
    exec('git add .', function (erro, stdout, stderr) { });

});


gulp.task('commit', async function () {
    exec('git commit -m "gulp 自动上传"', function (erro, stdout, stderr) { });

});

gulp.task('push', async function () {
    exec('git push', function (erro, stdout, stderr) { });
});

gulp.task(`log2`, gulp.series("add", "commit", "push"), async function () {
    gLog.log(gLog.colors.red("=============上传github"));
});

var handleError = function (err) {
    gLog.log('\neeeeeeeeeeeeeee')
    gLog.log(gLog.colors.blue('Error!'));
    gLog.log(gLog.colors.red('fileName: ' + err.fileName));
    gLog.log(gLog.colors.blue('lineNumber: ' + err.lineNumber));
    gLog.log(gLog.colors.red('message: ' + err.message));
    gLog.log(gLog.colors.blue('plugin: ' + err.plugin));
}

gulp.task(`default`, gulp.series("log1", "log2"));