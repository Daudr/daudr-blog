import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// Components
import { graphql, navigate } from 'gatsby'
import SEO from '../../components/seo/seo'
import Layout from '../../components/layout/layout'
import Tag from '../../components/tag/tag'

export const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('it')

  useEffect(() => {
    if (selectedLanguage === 'en') {
      navigate('/tags/')
    }
  }, [selectedLanguage])

  return (
    <Layout
      location='/it/tags'
      title={title}
      defaultLang='IT'
      setSelectedLanguage={setSelectedLanguage}
    >
      <SEO
        title={title}
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
              style={{ listStyle: 'none', maxWidth: '50%' }}
            >
              <Tag
                tag={tag.fieldValue}
                count={tag.totalCount}
                isIT={true}
              ></Tag>
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
      filter: { frontmatter: { lang: { eq: "it" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
