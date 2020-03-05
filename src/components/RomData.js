import React from 'react';

export default class RomData extends React.Component {
  render() {
    const { state, props } = this

    // prgRomSize: 2
    // chrRomSize: 1
    // mirroring: "Horizontal"
    // battery: false
    // trainer: false
    // fourScreenVram: false
    // version: "iNES"
    // mapper: 0
    // vsUnisystem: false
    // playChoice10: false
    // prgRamSize: 0
    // tvSystem: "NTSC"

    return (
      <div className='rom'>
        <table width='500' border='1'>
          <tbody>
            <tr>
              <td>CRC</td>
              <td>{props.crc32}</td>
            </tr>
            <tr>
              <td>Format</td>
              <td>{props.header.version}</td>
            </tr>
            <tr>
              <td>Mapper</td>
              <td>{props.header.mapper}</td>
            </tr>
            <tr>
              <td>Mirroring</td>
              <td>{props.header.mirroring}</td>
            </tr>
            <tr>
              <td>fourScreenVram</td>
              <td>{props.header.fourScreenVram}</td>
            </tr>
            <tr>
              <td>prgRomSize</td>
              <td>{props.header.prgRomSize}</td>
            </tr>
            <tr>
              <td>chrRomSize</td>
              <td>{props.header.chrRomSize}</td>
            </tr>
            <tr>
              <td>prgRamSize</td>
              <td>{props.header.prgRamSize}</td>
            </tr>
            <tr>
              <td>tvSystem</td>
              <td>{props.header.tvSystem}</td>
            </tr>
            <tr>
              <td>battery</td>
              <td>{props.header.battery}</td>
            </tr>
            <tr>
              <td>trainer</td>
              <td>{props.header.trainer}</td>
            </tr>
            <tr>
              <td>vsUnisystem</td>
              <td>{props.header.vsUnisystem}</td>
            </tr>
            <tr>
              <td>playChoice10</td>
              <td>{props.header.playChoice10}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
