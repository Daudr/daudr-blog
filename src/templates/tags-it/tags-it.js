import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import { rhythm } from "../../utils/typography"

import Bio from "../../components/bio/bio"
import Layout from "../../components/layout/layout"
import ArticleCard from "../../components/article-card/article-card"

export const ItalianTags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark
  const siteTitle = data.site.siteMetadata.title

  const tagHeader = `Artiicoli su #${tag}`

  return (
    <Layout title={siteTitle} location={`/it/tags/${tag}`}>
      <h2
        style={{
          fontFamily: `'Anton', sans-serif`,
          fontWeight: `bold`,
          textTransform: `uppercase`,
          letterSpacing: '3px',
          color: `#ffffff`
        }}
      >
        {tagHeader}
      </h2>

      {edges.map(({ node }) => {
        return <ArticleCard node={node} key={node.fields.slug}></ArticleCard>
      })}

      <div style={{ marginBottom: rhythm(2.5) }}>
        <Link to="/it/tags">Tutti i Tag</Link>
      </div>

      <Bio />
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
