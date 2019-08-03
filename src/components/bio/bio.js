import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { rhythm } from "../../utils/typography"
import Paper from "@material-ui/core/Paper"

export const Bio = () => {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata

        return (
          <Paper
            style={{
              display: `flex`,
              marginTop: rhythm(1.25),
              marginBottom: rhythm(1 / 2),
              padding: rhythm(1 / 2),
            }}
          >
            <Img
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <div>
              Written by <strong>{author}</strong> a freelance web developer
              that works in Italy and in the world.
              <div style={{ marginTop: rhythm(1 / 2) }}></div>
              You can also find him on
              <br />
              {social.map((social, i) => {
                let fixed

                switch (i) {
                  case 0: {
                    fixed = data.facebook.childImageSharp.fixed
                    break
                  }
                  case 1: {
                    fixed = data.linkedin.childImageSharp.fixed
                    break
                  }
                  case 2: {
                    fixed = data.github.childImageSharp.fixed
                    break
                  }
                  case 3: {
                    fixed = data.instagram.childImageSharp.fixed
                    break
                  }
                  case 4: {
                    fixed = data.twitter.childImageSharp.fixed
                    break
                  }
                  default: {
                    break
                  }
                }

                return (
                  <a
                    key={`social-${social.social}`}
                    href={social.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{
                      boxShadow: `none`,
                      color: `currentColor`,
                    }}
                  >
                    <Img
                      fixed={fixed}
                      alt={`${author} ${social.social} link`}
                      style={{
                        marginRight: rhythm(1 / 2),
                        marginBottom: 0,
                        minWidth: 30,
                        maxWidth: `50px`,
                        maxHeigth: `50px`
                      }}
                    />
                  </a>
                )
              })}
            </div>
          </Paper>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    facebook: file(absolutePath: { regex: "/facebook.png/" }) {
      childImageSharp {
        fixed(width: 30, height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    twitter: file(absolutePath: { regex: "/twitter.png/" }) {
      childImageSharp {
        fixed(width: 30, height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    github: file(absolutePath: { regex: "/github-logo.png/" }) {
      childImageSharp {
        fixed(width: 30, height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    instagram: file(absolutePath: { regex: "/instagram.png/" }) {
      childImageSharp {
        fixed(width: 30, height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    linkedin: file(absolutePath: { regex: "/linkedin.png/" }) {
      childImageSharp {
        fixed(width: 30, height: 30) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          social
          link
        }
      }
    }
  }
`

export default Bio
