import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import { rhythm } from "../../utils/typography"

import Bio from "../../components/bio/bio"
import Layout from "../../components/layout/layout"

export const AngularPage = ({ pageContext, data }) => {
  const { edges } = data.allMarkdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle} location={`/tags/angular`}>
      <div
        className="background-hero"
        style={{
          backgroundColor: `#1976d2`,
          background: `linear-gradient(145deg,#0d47a1,#42a5f5)`,
          color: `#fff`,
          transform: `skewY(8deg)`,
          transformOrigin: `100%`,
        }}
      >
        <div className="page-header">
          <img
            alt="Angular logo"
            src="https://angular.io/assets/images/logos/angular/logo-nav@2x.png"
          />
          <h2 style={{ marginTop: `2.2rem` }}>Angular</h2>
        </div>
      </div>

      {edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        )
      })}

      <div style={{ marginBottom: rhythm(2.5) }}>
        <Link to="/tags">All tags</Link>
      </div>

      <Bio />
    </Layout>
  )
}

AngularPage.propTypes = {
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
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
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

export default AngularPage

export const pageQuery = graphql`
  query AngularBlogPosts {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: ["angular"] } } }
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
          }
        }
      }
    }
  }
`
