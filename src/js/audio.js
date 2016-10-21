function audioManifestSectionForTemplate(section) {
  let result = []
  audioManifest[section]._categories.forEach((category) => {
    result.push({
      category: category,
      audio: audioManifest[section][category]
    })
  })
  return result
}
