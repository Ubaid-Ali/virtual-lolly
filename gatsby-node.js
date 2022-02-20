const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { response } = await graphql(`
    query {
      lollies {
        fillLollyTop
        fillLollyMiddle
        fillLollyBottom
      }
    }
  `)

  // response.data.allContentfulBlogPost.edges.forEach(edge => {
  //     createPage({
  //         path: `/blog/${edge.node.slug}`,
  //         component: path.resolve("./src/templates/blog-post.js"),
  //         context: {
  //             slug: edge.node.slug,
  //         },
  //     })
  // })
  // data ?
  console.log(
    `response.data ================================== `,
    response.data
  )
  //   : console.log(
  //       `response.data ================================== FAILED TO DATA IN GATSBY-NODE.JS`
  //     )
}
