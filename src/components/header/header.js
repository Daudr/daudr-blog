import React from "react"
import { Link } from "gatsby"

import { scale, rhythm } from "../../utils/typography"

import "./header.css"

export const Header = ({ title }) => {
  const header = (
    <h1
      style={{
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
      }}
      className="header-title"
    >
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h1>
  )

  return (
    <header
      style={{
        color: `white`,
      }}
    >
      <div className="background-sky hero"></div>
      {header}
    </header>
  )
}

export default Header
