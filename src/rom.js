import crc32FromArrayBuffer from './crc32';
import Header from './header'
import Sprite from './sprite'

export default class Rom {
  constructor(bytes) {
    // Every .nes file has a 16 byte header. The first 4 characters are NES\0x01a.
    // Offsets 4 and 5 specify the number of PRG and CHR banks, respectively.
    const header = new Header(bytes.slice(0, 16))

    const {prgRomBanks, chrRomBanks} = header

    const romBytes    = bytes.slice(16)

    const _8K  =  8_192
    const _16K = 16_384

    // Program data. All ROMs must contain at least one bank of PRG data.
    // This is the executable code that is stored for games/ demos.
    // Each bank is exactly 16K (16384 bytes)
    const prgBytes = romBytes.slice(0, _16K * header.prgRomBanks)

    // Character data. Here be sprites. CHR data is just a block of sprites.
    // Each CHR bank can contain up to 512 sprites.
    // Since CHR banks are 8K each (8192 bytes), you can understand that each sprite is stored in 16 bytes,
    // which brings us to our next topic. A ROM may not have any CHR banks (ie Zelda, Contra), ROMs such as these have the sprites stored in the PRG banks.
    // I haven't yet looked into extraction from there.
    if (chrRomBanks) {
      const chrBytes = romBytes.slice(prgBytes.length, (_8K * chrRomBanks) + prgBytes.length)
      const spriteData = []

      for (let i = 0; i < chrRomBanks; i++) {
        const chrBytesPerBank = chrBytes.slice(_8K * i, _8K * (i + 1))

        const sprites = []

        for (let i = 0; i < 512; i++) {
          sprites.push(new Sprite(chrBytesPerBank.slice(16 * i, 16 * (i + 1))))
        }

        spriteData.push(sprites)
      }

      this.spriteData = spriteData
      debugger
    }



    this.crc32  = crc32FromArrayBuffer(romBytes).toString(16)
    this.header = header

  }
}
