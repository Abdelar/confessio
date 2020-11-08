import React from 'react';
import { Link } from 'react-router-dom';

import { toDate } from '../util/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Message.css';

export default function Message({ message }) {
	return (
		<div className='message'>
			<p className='message-body'>{message.body}</p>

			<div>
				{message.tags &&
					message.tags.map(tag => (
						<span key={tag} className='tag-span'>
							<Link className='tag-link' to={'/tag/' + tag}>
								{tag}
							</Link>
						</span>
					))}
			</div>
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
