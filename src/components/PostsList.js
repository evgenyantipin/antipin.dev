import React from "react"
// import PostsListCard from "./PostsListCard"
import { Link } from "gatsby"

const PostsListCard = ({ frontmatter, fields, excerpt }) => {
  const title = frontmatter.title || fields.slug

  return (
    <div>
      <div>
        <h2 className="card-title">{title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: frontmatter.description || excerpt,
          }}
        />
        <Link to={`/${fields.slug}/`} className="btn btn-primary">
          Read More &rarr;
        </Link>
      </div>
      <span className="text-muted">Posted on {frontmatter.date}</span>
    </div>
  )
}

const PostsList = ({ postEdges }) => {
  return postEdges.map(({ node }) => {
    return <PostsListCard key={node.fields.slug} {...node} />
  })
}

export default PostsList