/**
 * @jest-environment node
 */

const { readCSVData, transformData } = require('../../src/utils/etl-csv')

/**
 *
 */
describe('Import CSV data', function () {
  it('should read data from the CSV file', async () => {
    const data = await readCSVData()
    expect(data).toBeDefined()
    expect(Array.isArray(data)).toBeTruthy()
    expect(data.length).toBeGreaterThan(0)
  })

  it('should transform raw data before the import', async () => {
    let rawData = [
      {
        state: 'ABRUZZO',
        town: 'AVEZZANO',
        postalcode: '67051',
        county: 'AQ',
        name: 'OSPEDALE CIVILE',
        street: 'Tre Conche',
        email: '',
        domain_identifier: '',
        latitude: '',
        longitude: '',
      },
    ]
    let transformedData = await transformData(rawData)
    expect(transformedData).toBeDefined()
    expect(Array.isArray(transformedData)).toBeTruthy()
    expect(transformedData[0].name).toStrictEqual('Ospedale Civile')
    expect(transformedData[0].address.state).toStrictEqual('Abruzzo')
    expect(transformedData[0].address.town).toStrictEqual('Avezzano')
    expect(transformedData[0].address.country).toStrictEqual('IT')
    expect(transformedData[0].latitude).toStrictEqual('42.0508987')
    expect(transformedData[0].longitude).toStrictEqual('13.4187642')

    // broaden search
    rawData = [
      {
        state: 'ABRUZZO',
        town: 'AVEZZANO',
        postalcode: '66020',
        county: 'CH',
        name: 'OSPEDALE CIVILE',
        street: 'Via Ianico 1',
        email: '',
        domain_identifier: '',
        latitude: '',
        longitude: '',
      },
    ]
    transformedData = await transformData(rawData)
    expect(transformedData).toBeDefined()
    expect(Array.isArray(transformedData)).toBeTruthy()
    expect(transformedData[0].latitude).toStrictEqual('42.0347963')
    expect(transformedData[0].longitude).toStrictEqual('13.4265048')
  })
})
