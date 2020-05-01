import React from 'react'


const Download = (props) => {
  const { chrBytes, fileName } = props

  const onClick = (e) => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    const blob = new Blob(chrBytes, {type: "octet/stream"});
    const url = window.URL.createObjectURL(blob);

    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  }

  return(
    <div>
      Download <button onClick={onClick}>{fileName}</button>
    </div>
  )
}

export default Download
