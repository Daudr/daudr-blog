import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'gatsby'

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
		padding: `2px`,
		minWidth: `30px`,
	},
}))

export const Pagination = ({ isIT = false, currentPage = 0, numPages = 0 }) => {
	const classes = useStyles()

	return (
		<div>
			{Array.from({ length: numPages }).map((_, i) => {
				const page = i + 1

				let linkTo = `/`

				console.log(`${isIT} && ${page}`)

				if (isIT && i === 0) {
					linkTo = `/it/`
				} else if (isIT) {
					linkTo = `/it/pagina/${page}`
				} else if (!isIT && i === 0) {
					linkTo = `/`
				} else {
					linkTo = `/page/${page}`
				}

				return (
					<Link to={linkTo} style={{ color: `transparent` }}>
						<Button
							variant='outlined'
							color={currentPage === page ? `primary` : ``}
							className={classes.button}
						>
							{page}
						</Button>
					</Link>
				)
			})}
		</div>
	)
}
