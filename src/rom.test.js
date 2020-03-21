import Rom from './rom'
import crc32FromArrayBuffer from './crc32';
const fs = require('fs')

test('ROM CRC', () => {
  const romFile = fs.readFileSync('./files/mario.nes')
  const rom = new Rom(romFile)

  expect(rom.crc32).toBe('d445f698')
})

test('ROM Header', () => {
  const romFile = fs.readFileSync('./files/mario.nes')
  const rom = new Rom(romFile)

  expect(rom.header.format).toBe('Standard iNES')
  expect(rom.header.battery).toBe(false)
  expect(rom.header.chrRomBanks).toBe(1)
  expect(rom.header.fourScreenVram).toBe(false)
  expect(rom.header.mapper).toBe(0)
  expect(rom.header.mirroring).toBe('Vertical')
  expect(rom.header.playChoice10).toBe(false)
  expect(rom.header.prgRamBanks).toBe(0)
  expect(rom.header.prgRomBanks).toBe(2)
  expect(rom.header.trainer).toBe(false)
  expect(rom.header.tvColorSystem).toBe('NTSC')
  expect(rom.header.vsUnisystem).toBe(false)
})

test('mario.chr', () => {
  const romFile = fs.readFileSync('./files/mario.nes')
  const rom = new Rom(romFile)

  const chrFile = fs.readFileSync('./files/mario.chr')

  expect(crc32FromArrayBuffer(chrFile).toString(16)).toStrictEqual('867b51ad')
  expect(crc32FromArrayBuffer(rom.chrBytes).toString(16)).toStrictEqual('867b51ad')
})
