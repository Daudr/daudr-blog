import React from "react"
import { Link } from "gatsby"

import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import { rhythm } from "../../utils/typography"
import kebabCase from "lodash/kebabCase"

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom: rhythm(1 / 2),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {
    margin: `2px`,
  },
  media: {
    height: 280,
  },
})

export const ArticleCard = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  const tags = node.frontmatter.tags || []
  const classes = useStyles()

  return (
    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={node.frontmatter.cover_image}
          title={title}
        />
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {tags.slice(0, 3).map(tag => {
              return (
                <Link
                  key={tag}
                  to={`/tags/${kebabCase(tag)}`}
                  style={{ boxShadow: `none` }}
                >
                  <Chip
                    size="small"
                    label={`#${tag}`}
                    className={classes.chip}
                    style={{
                      fontFamily: `'Anton', sans-serif`,
                      fontWeight: `bold`,
                      textTransform: `uppercase`,
                    }}
                    onClick={() => {}}
                  ></Chip>
                </Link>
              )
            })}
          </Typography>
          <Typography variant="h5" component="h2" data-cy="post-title">
            {title}
          </Typography>
          <Typography
            className={classes.pos}
            variant="subtitle2"
            component="p"
            color="textSecondary"
          >
            {node.frontmatter.date}
          </Typography>

          <Typography variant="body2" component="p">
            {node.frontmatter.description || node.excerpt}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ArticleCard
