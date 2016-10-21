import csvParser from 'csv-parse/lib/sync'
import fs from 'fs'

const audioCsvManifestPath = 'tasks/audio-manifest.csv'
const audioJsManifestPath = 'build/js/1audio-manifest.js'

function convertManifest(callback) {
  let csvData = fs.readFileSync(audioCsvManifestPath, 'utf8');
  let records = csvParser(csvData, { columns: true })
  let manifest = {}
  records.forEach((record) => {
    const section = record.section
    const category = record.category
    if (!manifest[section]) {
      manifest[section] = { _categories: [] }
    }
    if (!manifest[section][category]) {
      manifest[section][category] = []
      manifest[section]._categories.push(category)
    }
    manifest[section][category].push(record)
  })
  callback(manifest)
}

function buildAudioManifest(callback) {
  convertManifest((manifest) => {
    fs.writeFile(audioJsManifestPath,
      'var audioManifest = ' +
        JSON.stringify(manifest, null, 2) +
      ';\n', callback
    )
  })
}

export function addAudioTasks(gulp) {
  gulp.task('audio-manifest', buildAudioManifest)
}
