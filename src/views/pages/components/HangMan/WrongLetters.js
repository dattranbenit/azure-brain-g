import React from 'react'

const WrongLetters = ({ wrongLetters }) => {

  return (
    <div className="wrong-letters-container">
      <div>
        <h4 className='mb-3' style={{color: 'red'}}>WRONG LETTER</h4>
        <div className='d-md-flex justify-content-md-center'>
          {wrongLetters.map((letter, i) => {
              return <span key={i} style={{padding: '8px'}}>{letter}</span>
            }).reduce((prev, curr, i) => prev === null ? [curr] : [prev, curr], null)
          }
        </div>
      </div>
    </div>
  )
}

export default WrongLetters