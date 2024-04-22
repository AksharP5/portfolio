import React from 'react'
import Button from '../Button/Button';

const Nav = () => {
  let Links = [
    {name: 'Projects', link: '/projects'},
    {name: 'Experience', link: '/experience'},
    {name: 'About', link: '/about'},
    {name: 'Contact', link: '/contact'},
  ];
  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center 
      font-[Poppins] text-gray-800'>
        <span>
        </span>
        Home
      </div>
      <ul className='md:flex md:items-center'>
        {
          Links.map((link) => (
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
            </li>
          ))
        }
        <Button></Button>
      </ul>
      </div>
    </div>
  )
}

export default Nav
