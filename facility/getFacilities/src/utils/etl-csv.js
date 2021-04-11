const neatCsv = require('neat-csv')
const fs = require('fs-extra')
const path = require('path')
const { geoServer } = require('./../geoServer')

const { cloudant } = require('../cloudant')

/**
 *
 */
// async function createDatabase() {
//   await cloudant.db.create(process.env.CLOUDANT_DATABASE)
// }

/**
 *
 * @param {*} rawData
 * @returns
 */
// async function checkAndCleanRawData(rawData) {
//   return rawData
// }

/**
 *
 * @param {*} data
 */
async function insertDataOnDatabase(data) {
  const db = cloudant.db.use(process.env.CLOUDANT_DATABASE)
  db.bulk({ docs: data }, function (err) {
    if (err) {
      throw err
    }

    console.log('All documents inserted')
  })
}

/**
 *
 * @param {string} rawName
 * @returns
 */
function trasformFacilityName(rawName) {
  return rawName
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Transform data provided from CSV to be compliance to the openmed-app
 * @param {*} rawData
 */
async function transformData(rawData) {
  // coordinates from address
  const transformedData = await Promise.all(
    rawData.map(async (raw) => {

      const state = trasformFacilityName(raw.state)
      const town = trasformFacilityName(raw.town)
      const postalcode = raw.postalcode
      const county = trasformFacilityName(raw.county)
      const name = trasformFacilityName(raw.name)
      const street = raw.street
      const email = raw.email
      const domainIdentifier = raw.domainIdentifier
      let latitude = raw.latitude
      let longitude = raw.longitude

      const country =  !raw.country ? 'IT' : raw.country 
      const addressToSearch = `${street}, ${postalcode}, ${town}, ${country}`

      const results = await geoServer.search({ q: addressToSearch })

      if (results && results[0]) {
        latitude = results[0].lat
        longitude = results[0].lon
      } else {
        // trying to broaden the search

        const broadenAddressToSearch = `${town}, ${county}, ${country}`

        console.info(
          `Unable to find geo data for the following address: ${JSON.stringify(
            addressToSearch
          )}, so trying to broaden the search: ${JSON.stringify(broadenAddressToSearch)}`
        )

        const broadenResults = await geoServer.search({ q: broadenAddressToSearch })
        if (broadenResults && broadenResults[0]) {
          latitude = broadenResults[0].lat
          longitude = broadenResults[0].lon
        } else {
          console.error(
            `Unable to find geo data for the following address: ${JSON.stringify(
              broadenAddressToSearch
            )} `
          )
        }
      }

      const newObject = {
        name,
        email,
        address: {
          street,
          town,
          state,
          county,
          postalcode,
          country
        },
        domainIdentifier,
        latitude,
        longitude,
      }
      return newObject
    })
  )
  return transformedData
}

/**
 * Read CSV file and return an array of objects (an object for each raw in the CSV file)
 */
async function readCSVData() {
  return new Promise(function (resolve, reject) {
    fs.readFile(
      path.join(__dirname, '../../../models', `/${process.env.IMPORT_CSV_FILENAME}`),
      async (err, data) => {
        if (err) {
          console.error(err)
          reject(err)
        }

        const rawData = await neatCsv(data)
        resolve(rawData)
      }
    )
  })
}

/**
 *
 * @param {*} filename
 */
async function importDataFromCSV() {
  // check if file exists
  const filename = process.env.IMPORT_CSV_FILENAME
  const csvPath = path.join(__dirname, '../../../models', filename)
  if (!fs.pathExists(csvPath)) {
    throw new Error(
      `The file ${csvPath} doesn't exist: check the file name and the right file directory (the file must be in "models" directory)`
    )
  }

  // read CSV
  const rawData = await readCSVData()

  // transform raw data
  const tranformedData = await transformData(rawData)

  // insert row data
  insertDataOnDatabase(tranformedData)
}

exports.readCSVData = readCSVData
exports.transformData = transformData
exports.importDataFromCSV = importDataFromCSV
