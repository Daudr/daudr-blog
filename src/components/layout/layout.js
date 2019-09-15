import React from "react"
import CookieConsent from "react-cookie-consent"

import { rhythm } from "../../utils/typography"

import { Header } from "../header/header"

export const Layout = ({ location, title, children, setSelectedLanguage, defaultLang }) => {
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Header location={location} title={title} setSelectedLanguage={setSelectedLanguage} defaultLang={defaultLang} />
      <main>{children}</main>
      <footer>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.iubenda.com/privacy-policy/49067529"
          title="Privacy Policy"
          style={{
            boxShadow: `none`,
            color: `currentColor`,
          }}
        >
          Privacy Policy
        </a>
        <br />© {new Date().getFullYear()}, Michele Da Rin Fioretto - Dauðr
      </footer>

      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  )
}

export default Layout
