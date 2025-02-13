import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className='flex gap-2'>
      <h1> <FontAwesomeIcon icon={faListCheck} /></h1>
      <div>To do List</div>
      </div>
  )
}

export default Header