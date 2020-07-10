import React from "react"
import { Link, graphql } from "gatsby"
import format from "date-fns/format"
import { ru } from "date-fns/locale"

import Bio from "components/bio"
import Layout from "components/layout"
import SEO from "components/seo"
import { rhythm } from "utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  // console.log(uniq(posts.map(p => p.node.fields.category)))
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              {/* <small>{node.frontmatter.date}</small> */}

              <time dateTime={node.frontmatter.date}>
                {format(new Date(node.frontmatter.date), "d MMMM, yyyy", {
                  locale: ru,
                })}
              </time>
            </header>
            <section>
              {node.fields.category && (
                <div>
                  <div>
                    Категория:{" "}
                    <Link to={`/category/${node.fields.category}`}>
                      {node.fields.category}
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          fields {
            category
          }
        }
      }
    }
  }
`
