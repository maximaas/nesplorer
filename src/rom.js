import crc32FromArrayBuffer from './crc32';

export default class Rom {
  constructor(data) {
    let isValid = String.fromCharCode(data[0], data[1], data[2]) === "NES";
    if (!isValid) throw new Error('NES Header not found.');

    const crc32 = crc32FromArrayBuffer(data.slice(16)).toString(16);

    this.header = {
      crc32:          crc32,
      format:         this.detectFormat(data),
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

  detectFormat(data) {
    let format;
    if ((data[7] & 0b1100) >> 2 === 2) {
      format = 'NES 2.0';
    } else if (data.slice(12, 16).reduce((x, y) => x + y) === 0) {
      format = 'Standard iNES';
    } else {
      format = 'Archaic iNES';
    }

    return format
  }
}
