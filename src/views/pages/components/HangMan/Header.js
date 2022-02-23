import React from 'react'

const Header = ({livesLeft, topic}) => {
  return (
    <div className='header'>
      <div>
        <h4><span style={{color: 'black'}}>Topic is: </span><span>{topic}</span></h4>
        <h5><span>{livesLeft}</span> <span style={{color: 'black'}}>live{livesLeft > 1 ? 's' : ''} left</span></h5>
      </div>
      <p style={{color: 'black'}}><small><i>(Change your keyboard to English mode)</i></small></p>
    </div>
  )
}

export default Header