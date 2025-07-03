import React, {useState} from 'react'
import { setLocalStorage } from '../../utils/localStorage'

const Header = ({changeUser, data}) => {

  const logOutUser = () => {
    localStorage.setItem('loggedInUser','')
    changeUser('')
  }

  return (
    <div className='flex items-end justify-between'>
      <h1 className='text-2xl font-medium text-white'>Hello <br /> <span className='text-3xl font-semibold text-white'>{data?.firstName??"Admin"}👋🏻</span></h1>
      <button onClick={logOutUser} className='bg-red-500 text-lg font-medium text-white px-5 py-2 rounded-sm'>Log Out</button>
    </div>
  )
}

export default Header
