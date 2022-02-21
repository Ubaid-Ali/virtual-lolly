const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query myQuery{
      AllLollies {
        lollies {
          fillLollyTop
          fillLollyMiddle
          fillLollyBottom
          recipientName
          message
          sender
          lollyPath
        }
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
  console.log(`response ================================== `, data)
  //   : console.log(
  //       `response.data ================================== FAILED TO DATA IN GATSBY-NODE.JS`
  //     )
}
