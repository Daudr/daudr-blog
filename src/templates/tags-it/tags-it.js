import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, navigate } from 'gatsby'

import { rhythm } from '../../utils/typography'

import Bio from '../../components/bio/bio'
import Layout from '../../components/layout/layout'
import ArticleCard from '../../components/article-card/article-card'

export const ItalianTags = ({ pageContext, data }) => {
	const { tag } = pageContext
	const { edges } = data.allMarkdownRemark
	const siteTitle = data.site.siteMetadata.title

	const tagHeader = `Articoli su #${tag}`

	const [selectedLanguage, setSelectedLanguage] = useState('it')

	useEffect(() => {
		if (selectedLanguage === 'en') {
			navigate(`/tags/${tag}`)
		}
	}, [selectedLanguage, tag])

	return (
		<Layout
			title={siteTitle}
			location={`/it/tags/${tag}`}
			defaultLang='IT'
			setSelectedLanguage={setSelectedLanguage}
			isIndex={true}
		>
			<h2 className='tags__header'>{tagHeader}</h2>

			{edges.map(({ node }) => {
				return (
					<ArticleCard
						node={node}
						key={node.fields.slug}
						isIndex={true}
					></ArticleCard>
				)
			})}

			<div className='tags__footer' style={{ marginBottom: rhythm(2.5) }}>
				<Link to='/it/tags' style={{ width: `100%` }}>
					Tutti i Tag
				</Link>
			</div>
		</Layout>
	)
}

ItalianTags.propTypes = {
	pageContext: PropTypes.shape({
		tag: PropTypes.string.isRequired,
	}),
	data: PropTypes.shape({
		site: PropTypes.shape({
			siteMetadata: PropTypes.shape({
				title: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.arrayOf(
				PropTypes.shape({
					node: PropTypes.shape({
						frontmatter: PropTypes.shape({
							date: PropTypes.string.isRequired,
							title: PropTypes.string.isRequired,
							description: PropTypes.string.isRequired,
							tags: PropTypes.array,
							cover_image: PropTypes.string,
						}),
						fields: PropTypes.shape({
							slug: PropTypes.string.isRequired,
						}),
					}),
				}).isRequired
			),
		}),
	}),
}

export default ItalianTags

export const pageQuery = graphql`
	query ItalianBlogPostsByTag($tag: String) {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] }, lang: { eq: "it" } } }
		) {
			totalCount
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
						tags
						cover_image
					}
				}
			}
		}
	}
`
