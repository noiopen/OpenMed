const geolib = require('geolib')

// set the facility database
const Cloudant = require('./cloudant')
const facilityDB = Cloudant.cloudant.db.use(process.env.CLOUDANT_DATABASE)

/**
 * GET /v1/facilities
 * @returns
 */
async function getAllFacilities() {
  const data = await facilityDB.list({ include_docs: true })
  return data.rows.map((row) => row.doc)
}

/**
 * GET /v1/facilities?id=
 * @returns
 */
async function getFacilityById(facilityId) {
  if (facilityId.match(/^[0-9a-fA-F]{32}$/)) {
    const data = await facilityDB.find({ selector: { _id: facilityId } }, { include_docs: true })
    const facility = data.docs
    return { facility, total_rows: 1 }
  } else {
    throw Error(`The param value ${facilityId} is not a valid id value`)
  }
}

/**
 * Finds the single one nearest point to a reference coordinate.
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} facilities
 */
function findNearest(latitude, longitude, facilities) {
  return geolib.findNearest({ latitude, longitude }, facilities)
}

/**
 * Sorts an array of coords by distance to a reference coordinate
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} facilities
 */
function orderByDistance(latitude, longitude, facilities) {
  return geolib.orderByDistance({ latitude, longitude }, facilities)
}

/**
 *
 * @param {*} latitude
 * @param {*} longitude
 * @returns
 */
async function getNearestFacilities(latitude, longitude) {
  if (!longitude || !latitude) {
    throw Error('The input params are invalid: longitude or latitude unavailable')
  }

  // get facilities
  const facilities = await getAllFacilities()

  // get nearest facilities
  const nearestFacility = findNearest(latitude, longitude, facilities)

  // return closest facility
  return {
    payload: nearestFacility,
  }
}

/**
 *
 * GET /v1/facilities?address="strada delle strade, 45 30920 Moncalieri TO"
 *
 * @param {*} params
 * @returns
 */
async function getFacilities(params) {
  let facilities = null
  if (params && params.id) {
    // get facility
    facilities = await getFacilityById(params.id)
  } else if (params && params.latitude && params.longitude) {
    // get nearest facilities
    facilities = await getNearestFacilities(params.latitude, params.longitude)
  } else {
    // get all the facilities
    facilities = await getAllFacilities()
  }

  return {
    rows: facilities,
    totalRows: facilities.total_rows,
  }
}

// webpack
global.main = getFacilities

// jest
exports.main = getFacilities
exports.findNearest = findNearest
exports.orderByDistance = orderByDistance
