import React from 'react';
import ExternalLink from './ExternalLink'

export default class RomData extends React.Component {
  render() {
    const { props } = this

    const { rom, crc32 } = props

    const romMapperLink = `https://wiki.nesdev.com/w/index.php/INES_Mapper_${rom.mapper.toString().padStart(3, '0')}`

    let cabinetStyle;
    if (rom.vsUnisystem) {
      cabinetStyle = 'Nintendo VS. System'
    } else if (rom.playChoice10) {
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
                <ExternalLink href={romMapperLink} label={rom.mapper} />
              </td>
            </tr>
            <tr>
              <td>Mirroring</td>
              <td>{rom.mirroring}</td>
            </tr>
            <tr>
              <td>TV Color System</td>
              <td>{rom.tvColorSystem}</td>
            </tr>
            <tr>
              <td>prgRomSize</td>
              <td>{rom.prgRomSize}</td>
            </tr>
            {rom.prgRamSize > 0 &&
              <tr>
                <td>prgRamSize</td>
                <td>{rom.prgRamSize}</td>
              </tr>
            }
            <tr>
              <td>fourScreenVram</td>
              <td>{rom.fourScreenVram ? 'YES': 'NO'}</td>
            </tr>
            <tr>
              <td>battery</td>
              <td>{rom.battery ? 'YES': 'NO'}</td>
            </tr>
            <tr>
              <td>Cabinet</td>
              <td>{cabinetStyle}</td>
            </tr>
            <tr>
              <td>trainer</td>
              <td>{rom.trainer ? 'YES': 'NO'}</td>
            </tr>
          </tbody>
        </table>
        </fieldset>

        <fieldset>
          <legend>CHR DATA</legend>
          <table>
            <tbody>
            <tr>
              <td>chrRomSize</td>
              <td>{rom.chrRomSize}</td>
            </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    )
  }
}
