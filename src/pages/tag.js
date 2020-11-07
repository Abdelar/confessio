import React, { Component } from 'react';

import { getMessagesByTag } from '../api/api';
import Messages from '../components/Messages';

export default class Tag extends Component {
	state = {
		taggedMessages: [],
	};
	componentDidMount() {
		getMessagesByTag(this.props.match.params.tag).then(res =>
			this.setState({ taggedMessages: res.data })
		);
	}

	render() {
		const {
			match: {
				params: { tag },
			},
		} = this.props;
		const { taggedMessages } = this.state;
		return (
			<>
				<h1>All posts with tag: {tag}</h1>
				<Messages messages={taggedMessages} setMessages={this.setMessages} />
			</>
		);
	}
}
