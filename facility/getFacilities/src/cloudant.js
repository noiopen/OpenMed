const dotenv = require('dotenv')
const Cloudant = require('@cloudant/cloudant')

dotenv.config()

const url = process.env.CLOUDANT_URL
const apiKey = process.env.CLOUDANT_API_KEY

const cloudant = new Cloudant({
  url: url,
  plugins: { iamauth: { iamApiKey: apiKey } }
})

exports.cloudant = cloudant
