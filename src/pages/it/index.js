import React, { useState, useEffect } from 'react'
import { graphql, navigate } from 'gatsby'

import Layout from '../../components/layout/layout'
import SEO from '../../components/seo/seo'
import ArticleCard from '../../components/article-card/article-card'
import { Pagination } from '../../components/pagination/pagination'

export const ItalianBlogIndex = ({ data, location, pageContext }) => {
	const [selectedLanguage, setSelectedLanguage] = useState('it')

	const { numPages = 0, currentPage = 0 } = pageContext

	const siteTitle = data.site.siteMetadata.title
	const posts = data.allMarkdownRemark.edges

	useEffect(() => {
		if (selectedLanguage === 'en') {
			navigate('/')
		}
	}, [selectedLanguage])

	return (
		<Layout
			location={location}
			title={siteTitle}
			defaultLang='IT'
			setSelectedLanguage={setSelectedLanguage}
			isIndex={true}
		>
			<SEO
				title='Tutti i post'
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
						isIT={true}
					></ArticleCard>
				)
			})}

			<div style={{ textAlign: `center`, width: `100%` }}>
				<Pagination
					isIT={true}
					currentPage={currentPage}
					numPages={numPages}
				></Pagination>
			</div>
		</Layout>
	)
}

export default ItalianBlogIndex

export const pageQuery = graphql`
	query italianBlogListQuery($skip: Int, $limit: Int) {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { lang: { eq: "it" } } }
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
