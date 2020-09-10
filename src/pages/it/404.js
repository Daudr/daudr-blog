import React, { useEffect, useState } from 'react'
import { graphql, navigate } from 'gatsby'

import { Layout } from '../../components/layout/layout'
import { SEO } from '../../components/seo/seo'

export const NotFoundPage = ({ data, location }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('it')

  const siteTitle = data.site.siteMetadata.title

  useEffect(() => {
    if (selectedLanguage === 'en') {
      navigate('/404/')
    }
  }, [selectedLanguage])

  return (
    <Layout
      location={location}
      title={siteTitle}
      defaultLang='IT'
      setSelectedLanguage={setSelectedLanguage}
    >
      <SEO title='404: Non Trovato' location={location} />
      <h1 style={{ color: `white` }}>Oh no, non trovato</h1>
      <p style={{ color: `white` }}>
        Peccato... hai trovato un link che non porta a nulla.{' '}
        <span role='img' aria-label='sadness'>
          😭
        </span>
        <span role='img' aria-label='sadness'>
          😭
        </span>
        <span role='img' aria-label='sadness'>
          😭
        </span>
      </p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
