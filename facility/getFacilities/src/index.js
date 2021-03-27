const Cloudant = require('./cloudant')

async function getFacilities() {
  const facilitiesDb = Cloudant.cloudant.db.use('facility')

  const data = await facilitiesDb.list({ include_docs: true })

  const facilities = data.rows.reduce((accumulator, row) => {
    accumulator.push(row.doc)
    return accumulator
  }, [])

  return {
    facilities: facilities,
  }
}

// webpack
global.main = getFacilities

// jest
exports.main = getFacilities
