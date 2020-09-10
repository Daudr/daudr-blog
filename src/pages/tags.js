import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// Components
import { graphql, navigate } from 'gatsby'
import SEO from '../components/seo/seo'
import Layout from '../components/layout/layout'
import Tag from '../components/tag/tag'
import ArticleCard from '../components/article-card/article-card'

export const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  useEffect(() => {
    if (selectedLanguage === 'it') {
      navigate('/it/tags/')
    }
  }, [selectedLanguage])

  return (
    <Layout
      location='/tags'
      title={title}
      defaultLang='US'
      setSelectedLanguage={setSelectedLanguage}
      isIndex={true}
    >
      <SEO
        title={title}
        location='/tags'
        keywords={['blog', 'tags', 'page', 'technology'].concat(
          group.map((g) => g.fieldValue)
        )}
      />
      <div>
        <h1
          style={{
            fontFamily: `'Anton', sans-serif`,
            fontWeight: `bold`,
            color: `#FFFFFF`,
            letterSpacing: `3px`,
            textTransform: `uppercase`,
          }}
        >
          Tags
        </h1>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          {group.map((tag) => (
            <li
              key={tag.fieldValue}
              style={{
                listStyle: 'none',
                display: `flex`,
                flexWrap: `wrap`,
                flexDirection: `row`,
                justifyContent: `space-between`,
              }}
            >
              <Tag tag={tag.fieldValue} count={tag.totalCount}></Tag>

              {tag.edges.splice(0, 2).map((post) => (
                <ArticleCard
                  node={post.node}
                  key={post.node.fields.slug}
                  isIndex={true}
                ></ArticleCard>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { lang: { eq: null } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
        edges {
          node {
            frontmatter {
              cover_image
              description
              title
              tags
              date(formatString: "MMMM DD, YYYY")
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`
