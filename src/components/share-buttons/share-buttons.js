import React from 'react'
import {
	RedditShareButton,
	RedditIcon,
	TwitterShareButton,
	TwitterIcon,
	FacebookShareButton,
	FacebookIcon,
	LinkedinShareButton,
	LinkedinIcon,
	TelegramShareButton,
	TelegramIcon,
	EmailShareButton,
	EmailIcon,
} from 'react-share'

import './share-buttons.css'

export const ShareButtons = ({ postNode, url }) => {
	const iconSize = 30
	const post = postNode.frontmatter

	return (
		<div className='social-links'>
			<p>Share this post</p>
			<br />
			<RedditShareButton url={url} title={post.title}>
				<RedditIcon round size={iconSize} />
			</RedditShareButton>
			<TwitterShareButton url={url} title={post.title}>
				<TwitterIcon round size={iconSize} />
			</TwitterShareButton>
			<FacebookShareButton url={url} quote={postNode.excerpt}>
				<FacebookIcon round size={iconSize} />
			</FacebookShareButton>
			<LinkedinShareButton
				url={url}
				title={post.title}
				description={postNode.excerpt}
			>
				<LinkedinIcon round size={iconSize} />
			</LinkedinShareButton>
			<TelegramShareButton url={url}>
				<TelegramIcon round size={iconSize} />
			</TelegramShareButton>
			<EmailShareButton url={url}>
				<EmailIcon round size={iconSize} />
			</EmailShareButton>
		</div>
	)
}

export default ShareButtons
