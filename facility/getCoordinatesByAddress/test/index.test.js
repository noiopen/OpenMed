/**
 * @jest-environment node
 */

const getCoordinatesByAddress = require('./../src/index')

describe('getCoordinatesByAddress integration tests', function () {
  it('should return the param errors', async () => {
    let params = { address: '' }
    await expect(getCoordinatesByAddress.main(params)).rejects.toThrow(
      'The input params are invalid: address unavailable'
    )

    params = null
    await expect(getCoordinatesByAddress.main(params)).rejects.toThrow(
      'The input params are undefined'
    )
  })

  it('should return a pair of coordinates, along with the full resolved address', async () => {
    const params = {
      address: 'via Paolo Fabbri 43, Bologna',
    }
    const response = await getCoordinatesByAddress.main(params)
    expect(response.status).toStrictEqual('OK')
    expect(response.payload.lat).toStrictEqual('44.4949473')
    expect(response.payload.lon).toStrictEqual('11.3630593')
    expect(response.payload.address).toStrictEqual(
      '43, Via Paolo Fabbri, Cirenaica, San Donato-San Vitale, Bologna, Emilia-Romagna, 40138, Italia'
    )
  })
})
