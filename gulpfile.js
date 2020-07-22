const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

function defaultTask(cb) {
  const outDir = '/mnt/c/Program Files (x86)/Steam/steamapps/common/wallpaper_engine/projects/myprojects/reddit_wallpaper';
  src('public/*')
    .pipe(dest(outDir));
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(dest(outDir));

  cb();
}

exports.default = defaultTask;