const dotenv = require('dotenv')
const Cloudant = require('@cloudant/cloudant')

dotenv.config()

const url = process.env.cloudant_url
const apiKey = process.env.cloudant_api_key

const cloudant = new Cloudant({
  url: url,
  plugins: { iamauth: { iamApiKey: apiKey } }
})

exports.cloudant = cloudant
