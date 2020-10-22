async function getFacilities (params) {
  const Cloudant = require('./cloudant')

  const facilitiesDb = Cloudant.cloudant.db.use('facility')

  const data = await facilitiesDb.list({ include_docs: true })

  const facilities = data.rows.reduce((accumulator, row) => {
    accumulator.push(row.doc)
    return accumulator
  }, [])

  return {
    facilities: facilities
  }
}

exports.main = getFacilities
