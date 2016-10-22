import gulp from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import babel from 'gulp-babel'
import child_process from 'child_process'
import concat from 'gulp-concat-util'
import debug from 'gulp-debug'
import filter from 'gulp-filter'
import fs from 'fs'
import gutil from 'gulp-util'
import merge from 'merge-stream'
import rewriteCSS from 'gulp-rewrite-css'
import sass from 'gulp-sass'
import shell from 'shelljs'
import through from 'through2'
import yaml from 'js-yaml'

import { addAudioTasks } from './tasks/audio'
import { addPhotosTasks } from './tasks/photos'

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
}

const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}

function logError(error) {
  console.error('' + error)
  this.emit('end')
}

addAudioTasks(gulp)
addPhotosTasks(gulp)

gulp.task('vendor', () => {
  const vendorYaml = yaml.load(fs.readFileSync('tasks/vendor.yaml', 'utf8'))
  return merge([
    gulp.src(vendorYaml.css)
      .pipe(rewriteCSS({ destination: 'dist/css' }))
      .pipe(concat('css/0vendor.css'))
      .pipe(gulp.dest('build')),
    gulp.src(vendorYaml.js)
      .pipe(concat('js/0vendor.js'))
      .pipe(gulp.dest('build'))
  ])
})

gulp.task('src-css', () => {
  return gulp.src('src/css/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('build/css'));
})

gulp.task('src-js', () => {
  return gulp.src('src/js/*.js')
    .pipe(babel()).on('error', logError)
    .pipe(gulp.dest('build/js'))
})

gulp.task('css', () => {
  return gulp.src('build/css/*.css')
    .pipe(concat('css/combined.css'))
    .pipe(gulp.dest('dist'))
})

gulp.task('js', () => {
  return gulp.src('build/js/*.js')
    .pipe(concat('js/combined.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('root-js', () => {
  return gulp.src('src/*.js')
    .pipe(babel()).on('error', logError)
    .pipe(gulp.dest('dist'))
})

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('compile', gulp.series(
  'vendor',
  'src-css',
  'css',
  'src-js',
  'js',
  'root-js',
  'html'
))

gulp.task('media', gulp.series(
  'photos-dvd'
))

gulp.task('manifest', gulp.series(
  'audio-manifest',
  'photos-manifest'
))

gulp.task('watch', () => {
  gulp.watch('gulp/vendor.yaml', gulp.series('vendor', 'js'))
  gulp.watch('src/css/*.scss', gulp.series('src-css'))
  gulp.watch('build/css/*.css', gulp.series('css'))
  gulp.watch('src/js/*.js', gulp.series('src-js'))
  gulp.watch('build/js/*.js', gulp.series('js'))
  gulp.watch('src/*.js', gulp.series('root-js'))
  gulp.watch('src/*.html', gulp.series('html'))
})

gulp.task('default', gulp.series('compile', 'watch'))

/*
 * Shell tasks
 */


function system(cmd, args) {
  let log = `exec: ${cmd}`;
  if (args) {
    log += ' ' + args.join(' ')
  }
  console.log(log)
  if (args) {
    child_process.execFileSync(cmd, args, {stdio: 'inherit'})
  } else {
    child_process.execSync(cmd, {stdio: 'inherit'})
  }
}

function deployDest(type) {
  try {
    let m = require('./deploy')
    return m[type + 'Dest']
  } catch (e) {
    throw "deploy.js not defined"
  }
}

function rsyncOptions() {
  let options = ['--itemize-changes', '--exclude=.DS_Store']
  if (process.argv.indexOf('-n') >= 0 ||
      process.argv.indexOf('--dry-run') >= 0) {
    options.push('--dry-run')
  }
  return options
}

gulp.task('deploy-server', (callback) => {
  system('rsync', rsyncOptions().concat([
    '-avz', '--rsh=ssh', '--delete',
    'dist/', deployDest('server')
  ]))
  callback()
})

gulp.task('deploy-backup', (callback) => {
  system('rsync', rsyncOptions().concat([
    '-rvz', '--delete',
    '--no-links', '--times', '--modify-window=1',
    'dist/', deployDest('backup')
  ]))
  callback()
})

gulp.task('clean-junk', (callback) => {
  system('find . -name .DS_Store -print -exec rm -f {} \\;')
  callback()
})
