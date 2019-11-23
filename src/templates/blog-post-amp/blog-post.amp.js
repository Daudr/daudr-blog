import React, { useState, useEffect } from 'react'
import { Link, graphql, navigate } from 'gatsby'

import Disqus from 'gatsby-plugin-disqus'

import { rhythm, scale } from '../../utils/typography'

import Bio from '../../components/bio/bio'
import Layout from '../../components/layout/layout'
import SEO from '../../components/seo/seo'
import Tag from '../../components/tag/tag'
import ShareButtons from '../../components/share-buttons/share-buttons'
import EmailSignup from '../../components/email-signup/email-signup'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
	},
}))

export const AMPBlogPostTemplate = ({ data, location, pageContext }) => {
	const [selectedLanguage, setSelectedLanguage] = useState()
	const [defaultCountry, setDefaultCountry] = useState()

	const post = data.markdownRemark
	const siteUrl = data.site.siteMetadata.siteUrl
	const siteTitle = data.site.siteMetadata.title
	const { slug, previous, next } = pageContext

	const classes = useStyles()

	useEffect(() => {
		const isIT = window.location.pathname.match(/\/it\//) !== null

		setDefaultCountry(isIT ? 'IT' : 'US')
		setSelectedLanguage(isIT ? 'it' : 'en')
	}, [defaultCountry])

	useEffect(() => {
		if (selectedLanguage === 'it' && !slug.match(/it\//)) {
			navigate(`/it${slug}`)
		} else if (selectedLanguage === 'en') {
			navigate(slug.replace('/it', ''))
		}
	}, [selectedLanguage, slug])

	return (
		<Layout
			location={location}
			title={siteTitle}
			setSelectedLanguage={setSelectedLanguage}
			defaultLang={defaultCountry}
		>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
				keywords={post.frontmatter.keywords}
				post={post}
				postSEO
				slug={slug}
				coverImage={post.frontmatter.cover_image}
			/>
			<Paper className={classes.root}>
				<h1 style={{ marginTop: 0 }}>{post.frontmatter.title}</h1>
				<p
					style={{
						...scale(-1 / 5),
						display: `block`,
						marginBottom: rhythm(1),
						marginTop: rhythm(-1),
					}}
				>
					{post.frontmatter.date}
				</p>
				<div dangerouslySetInnerHTML={{ __html: post.html }} />
				<hr
					style={{
						marginBottom: rhythm(1),
					}}
				/>

				<div
					style={{
						display: `flex`,
						flexDirection: `row`,
						justifyContent: `space-evenly`,
						flexWrap: 'wrap',
						marginBottom: rhythm(1),
					}}
				>
					{post.frontmatter.tags.map(tag => {
						return <Tag tag={tag} key={tag} />
					})}
				</div>

				<ShareButtons postNode={post} url={`${siteUrl}${slug}`} />

				<EmailSignup isAMP={true} />

				<amp-auto-ads
					type='adsense'
					data-ad-client='ca-pub-3926299101061647'
				></amp-auto-ads>
			</Paper>

			<ul
				style={{
					display: `flex`,
					flexWrap: `wrap`,
					justifyContent: `space-between`,
					listStyle: `none`,
					padding: 0,
					marginLeft: 0,
					width: `100%`,
				}}
			>
				<li>
					{previous && (
						<Link
							to={previous.fields.slug}
							rel='prev'
							style={{ display: `flex`, boxShadow: `none` }}
						>
							<ArrowBackIcon></ArrowBackIcon> {previous.frontmatter.title}
						</Link>
					)}
				</li>
				<li>
					{next && (
						<Link
							to={next.fields.slug}
							rel='next'
							style={{ display: `flex`, boxShadow: `none` }}
						>
							{next.frontmatter.title} <ArrowForwardIcon></ArrowForwardIcon>
						</Link>
					)}
				</li>
			</ul>

			<Disqus
				identifier={post.frontmatter.id}
				title={post.frontmatter.title}
				url={location.href}
			></Disqus>
		</Layout>
	)
}

export default AMPBlogPostTemplate

export const pageQuery = graphql`
	query AMPBlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
				siteUrl
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
				keywords
				tags
			}
		}
	}
`
