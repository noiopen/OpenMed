/**
 * TODO -> update geoserver using Nominatim API directly
 */

// const axios  = require('axios')

// //
// const geoServer = axios.create({
//   baseURL: 'https://nominatim.openstreetmap.org',
// })

// /**
//  *
//  * @param {*} params
//  */
// geoServer.search = async (params) => {
//   // TODO manage params

//   return await geoServer
//     .get(`/search?q=${encodeURIComponent(params)}&format=json`)
//     .then((res) => Promise.resolve(res.data))
// }

const Nominatim = require('nominatim-geocoder')
const geoServer = new Nominatim()

exports.geoServer = geoServer
