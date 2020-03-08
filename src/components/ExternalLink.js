import React from 'react'

const ExternalLink = (props) => {
  const { href, label } = props

  return(
    <a href={href} target='_blank' rel='noopener noreferrer'>{label}</a>
  )
}

export default ExternalLink
