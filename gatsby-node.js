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

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next
        },
      })

      createPage({
        path: `${post.node.fields.slug}amp/`,
        component: ampBlogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next
        },
      })

      // Tag pages:
      let tags = []
      // Iterate through each post, putting all found tags into `tags`
      each(posts, edge => {
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

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@templates": path.resolve(__dirname, "src/templates"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@mocks": path.resolve(__dirname, "__mocks__"),
      },
    },
  })
}
