import gulp from 'gulp'
import gulpgm from 'gulp-gm'
import imagemin from 'gulp-imagemin'
import print from 'gulp-print'
import async from 'async'
import fs from 'fs'
import glob from 'glob'
import gm from 'gm'
import path from 'path'
import yaml from 'js-yaml'

const photosDvdOriginalDir = 'dist/DVD/Photos'
const photosDvdThumbDir = 'dist/DVD/Web/img/thumb'
const photosDvdLargeDir = 'dist/DVD/Web/img/large'
const photosManifestPath = 'build/js/1photos-manifest.js'
const photosYamlPath = 'tasks/photos.yaml'

const imagesGlob = '**/*.@(jpg|jpeg|png|gif)'

function photosYaml() {
}

function buildImagesTask(srcDir, destDir, dimensions) {
  return () => {
    return gulp.src(imagesGlob, {
      cwd: srcDir,
      nocase: true
    })
      .pipe(gulpgm( (gmfile) => {
        let d = dimensions
        if (typeof dimensions === 'function') {
          d = dimensions(gmfile.source)
        }
        return gmfile
          .resize(d[0], d[1])
          .autoOrient()
          .noProfile()
      }))
      .pipe(imagemin())
      .pipe(gulp.dest(destDir))
      .pipe(print())
    }
}

function extractSection(file) {
  return file.split('/')[0]
}

function extractCaption(file) {
  let matches = file.match(/.+\/([0-9]+)?\s*(.*?)\s*\..+$/)
  if (matches && matches[2]) {
    return matches[2]
  } else {
    return null
  }
}

function buildManifest(originalDir, largeDir, thumbDir, yamlData, callback) {
  let manifest = {}
  glob(imagesGlob, {
    cwd: originalDir,
    nocase: true
  }, (err, files) => {
    async.eachSeries(files, (file, callback) => {
      let data = Object.assign({
        file: file,
        caption: extractCaption(file)
      }, yamlData[file] || {})
      let section = extractSection(file)
      if (!manifest[section]) {
        manifest[section] = []
      }
      function addImageSize(type, imageDir, callback) {
        let imagePath = path.join(imageDir, file)
        gm(imagePath).size((err, size) => {
          data[type] = {
            width: size.width,
            height: size.height
          }
          callback()
        })
      }
      async.parallel([
        async.apply(addImageSize, 'original', originalDir),
        async.apply(addImageSize, 'large', largeDir),
        async.apply(addImageSize, 'thumb', thumbDir),
      ], () => {
        manifest[section].push(data)
        callback()
      });
    }, () => {
      callback(manifest)
    })
  })
}

function buildPhotosManifest(callback) {
  const photosYaml = yaml.load(fs.readFileSync(photosYamlPath, 'utf8'))
  buildManifest(photosDvdOriginalDir, photosDvdLargeDir,
                   photosDvdThumbDir, photosYaml, (manifest) => {
    const jsText = 'var photosManifest = ' +
      JSON.stringify(manifest, null, 2) +
      ';\n'
    fs.writeFile(photosManifestPath, jsText, callback)
  })
}

export function addPhotosTasks(gulp) {

  gulp.task('photos-dvd-thumb',
    buildImagesTask(photosDvdOriginalDir, photosDvdThumbDir, [175, 175])
  )

  gulp.task('photos-dvd-large',
    buildImagesTask(photosDvdOriginalDir, photosDvdLargeDir, (file) => {
      if (file.search('Picture Boards') >= 0) {
        return [2000, 2000]
      } else if (file.search('20th Anniversary') >= 0) {
        return [1280, 1280]
      } else {
        return [1280, 960]
      }
    })
  )

  gulp.task('photos-dvd', gulp.series(
    'photos-dvd-thumb',
    'photos-dvd-large'
  ))

  gulp.task('photos-manifest', buildPhotosManifest)

}
