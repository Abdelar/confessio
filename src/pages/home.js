import React, { Component } from 'react';
import Form from '../components/Form';
import Intro from '../components/Intro';
import { getMessages } from '../api/api';
import Messages from '../components/Messages';
import LoadMore from '../components/LoadMore';

export default class home extends Component {
	state = {
		messages: [],
		loading: true,
		error: '',
		more: true,
	};
	componentDidMount() {
		this.setState({
			loading: true,
		});
		getMessages()
			.then(res => {
				this.setState({ messages: res.data });
			})
			.catch(err => this.setState({ error: err.message }))
			.finally(() => this.setState({ loading: false }));
	}

	pushNewMessage = message => {
		const updatedMessages = [message, ...this.state.messages];
		this.setState({ messages: updatedMessages });
	};

	loadMore = () => {
		const perPage = 12;
		this.setState({
			loading: true,
		});
		const { messages } = this.state;
		getMessages(messages.length > 0 ? messages[messages.length - 1].id : null)
			.then(res => {
				const updatedMessages = [...messages, ...res.data];
				console.log(res.data.length === perPage);
				this.setState({
					messages: updatedMessages,
					more: res.data.length === perPage,
				});
			})
			.catch(err => this.setState({ error: err.message }))
			.finally(() => this.setState({ loading: false }));
	};

	render() {
		const { messages, loading, error, more } = this.state;
		return (
			<>
				<Intro />
				<Form pushNewMessage={this.pushNewMessage} />
				<Messages messages={messages} loading={loading} error={error} />
				{more && !loading && messages.length >= 12 && (
					<LoadMore loadMore={this.loadMore} />
				)}
			</>
		);
	}
}
