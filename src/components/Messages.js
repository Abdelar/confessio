import React from 'react';

import Message from './Message';

import './Messages.css';

export default function Messages({ messages, loading, error }) {
	return (
		<div className='messages'>
			<h1 className='leading'>Messages</h1>
			{messages.length && !loading ? (
				<div className='cards'>
					{messages.map(message => (
						<Message key={message.id} message={message} />
					))}
				</div>
			) : !error ? (
				<div className='no-messages'>No messages!</div>
			) : (
				<div className='error-message'>{error}</div>
			)}
		</div>
	);
}
