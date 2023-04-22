import React from 'react'

const Pages = ({ gotoNextPage, gotoPrevPage }) => {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}

export default Pages
