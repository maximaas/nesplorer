export default class Header {
  constructor(bytes) {
    if (
         bytes[0] === 78 // N
      && bytes[1] === 69 // E
      && bytes[2] === 83 // S
      && bytes[3] === 0x01a
    ) {
      this.format         = this.detectFormat(bytes)

      this.prgRomBanks    = bytes[4]
      this.chrRomBanks    = bytes[5]
      this.mirroring      = (bytes[6] & 1) ? 'Vertical' : 'Horizontal'
      this.battery        = !!(bytes[6] & 2)
      this.trainer        = !!(bytes[6] & 4)
      this.fourScreenVram = !!(bytes[6] & 8)
      this.mapper         = ((bytes[6] & 0xF0) >> 4) + (bytes[7] & 0xF0)
      this.vsUnisystem    = !!(bytes[7] & 1)
      this.playChoice10   = !!(bytes[7] & 2)
      this.prgRamBanks    = bytes[8]
      this.tvColorSystem  = (bytes[9] & 1) ? 'PAL' : 'NTSC'
    } else {
      throw new Error('NES Header not found.')
    }
  }

  detectFormat(bytes) {
    if ((bytes[7] & 0b1100) >> 2 === 2) {
      return 'NES 2.0';
    } else if (bytes.slice(12, 16).reduce((x, y) => x + y) === 0) {
      return 'Standard iNES';
    } else {
      return 'Archaic iNES';
    }
  }

}
