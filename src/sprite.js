export default class Sprite {
  constructor(bytes) {
    // 16 bytes
    const channelA  = []
    const channelB  = []
    const composite = []

    bytes.forEach((byte, i) => {
      const bitsArray = (byte).toString(2).padEnd(8, '0').split('').map((bitAsString) => {
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

// def self.read_from_chr(file_path)
//     file = File.read(file_path)
//
//     file.bytes.each_slice(16).map do |slice| # 16 bytes per tile
//
//       bits = slice.map do |byte|
//         ('%08b' % byte).split('')
//       end
//
//       tile = []
//
//       8.times do |i|
//         channel_a = bits[i]
//         channel_b = bits[i + 8]
//         tile[i] = 8.times.map {|i| channel_a[i].to_i + (channel_b[i].to_i * 2)}
//       end
//
//       tile
//     end
