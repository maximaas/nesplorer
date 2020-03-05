import React from 'react';

export default class RomData extends React.Component {
  render() {
    const { state, props } = this

    const { rom, file } = props

    console.log(file)

    return (
      <div className='rom'>
      <fieldset>
        <legend>FILE</legend>
        <table>
          <tbody>
            <tr>
              <td>File</td>
              <td>{file.name}</td>
            </tr>
            <tr>
              <td>size</td>
              <td>{file.size}</td>
            </tr>
          </tbody>
          </table>
        </fieldset>

        <fieldset>
        <legend>ROM DATA</legend>

        <table>
          <tbody>
            <tr>
              <td>CRC</td>
              <td>{rom.crc32}</td>
            </tr>
            <tr>
              <td>Format</td>
              <td>{rom.version}</td>
            </tr>
            <tr>
              <td>Mapper</td>
              <td>{rom.mapper}</td>
            </tr>
            <tr>
              <td>Mirroring</td>
              <td>{rom.mirroring}</td>
            </tr>
            <tr>
              <td>fourScreenVram</td>
              <td>{rom.fourScreenVram}</td>
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
              <td>battery</td>
              <td>{rom.battery || '---'}</td>
            </tr>
            <tr>
              <td>trainer</td>
              <td>{rom.trainer}</td>
            </tr>
            <tr>
              <td>vsUnisystem</td>
              <td>{rom.vsUnisystem}</td>
            </tr>
            <tr>
              <td>playChoice10</td>
              <td>{rom.playChoice10}</td>
            </tr>
          </tbody>
        </table>
        </fieldset>
      </div>
    )
  }
}
