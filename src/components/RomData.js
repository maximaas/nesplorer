import React from 'react';

export default class RomData extends React.Component {
  render() {
    const { state, props } = this

    const { rom, file } = props

    console.log(file)

    const romMapperLink = `https://wiki.nesdev.com/w/index.php/INES_Mapper_${rom.mapper.toString().padStart(3, '0')}`

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
                  {rom.crc32}
                </span>
              </td>
            </tr>
            <tr>
              <td>Mapper</td>
              <td><a href={romMapperLink} target='_blank'>{rom.mapper}</a></td>
            </tr>
            <tr>
              <td>Mirroring</td>
              <td>{rom.mirroring}</td>
            </tr>
            <tr>
              <td>prgRomSize</td>
              <td>{rom.prgRomSize}</td>
            </tr>
            <tr>
              <td>chrRomSize</td>
              <td>{rom.chrRomSize}</td>
            </tr>
            <tr>
              <td>prgRamSize</td>
              <td>{rom.prgRamSize}</td>
            </tr>
            <tr>
              <td>tvSystem</td>
              <td>{rom.tvSystem}</td>
            </tr>
            <tr>
              <td>fourScreenVram</td>
              <td>{rom.fourScreenVram ? 'YES': 'NO'}</td>
            </tr>
            <tr>
              <td>battery</td>
              <td>{rom.battery ? 'YES': 'NO'}</td>
            </tr>
            <tr>
              <td>trainer</td>
              <td>{rom.trainer ? 'YES': 'NO'}</td>
            </tr>
            <tr>
              <td>vsUnisystem</td>
              <td>{rom.vsUnisystem  ? 'YES': 'NO'}</td>
            </tr>
            <tr>
              <td>playChoice10</td>
              <td>{rom.playChoice10  ? 'YES': 'NO'}</td>
            </tr>
          </tbody>
        </table>
        </fieldset>
      </div>
    )
  }
}
