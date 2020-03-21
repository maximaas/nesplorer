export default class Sprite {
  constructor(bytes) {
    // 16 bytes
    const channelA  = []
    const channelB  = []
    const composite = []

    bytes.forEach((byte, i) => {
      const bitsArray = (byte).toString(2).padStart(8, '0').split('').map((bitAsString) => {
        return parseInt(bitAsString)
      }) // 34 -> '100010' -> [1,0,0,0,1,0]

      if (i < 8) {
        channelA.push(bitsArray)
      } else {
        channelB.push(bitsArray)
      }
    })

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const a = channelA[x][y]
        const b = channelB[x][y]

        composite.push(a + (2 * b))
      }
    }

    this.pixels = composite
  }
}
