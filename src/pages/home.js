import React, { Component } from 'react';
import Form from '../components/Form';
import Intro from '../components/Intro';
import { getMessages } from '../api/api';
import Messages from '../components/Messages';

export default class home extends Component {
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
				this.setState({ messages: res.data });
			})
			.catch(() => this.setState({ error: "Can't fetch data!" }))
			.finally(() => this.setState({ loading: false }));
	}

	setMessages = messages => {
		this.setState({ messages: messages });
	};
	pushNewMessage = message => {
		const updatedMessages = [message, ...this.state.messages];
		this.setState({ messages: updatedMessages });
	};

	render() {
		const { messages, loading, error } = this.state;
		return (
			<>
				<Intro />
				<Form pushNewMessage={this.pushNewMessage} />
				<Messages messages={messages} loading={loading} error={error} />
			</>
		);
	}
}
