import React, { useState, useEffect } from 'react'
import { graphql, navigate } from 'gatsby'

import Layout from '../components/layout/layout'
import SEO from '../components/seo/seo'
import ArticleCard from '../components/article-card/article-card'
import { Pagination } from '../components/pagination/pagination'

export const BlogIndex = ({ data, location, pageContext }) => {
	const [selectedLanguage, setSelectedLanguage] = useState('en')

	const { currentPage = 0, numPages = 0 } = pageContext

	const siteTitle = data.site.siteMetadata.title
	const posts = data.allMarkdownRemark.edges

	useEffect(() => {
		if (selectedLanguage === 'it') {
			navigate('/it')
		}
	}, [selectedLanguage])

	return (
		<Layout
			location={location}
			title={siteTitle}
			setSelectedLanguage={setSelectedLanguage}
			defaultLang='US'
			isIndex={true}
		>
			<SEO
				title='All Articles'
				keywords={[
					`blog`,
					`gatsby`,
					`javascript`,
					`react`,
					`angular`,
					`michele da rin fioretto`,
				]}
			/>
			{posts.map(({ node }) => {
				return (
					<ArticleCard
						node={node}
						key={node.fields.slug}
						isIndex={true}
					></ArticleCard>
				)
			})}

			<div style={{ textAlign: `center`, width: `100%` }}>
				<Pagination
					isIT={false}
					currentPage={currentPage}
					numPages={numPages}
				></Pagination>
			</div>
		</Layout>
	)
}

export default BlogIndex

export const pageQuery = graphql`
	query blogListQuery($skip: Int, $limit: Int) {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { lang: { eq: null } } }
			limit: $limit
			skip: $skip
		) {
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
