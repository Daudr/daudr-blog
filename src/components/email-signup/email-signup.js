import React, { useState } from "react"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import addToMailchimp from "gatsby-plugin-mailchimp"

import { rhythm } from "../../utils/typography"

export const EmailSignup = ({ isAMP = false, isIT = false }) => {
  const [email, setEmail] = useState("")
  const [data, setData] = useState({})
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [emailText, setEmailText] = useState("")
  const [errorText, setErrorText] = useState(``)

  const handleClick = event => {
    event.preventDefault()
    addToMailchimp(email).then(data => {
      setEmail("")
      setData(data)

      if (data.result === `success`) {
        setEmailText(
          isIT ? `Registrato correttamente!` : `Signed in succefully!`
        )
        setErrorText(``)
        setInvalidEmail(false)
      } else {
        setInvalidEmail(true)
        setErrorText(
          isIT
            ? `C'è stato un errore nella registrazione, riprova`
            : `Some error occurred whilst signing you up, please retry`
        )
      }
    })
  }

  const checkMail = email => {
    const regexp = /\S+@\S+\.\S+/
    const test = regexp.test(email)
    setInvalidEmail(!test)
    setEmail(email)

    setErrorText(test ? `` : isIT ? `Email non valida` : `Invalid email`)

    if (data) {
      setEmailText(``)
    }
  }

  const formStyle = {
    display: `flex`,
    flexWrap: `wrap`,
    alignItems: `baseline`,
    justifyContent: `center`,
  }

  return (
    <div style={{ margin: rhythm(1), textAlign: `center` }}>
      <p style={{ marginBottom: 0 }}>
        {isIT
          ? `Vuoi rimanere sempre aggiornato sulla pubblicazione di nuovi articoli?`
          : `Do you want to be updated when new articles are being published?`}
      </p>
      <p style={{ marginBottom: rhythm(1 / 2) }}>
        {isIT ? `Registrati alla newsletter!` : `Join the newsletter!`}{" "}
        <span role="img" aria-label="sunglasses smile">
          😎
        </span>
      </p>
      {isAMP ? (
        <amp-form style={formStyle} method="GET" target="_top">
          <FormControl error={invalidEmail}>
            <TextField
              id="email"
              name="email"
              label="Email"
              margin="normal"
              variant="outlined"
              helperText={emailText}
              value={email}
              onChange={event => checkMail(event.target.value)}
              data-cy="email-input"
            />
            <FormHelperText data-cy="error-text" hidden={!invalidEmail}>
              {errorText}
            </FormHelperText>
          </FormControl>
          <Button
            onClick={handleClick}
            variant="outlined"
            color="primary"
            disabled={email === "" || invalidEmail}
            style={{ marginLeft: rhythm(1 / 2), height: `56px` }}
            data-cy="email-button"
            type="submit"
          >
            {isIT ? `Aggiungimi!` : `Add me!`}
          </Button>
        </amp-form>
      ) : (
        <form style={formStyle} method="GET" target="_top">
          <FormControl error={invalidEmail}>
            <TextField
              id="email"
              name="email"
              label="Email"
              margin="normal"
              variant="outlined"
              helperText={emailText}
              value={email}
              onChange={event => checkMail(event.target.value)}
              data-cy="email-input"
            />
            <FormHelperText data-cy="error-text" hidden={!invalidEmail}>
              {errorText}
            </FormHelperText>
          </FormControl>
          <Button
            onClick={handleClick}
            variant="outlined"
            color="primary"
            disabled={email === "" || invalidEmail}
            style={{ marginLeft: rhythm(1 / 2), height: `56px` }}
            data-cy="email-button"
            type="submit"
          >
            {isIT ? `Aggiungimi!` : `Add me!`}
          </Button>
        </form>
      )}
    </div>
  )
}

export default EmailSignup
