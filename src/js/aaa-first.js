let webUrl = 'https://www.abhayagiri.org/20/'
let _sections = {}
if (typeof _version === 'undefined') {
  _version = 0 // Web
}

function addSection(id, el)
{
  if (typeof el === 'function') {
    el = el()
  } else if (typeof el === 'string') {
    el = $(el)
  }
  _sections[id] = el
}

function dvdPrefix(requiredVersion)
{
  if (requiredVersion == 2 && _version == 1) {
    return webUrl + 'DVD/'
  } else if (_version == 0) {
    return 'DVD/'
  } else {
    return ''
  }
}

function basePrefix()
{
  if (_version > 0) {
    return webUrl
  } else {
    return ''
  }
}
