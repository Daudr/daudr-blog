const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { each, get, uniq, kebabCase } = require(`lodash`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post/blog-post.js`)
  const ampBlogPost = path.resolve(
    `./src/templates/blog-post-amp/blog-post.amp.js`
  )
  const tagTemplate = path.resolve(`./src/templates/tags/tags.js`)
  const italianTagTemplate = path.resolve(`./src/templates/tags-it/tags-it.js`)

  const indexTemplate = path.resolve(`./src/pages/index.js`)
  const italianIndexTemplate = path.resolve(`./src/pages/it/index.js`)

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
                id
                lang
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    const postsPerPage = 6

    const englishPosts = posts.filter(
      post => post.node.frontmatter.lang === null
    )

    const englishNumPages = Math.ceil(englishPosts.length / postsPerPage);
  
    Array.from({ length: englishNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/page/${i + 1}`,
        component: indexTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: englishNumPages,
          currentPage: i + 1,
        },
      })
    })

    const italianPosts = posts.filter(
      post => post.node.frontmatter.lang === "it"
    )

    const italianNumPages = Math.ceil(italianPosts.length / postsPerPage);
  
    Array.from({ length: italianNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/it/blog` : `/it/pagina/${i + 1}`,
        component: italianIndexTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: italianNumPages,
          currentPage: i + 1,
        },
      })
    })

    englishPosts.forEach((post, index) => {
      const previous =
        index === englishPosts.length - 1 ? null : englishPosts[index + 1].node
      const next = index === 0 ? null : englishPosts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })

      createPage({
        path: `${post.node.fields.slug}amp/`,
        component: ampBlogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })

      // Tag pages:
      let tags = []
      // Iterate through each post, putting all found tags into `tags`
      each(englishPosts, edge => {
        if (get(edge, "node.frontmatter.tags")) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })
      // Eliminate duplicate tags
      tags = uniq(tags)

      // Make tag pages
      tags.forEach(tag => {
        createPage({
          path: `/tags/${kebabCase(tag)}/`,
          component: tagTemplate,
          context: {
            tag,
          },
        })
      })
    })

    italianPosts.forEach((post, index) => {
      const previous =
        index === italianPosts.length - 1 ? null : italianPosts[index + 1].node
      const next = index === 0 ? null : italianPosts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })

      createPage({
        path: `${post.node.fields.slug}amp/`,
        component: ampBlogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })

      // Tag pages:
      let tags = []
      // Iterate through each post, putting all found tags into `tags`
      each(italianPosts, edge => {
        if (get(edge, "node.frontmatter.tags")) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })
      // Eliminate duplicate tags
      tags = uniq(tags)

      // Make italian tag pages
      tags.forEach(tag => {
        createPage({
          path: `/it/tags/${kebabCase(tag)}/`,
          component: italianTagTemplate,
          context: {
            tag,
          },
        })
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//   // Check if the page is a localized 404
//   if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
//     const oldPage = { ...page }
//     // Get the language code from the path, and match all paths
//     // starting with this code (apart from other valid paths)
//     const langCode = page.path.split(`/`)[1]
//     page.matchPath = `/${langCode}/*`
//     // Recreate the modified page
//     deletePage(oldPage)
//     createPage(page)
//   }
// }
