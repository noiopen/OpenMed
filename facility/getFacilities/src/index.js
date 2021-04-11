const Cloudant = require('./cloudant')

// set the facility database
const facilityDB = Cloudant.cloudant.db.use('facility')

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
 *
 * GET /v1/facilities?latitude=45.0043354&longitude=654.65464
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
