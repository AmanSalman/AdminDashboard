import React from 'react'
import '../CSSFiles/general.css'
function Error({message=" "}) {
  return (
    <div className='error-message'>Error: {message} </div>
  )
}

export default Error