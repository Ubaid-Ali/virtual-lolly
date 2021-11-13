const path = require("path")
// import path from "path"

exports.createPages = async ({ graphql, actions }) => {
    // const { createPage } = actions
    const response = await graphql(`
    query myQuery {
      allAuthors {
        name
      }
    }
  `)

    console.log(`response ================================== `, response)
    // response.data.allContentfulBlogPost.edges.forEach(edge => {
    //     createPage({
    //         path: `/blog/${edge.node.slug}`,
    //         component: path.resolve("./src/templates/blog-post.js"),
    //         context: {
    //             slug: edge.node.slug,
    //         },
    //     })
    // })
}
