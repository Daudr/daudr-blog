import React, { useState, useEffect } from "react"
import { graphql, navigate } from "gatsby"

import Layout from "../../components/layout/layout"
import SEO from "../../components/seo/seo"
import ArticleCard from "../../components/article-card/article-card"

export const ItalianBlogIndex = ({ data, location }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("it")

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  useEffect(() => {
    if (selectedLanguage === "en") {
      navigate("/")
    }
  }, [selectedLanguage])

  return (
    <Layout
      location={location}
      title={siteTitle}
      defaultLang="IT"
      setSelectedLanguage={setSelectedLanguage}
      isIndex={true}
    >
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
        return <ArticleCard node={node} key={node.fields.slug} isIndex={true}></ArticleCard>
      })}
    </Layout>
  )
}

export default ItalianBlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { lang: { eq: "it" } } }
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
