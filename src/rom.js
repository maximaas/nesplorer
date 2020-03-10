import crc32FromArrayBuffer from './crc32';

export default class Rom {
  constructor(data) {
    if (
         data[0] === 78 // N
      && data[1] === 69 // E
      && data[2] === 83 // S
      && data[3] === 0x01a
    ) {
      // Every .nes file has a 16 byte header. The first 4 characters are NES\0x01a.
      // Offsets 4 and 5 specify the number of PRG and CHR banks, respectively.
      this.headerBytes = data.slice(0, 16);
      this.romBytes    = data.slice(16);
    } else {
      throw new Error('NES Header not found.');
    }
  }

  romCRC() {
    return crc32FromArrayBuffer(this.romBytes).toString(16)
  }

  format() {
    if ((this.headerBytes[7] & 0b1100) >> 2 === 2) {
      return 'NES 2.0';
    } else if (this.headerBytes.slice(12, 16).reduce((x, y) => x + y) === 0) {
      return 'Standard iNES';
    } else {
      return 'Archaic iNES';
    }
  }
  
  header() {
    const data = this.headerBytes;

    return {
      prgRomSize:     data[4],
      chrRomSize:     data[5],
      mirroring:      (data[6] & 1) ? 'Vertical' : 'Horizontal',
      battery:        !!(data[6] & 2),
      trainer:        !!(data[6] & 4),
      fourScreenVram: !!(data[6] & 8),
      mapper:         ((data[6] & 0xF0) >> 4) + (data[7] & 0xF0),
      vsUnisystem:    !!(data[7] & 1),
      playChoice10:   !!(data[7] & 2),
      prgRamSize:     data[8],
      tvColorSystem:  (data[9] & 1) ? 'PAL' : 'NTSC'
    }
  }


}
