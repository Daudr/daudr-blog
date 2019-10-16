import React, { useEffect, useState } from 'react'
import { graphql, navigate } from 'gatsby'

import { Layout } from '../components/layout/layout'
import { SEO } from '../components/seo/seo'

export const NotFoundPage = ({ data, location }) => {
	const [selectedLanguage, setSelectedLanguage] = useState('en')

	const siteTitle = data.site.siteMetadata.title

	useEffect(() => {
		if (selectedLanguage === 'it') {
			navigate('/it/404/')
		}
	}, [selectedLanguage])

	return (
		<Layout
			location={location}
			title={siteTitle}
			defaultLang='US'
			setSelectedLanguage={setSelectedLanguage}
		>
			<SEO title='404: Not Found' />
			<h1 style={{ color: `white` }}>Not Found</h1>
			<p style={{ color: `white` }}>
				You just hit a route that doesn&#39;t exist... the sadness.
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
