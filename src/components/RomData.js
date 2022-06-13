import React        from 'react';

import downloadAs   from '../utils'

// components
import ExternalLink from './ExternalLink'
import ChrBank      from './ChrBank'

export default class RomData extends React.Component {
  state = {
    spritesPerRow: 16
  }

  downloadAsCHR() {
    const { chrBytes, file } = this.props

    if (chrBytes === undefined) {
      throw new Error('chrBytes is not set')
    }

    const fileName = file.name.replace('.nes', '.chr')

    const downloadURL = window.URL.createObjectURL(new Blob(chrBytes, {type: "octet/stream"}))
    downloadAs(downloadURL, fileName)
  }

  setSpritesPerRow(spritesPerRow) {
    this.setState((prevState, props) => {
      return {
        spritesPerRow: spritesPerRow
      }
    })
  }

  render() {
    const { props } = this

    const { romHeader, crc32, spriteData, chrBytes, file } = props

    const { spritesPerRow } = this.state

    const romMapperLink = `https://wiki.nesdev.com/w/index.php/INES_Mapper_${romHeader.mapper.toString().padStart(3, '0')}`

    let cabinetStyle;
    if (romHeader.vsUnisystem) {
      cabinetStyle = 'Nintendo VS. System'
    } else if (romHeader.playChoice10) {
      cabinetStyle = 'PlayChoice-10'
    } else {
      cabinetStyle = 'None'
    }

    return (
      <div className='rom'>
        <fieldset>
        <legend>ROM DATA</legend>

        <table>
          <tbody>
            <tr>
              <td>CRC</td>
              <td>
                <span style={{'textTransform': 'uppercase'}}>
                  {crc32}
                </span>
              </td>
            </tr>
            <tr>
              <td>Mapper</td>
              <td>
                <ExternalLink href={romMapperLink} label={romHeader.mapper} />
              </td>
            </tr>
            <tr>
              <td>Mirroring</td>
              <td>{romHeader.mirroring}</td>
            </tr>
            <tr>
              <td>TV Color System</td>
              <td>{romHeader.tvColorSystem}</td>
            </tr>
            <tr>
              <td>prgRomBanks</td>
              <td>{romHeader.prgRomBanks}</td>
            </tr>
            {romHeader.prgRamBanks > 0 &&
              <tr>
                <td>prgRamBanks</td>
                <td>{romHeader.prgRamBanks}</td>
              </tr>
            }

            {romHeader.chrRomBanks > 0 &&
              <tr>
                <td>chrRomBanks</td>
                <td>
                  {romHeader.chrRomBanks}
                  &nbsp;
                  <button onClick={() => { this.downloadAsCHR() }}>CHR</button>
                </td>
              </tr>
            }
            <tr>
              <td>fourScreenVram</td>
              <td>{romHeader.fourScreenVram ? 'YES': 'NO'}</td>
            </tr>
            <tr>
              <td>battery</td>
              <td>{romHeader.battery ? 'YES': 'NO'}</td>
            </tr>
            <tr>
              <td>Cabinet</td>
              <td>{cabinetStyle}</td>
            </tr>
            <tr>
              <td>trainer</td>
              <td>{romHeader.trainer ? 'YES': 'NO'}</td>
            </tr>
          </tbody>
        </table>
        </fieldset>

        {romHeader.chrRomBanks > 0 &&
          <fieldset>
            <legend>CHR DATA</legend>
            <button onClick={() => this.setSpritesPerRow(2)}>2x256 tiles</button>
            <button onClick={() => this.setSpritesPerRow(4)}>4x128 tiles</button>
            <button onClick={() => this.setSpritesPerRow(8)}>8x64 tiles</button>
            <button onClick={() => this.setSpritesPerRow(16)}>16x32 tiles</button>
            <button onClick={() => this.setSpritesPerRow(32)}>32x16 tiles</button>
            <button onClick={() => this.setSpritesPerRow(64)}>64x8 tiles</button>
            <button onClick={() => this.setSpritesPerRow(128)}>128x4 tiles</button>
            <button onClick={() => this.setSpritesPerRow(256)}>256x2 tiles</button>
            <div className='spriteData'>
              {
                [...Array(romHeader.chrRomBanks)].map((e, i) => {
                  const key = [i, crc32].join('_')
                  return(
                    <div className='chrBank' key={key}>
                      <b>Bank #{i}</b>
                      <ChrBank index={i} sprites={spriteData[i]} spritesPerRow={spritesPerRow} />
                    </div>
                  )
                })
              }
            </div>
          </fieldset>
        }
      </div>
    )
  }
}
