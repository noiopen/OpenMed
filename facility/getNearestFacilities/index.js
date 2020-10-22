const composer = require('openwhisk-composer')

module.exports = composer.sequence(
  composer.merge('facility/getFacilities'),
  'facility/getNearestFacilitiesFromList'
)
