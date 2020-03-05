import React from 'react';

export default class RomData extends React.Component {
  render() {
    const { state, props } = this

    console.log(props)

    return (
      <div className='rom'>
        {props.crc32}
      </div>
    )
  }
}
