import React from 'react';
import ExternalLink from './ExternalLink'
import ChrBank      from './ChrBank'

export default class RomData extends React.Component {
  render() {
    const { props } = this

    const { romHeader, crc32, spriteData } = props

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
          <legend>CHR DATA</legend>
          <div className='spriteData'>
              {romHeader.chrRomBanks &&
                [...Array(romHeader.chrRomBanks)].map((e, i) => {
                  const key = [i, crc32].join('_')
                  return(
                    <div className='chrBank' key={key}>
                      <b>Bank #{i}</b>
                      <ChrBank index={i} sprites={spriteData[i]} />
                    </div>
                  )
                })
              }
            </div>
        </fieldset>

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
      </div>
    )
  }
}
