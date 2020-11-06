import React, { Component } from 'react';
import { getMessages } from '../api/api';

import Message from './Message';

import './Messages.css';

export default class Messages extends Component {
	componentDidMount() {
		getMessages()
			.then(res => {
				console.log(res.data);
				this.setState({
					messages: res.data,
				});
			})
			.catch(err => console.log(err));
	}

	state = {
		messages: [],
	};
	render() {
		return (
			<div className='messages'>
				<h1 className='leading'>Messages</h1>
				{this.state.messages.length ? (
					<div className='cards'>
						{this.state.messages.map(message => (
							<Message key={message.id} message={message} />
						))}
					</div>
				) : (
					<div className='no-messages'>No messages</div>
				)}
			</div>
		);
	}
}
