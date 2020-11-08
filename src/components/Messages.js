import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Message from './Message';

import './Messages.css';

export default function Messages({ messages, loading, error, isTagPage }) {
	return (
		<div className='messages'>
			{!isTagPage && <h1 className='leading'>Messages</h1>}
			{messages.length > 0 ? (
				<div className='cards'>
					{messages.map(message => (
						<Message key={message.id} message={message} />
					))}
				</div>
			) : loading ? (
				<div className='loading-message'>
					<FontAwesomeIcon icon='spinner' className='loader' />
				</div>
			) : error ? (
				<div className='error-message'>{error}</div>
			) : (
				<div className='no-messages'>No messages!</div>
			)}
		</div>
	);
}
