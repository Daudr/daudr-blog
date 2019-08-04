import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export const SEO = ({
  description,
  lang,
  meta,
  keywords,
  title,
  postSEO = false,
  post = null,
  slug = null,
  coverImage = null,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
            author
            twitterUserName
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  let image = coverImage || `https://blog.daudr.me/daudr-icon.png`

  const mainUrl = `https://www.daudr.me`

  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: `https://blog.daudr.me/`,
      name: site.siteMetadata.title,
      alternateName: site.siteMetadata.title,
      contentLocation: {
        "@type": "Place",
        name: "Bologna, Italia",
      },
      accountablePerson: {
        "@type": "Person",
        name: site.siteMetadata.author,
        url: mainUrl,
      },
      author: {
        "@type": "Person",
        name: site.siteMetadata.author,
        url: mainUrl,
      },
      creator: {
        "@type": "Person",
        name: site.siteMetadata.author,
        url: mainUrl,
      },
      publisher: {
        "@type": "Organization",
        name: site.siteMetadata.author,
        url: mainUrl,
        logo: {
          "@type": "ImageObject",
          url: "https://blog.daudr.me/daudr-icon.png",
          width: "400",
          height: "55",
        },
      },
    },
  ]

  if (postSEO) {
    image = post.frontmatter.cover_image
    schemaOrgJSONLD.push({
      "@type": "BlogPosting",
      image: image,
      url: `${site.siteMetadata.siteUrl}${slug}`,
      headline: post.frontmatter.title,
      alternativeHeadline: post.frontmatter.title,
      dateCreated: post.frontmatter.date,
      datePublished: post.frontmatter.date,
      mainEntityOfPage: "True",
      keywords: post.frontmatter.keywords,
      articleBody: post.html,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: `${metaDescription}`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitterUserName,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `og:image`,
          content: image,
        },
        {
          name: `image`,
          content: image
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    >
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  coverImage: PropTypes.string
}

export default SEO
