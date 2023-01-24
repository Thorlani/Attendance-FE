import React from 'react'
import {useNavigate} from "react-router-dom"

const Navbar = (prop: {function: any, content: string}) => {
    const navigate = useNavigate()
  return (
    <>
      <nav>
        <ul>
          <li>
            <strong>Lani's App</strong>
          </li>
        </ul>
        <ul>
          <li onClick={prop.function}>
            <a href="#" role="button">
              {prop.content}
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
