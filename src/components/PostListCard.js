import React from "react"
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

export default PostsListCard
