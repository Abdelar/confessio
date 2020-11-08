import React from 'react';
import { Link } from 'react-router-dom';

import { toDate } from '../util/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Message.css';

export default function Message({ message }) {
	return (
		<div className='message'>
			<p className='message-body'>{message.body}</p>
			{message.tags && (
				<div className='tags-section'>
					{message.tags.map(tag => (
						<Link key={tag} className='tag-link' to={'/tag/' + tag}>
							{tag}
						</Link>
					))}
				</div>
			)}
			<div>
				<p className='author'>
					<FontAwesomeIcon icon='user' className='author-icon' />
					{message.author || 'Anonymous'}
				</p>
				<p className='date'>
					<FontAwesomeIcon icon='clock' className='date-icon' />
					<span className='from-now'>
						{toDate(message.createdAt._seconds * 1000)}
					</span>
				</p>
			</div>
		</div>
	);
}
