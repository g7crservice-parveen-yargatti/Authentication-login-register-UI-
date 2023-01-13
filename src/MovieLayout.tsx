import React from 'react'
import { Outlet } from 'react-router-dom'

function MovieLayout() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default MovieLayout