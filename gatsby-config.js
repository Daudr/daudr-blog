let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: process.env.BLOG_NAME,
    author: `Michele Da Rin Fioretto`,
    description: `Dauðr Blog: tecnologia alla portata di tutti`,
    siteUrl: process.env.BASE_URL,
    twitterUserName: process.env.TWITTER_USERNAME,
    social: [
      {
        social: `Facebook`,
        link: process.env.FACEBOOK_LINK,
      },
      {
        social: `LinkedIn`,
        link: process.env.LINKEDIN_LINK,
      },
      {
        social: `Github`,
        link: process.env.GITHUB_LINK,
      },
      {
        social: `Instagram`,
        link: process.env.IG_LINK,
      },
      {
        social: `Twitter`,
        link: process.env.TWITTER_LINK,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-external-links`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dauðr Blog`,
        short_name: `Dauðr Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `content/assets/daudr-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-amp`,
      options: {
        analytics: {
          type: 'gtag',
          dataCredentials: 'include',
          config: {
            vars: {
              gtag_id: process.env.ANALYTICS_ID,
              config: {
                [process.env.ANALYTICS_ID]: {
                  page_location: '{{pathname}}',
                },
              },
            },
          },
        },
        canonicalBaseUrl: process.env.BASE_URL,
        components: ['amp-ad', 'amp-form'],
        excludedPaths: ['/404*', '/', '/tag*'],
        pathIdentifier: 'amp/',
        relAmpHtmlPattern: '{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}',
        relCanonicalPattern: `{{canonicalBaseUrl}}{{pathname}}`,
        useAmpClientIdApi: true,
      },
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        setup: () => ({
          custom_namespaces: {
            media: 'http://search.yahoo.com/mrss/',
          },
        }),
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'content:encoded': edge.node.html },
                    {
                      'media:content': {
                        _attr: {
                          // replace width with height for newsletter
                          url: edge.node.frontmatter.cover_image.replace(
                            /w=[^&]*/,
                            'h=250'
                          ),
                          medium: 'image',
                        },
                      },
                    },
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        cover_image
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Daudr Blog's RSS",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.DISQUS_SHORTNAME,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    'gatsby-plugin-material-ui',
    {
      resolve: `gatsby-plugin-web-monetization`,
      options: {
        paymentPointer: `$ilp.uphold.com/7xprUjR3FKDx`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Fira+Code`],
        display: 'swap',
      },
    },
    'gatsby-plugin-loadable-components-ssr',
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     printRejected: false,
    //     develop: true,
    //     ignore: ['prismjs-theme-light.css']
    //   }
    // }
  ],
}
