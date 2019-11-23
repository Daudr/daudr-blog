import React, { useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import ReactFlagsSelect from 'react-flags-select'

import { scale, rhythm } from '../../utils/typography'

import 'react-flags-select/css/react-flags-select.css'
import './header.css'

export const Header = ({
  title,
  setSelectedLanguage,
  defaultLang,
  customSkyClass = ``,
}) => {
  const flagsRef = useRef(null)

  useEffect(() => {
    flagsRef.current.updateSelected(defaultLang)
  }, [defaultLang])

  const header = (
    <h1
      style={{
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
      }}
      className='header-title'
    >
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={defaultLang === 'US' ? `/` : `/it`}
      >
        {title}
      </Link>
    </h1>
  )

  const selectLanguage = country => {
    const language = country === 'IT' ? 'it' : 'en'
    setSelectedLanguage(language)
  }

  return (
    <header
      style={{
        color: `white`,
      }}
    >
      <div className={`background-sky hero ${customSkyClass}`}></div>
      <div className='flag-select' style={{ position: `fixed`, right: `10px` }}>
        <ReactFlagsSelect
          defaultCountry={defaultLang}
          countries={['US', 'IT']}
          showOptionLabel={false}
          showSelectedLabel={false}
          onSelect={selectLanguage}
          placeholder=''
          ref={flagsRef}
        />
      </div>
      {header}
    </header>
  )
}

export default Header
