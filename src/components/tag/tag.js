import React, { useState } from "react"
import kebabCase from "lodash/kebabCase"
import { Link } from "gatsby"

export const Tag = ({ tag, count }) => {
  const [hover, setHover] = useState(false)

  const hoverOn = () => {
    setHover(true)
  }
  const hoverOff = () => {
    setHover(false)
  }

  return (
    <Link
      style={{
        boxShadow: `none`,
        textDecoration: `none`,
        color: `inherit`,
        fontFamily: `'Anton', sans-serif`,
        textTransform: `uppercase`,
        fontWeight: `bold`
      }}
      to={`/tags/${kebabCase(tag)}`}
    >
      <div
        style={{
          cursor: `pointer`,
          padding: `5px 10px`,
          border: hover ? `1px solid black` : `1px dashed black`,
          margin: `5px`,
          backgroundColor: `#FFFFFF`
        }}
        onMouseEnter={hoverOn}
        onMouseLeave={hoverOff}
      >
        #{tag} {count ? `(${count})` : ``}
      </div>
    </Link>
  )
}

export default Tag
