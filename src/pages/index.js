import React, { useState, useEffect } from "react"
import { graphql, navigate } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import ArticleCard from "../components/article-card/article-card"

export const BlogIndex = ({ data, location }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  useEffect(() => {
    if (selectedLanguage === "it") {
      navigate("/it")
    }
  }, [selectedLanguage])

  return (
    <Layout
      location={location}
      title={siteTitle}
      setSelectedLanguage={setSelectedLanguage}
      defaultLang="US"
    >
      <SEO
        title="All Articles"
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { lang: { eq: null } } }
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
