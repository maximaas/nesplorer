import React from 'react';
import Rom from './rom'
import RomData from './components/RomData'
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
            rom: rom.header,
            file: file
          }
        })
      } catch (e) {
         console.log(e.message);  // invalid nes
      }
    });

    reader.readAsArrayBuffer(file);
  }

  render() {
    const { props, state } = this

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
                {state && state.file && state.rom &&
                  <tbody>
                    <tr>
                      <td>FileName</td>
                      <td>{state.file.name}</td>
                    </tr>
                    <tr>
                      <td>FileSize</td>
                      <td>{state.file.size}</td>
                    </tr>
                    <tr>
                      <td>Format</td>
                      <td>{state.rom.format}</td>
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
