import React from 'react'


// 512 x 8x8 sprites
export default class  ChrBank extends React.Component {

  render(){
    return(
      <div style={{backgroundColor: 'rgb(77, 155, 251)', width: 512}}>
        <canvas ref='canvas' width={128} height={256} />
      </div>
    )
  }

  componentDidMount() {
    const pallette = [
      [255,   255,   255,    0],
      [172,   172,   172,    255],
      [ 85,    85,    85,    255],
      [  0,     0,     0,    255]
    ]

    const canvas = this.refs.canvas
    const ctx    = canvas.getContext('2d')
    const sprites = this.props.sprites

    let x = 0
    let y = 0

    sprites.forEach((sprite, i) => {
      const data = []
      // 64
      sprite.pixels.forEach((colorIdx) => {
        const [r, g, b, a] = pallette[colorIdx]

        data.push(r)
        data.push(g)
        data.push(b)
        data.push(a)
      })

      const imageData = new ImageData(new Uint8ClampedArray(data), 8)

      x = (i % 16) * 8
      y = Math.floor(i / 16) * 8

      ctx.putImageData(imageData, x, y);
    })

  }
}
