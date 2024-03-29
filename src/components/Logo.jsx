import React from 'react'
import { Link } from 'react-router-dom'
import '../App.scss'

const Logo = () => {
  return (
    <Link to={'/organizations/home'} className='logo'>
        <h1>solneXus</h1>
    </Link>
  )
}

export default Logo