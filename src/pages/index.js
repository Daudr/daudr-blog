import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import ArticleCard from "../components/article-card/article-card"

export const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="Tutti i post"
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
        return <ArticleCard node={node} key={node.fields.slug}></ArticleCard>
      })}
      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
