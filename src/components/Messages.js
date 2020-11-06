import React, { Component } from 'react';
import { getMessages } from '../api/api';

import Message from './Message';

import './Messages.css';

export default class Messages extends Component {
	state = {
		messages: [],
		loading: true,
		error: '',
	};
	componentDidMount() {
		this.setState({
			loading: true,
		});
		getMessages()
			.then(res => {
				console.log(res.data);
				this.setState({
					messages: res.data,
				});
			})
			.catch(() => this.setState({ error: "Can't fetch data!" }))
			.finally(() => this.setState({ loading: false }));
	}

	render() {
		const { loading, error, messages } = this.state;
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
}
