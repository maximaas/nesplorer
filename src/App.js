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
          <label htmlFor="file">&#x1F4BE; Choose ROM</label>
          <input type='file' id='file' accept='.nes' onChange={(e) => { this.onChange(e) }} />
        </div>
        {state &&
          <RomData {...state} />
        }
      </div>
    );
  }

}


export default App;
