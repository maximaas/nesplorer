import crc32FromArrayBuffer from './crc32';

export default class Rom {
  constructor(data) {
    let isValid = String.fromCharCode(data[0], data[1], data[2]) === "NES";
    if (!isValid) throw new Error('Not a valid NES file.');

    // What type of header is this?
    let version;
    if ((data[7] & 0b1100) >> 2 === 2) {
      version = 'NES 2.0';
    } else if (data.slice(12, 16).reduce((x, y) => x + y) === 0) {
      version = 'Standard iNES';
    } else {
      version = 'Archaic iNES';
    }

    const crc32 = crc32FromArrayBuffer(data.slice(16)).toString(16)

    this.header = {
      crc32:          crc32,
      prgRomSize:     data[4],
      chrRomSize:     data[5],
      mirroring:      (data[6] & 1) ? 'Vertical' : 'Horizontal',
      battery:        !!(data[6] & 2),
      trainer:        !!(data[6] & 4),
      fourScreenVram: !!(data[6] & 8),
      version:        version,
      mapper:         ((data[6] & 0xF0) >> 4) + (data[7] & 0xF0),
      vsUnisystem:    !!(data[7] & 1),
      playChoice10:   !!(data[7] & 2),
      prgRamSize:     data[8],
      tvSystem:       (data[9] & 1) ? 'PAL' : 'NTSC'
    }
  }
}
