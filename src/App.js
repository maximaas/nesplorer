import React from 'react';
import Rom from './rom'
import RomData from './components/RomData'
import ExternalLink from './components/ExternalLink'
import './App.css';

class App extends React.Component {
  onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
      const data = new Uint8Array(e.target.result);
      try {
        const rom = new Rom(data);

        this.setState((prevState, props) => {
          return {
            crc32:      rom.crc32,
            romHeader:  rom.header,
            spriteData: rom.spriteData,
            file:       file
          }
        })
      } catch (e) {
         alert(e.message);  // invalid nes
      }
    });
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  }

  render() {
    const { state } = this

    return (

      <div className="App">
        <div className='rom-file'>
          <fieldset>
            <legend>NES ROM</legend>
              <table>
                <tbody>
                  <tr>
                    <td>Rom File</td>
                    <td><input type='file' id='file' accept='.nes' onChange={(e) => { this.onChange(e) }} />
                  </td>
                  </tr>
                </tbody>
                {state && state.file && state.romHeader &&
                  <tbody>

                    <tr>
                      <td>File Name</td>
                      <td>{state.file.name}</td>
                    </tr>
                    <tr>
                      <td>File Size</td>
                      <td>{state.file.size / 1000} KB</td>
                    </tr>
                    <tr>
                      <td>Header Format</td>
                      <td>
                        {state.romHeader.format === 'Standard iNES' &&
                          <ExternalLink href='https://wiki.nesdev.com/w/index.php/INES' label={state.romHeader.format} />
                        }

                        {state.romHeader.format === 'NES 2.0' &&
                          <ExternalLink href='https://wiki.nesdev.com/w/index.php/NES_2.0' label={state.romHeader.format} />
                        }
                      </td>
                    </tr>
                  </tbody>
                }
              </table>
            </fieldset>
        </div>
        {state &&
          <RomData {...state} />
        }
      </div>
    );
  }

}


export default App;
