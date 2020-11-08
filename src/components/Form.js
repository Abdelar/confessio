import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { createMessage } from '../api/api';
import './Form.css';

export default class Form extends Component {
	state = {
		loading: false,
		message: '',
		author: '',
		tags: [],
		tag: '',
		error: '',
		success: '',
	};

	authorChanged = event => {
		this.setState({ author: event.target.value, success: '', error: '' });
	};

	tagChanged = event => {
		this.setState({ tag: event.target.value, success: '', error: '' });
	};
	messageChanged = event => {
		this.setState({ message: event.target.value, success: '', error: '' });
	};

	addTag = () => {
		const tag = this.state.tag.slice().trim().toLowerCase();
		if (this.state.tags.length >= 3) {
			this.setState({
				error: 'Too many tags!',
			});
		} else if (tag === '') {
			this.setState({
				error: 'Empty tag not allowed!',
			});
		} else if (tag.length >= 17) {
			this.setState({
				error: 'Tag too long!',
			});
		} else if (this.state.tags.includes(tag)) {
			this.setState({
				error: 'Tag already added!',
			});
		} else {
			this.setState(prevState => ({
				tags: [...prevState.tags, tag],
				tag: '',
				error: '',
			}));
		}
	};

	removeTag = tagToRemove => {
		const updatedTags = this.state.tags.filter(tag => tag !== tagToRemove);
		this.setState({ tags: updatedTags });
	};

	submit = () => {
		const { message, author, tags } = this.state;

		this.setState({ success: '' });

		if (message === '') {
			return this.setState({
				error: 'Please add a message before submitting!',
			});
		} else if (message.length > 1000) {
			return this.setState({
				error: 'The message is too long!',
			});
		} else if (author.length > 100) {
			return this.setState({
				error: 'The author name is too long!',
			});
		}
		this.setState({ loading: true });
		const post = {
			body: message,
			author,
			tags,
		};
		createMessage(post)
			.then(doc => {
				this.setState({
					success: 'Message saved Successfully',
					error: '',
				});
				this.props.pushNewMessage(doc.data);
			})
			.catch(err => {
				this.setState({
					error: "An error occurred, we couldn't save this message.",
					success: '',
					tag: '',
				});
			})
			.finally(() => {
				this.setState({
					message: '',
					author: '',
					tags: [],
					loading: false,
					tag: '',
				});
			});
	};

	render() {
		const { tags, tag, loading, error, message, author, success } = this.state;
		return (
			<div className='form'>
				<div className='input'>
					<label className='message-label'>Tell the world about you</label>
					<input
						id='author'
						type='text'
						name='author'
						onChange={this.authorChanged}
						autoComplete='off'
						value={author}
						placeholder='Nick name'
					/>
					<textarea
						name='post'
						id='message'
						onChange={this.messageChanged}
						value={message}
						autoComplete='off'
						placeholder='Your message...'></textarea>
				</div>
				<div className='controls'>
					<label className='tags-label'>Add up to 3 tags</label>
					{tags.length ? (
						<div className='tags-wrapper'>
							{tags.map(tag => (
								<div
									key={tag}
									className='tag'
									onClick={() => this.removeTag(tag)}>
									<span title='Remove this tag' className='remove'>
										<FontAwesomeIcon icon='trash' />
									</span>
									{tag}
								</div>
							))}
						</div>
					) : null}
					<div className='tags'>
						<input
							id='tag-input'
							type='text'
							name='post'
							onChange={this.tagChanged}
							value={tag}
							autoComplete='off'
							placeholder='New tag'
						/>
						<button
							title='Add tag'
							className='tags-button'
							onClick={this.addTag}>
							<FontAwesomeIcon icon='plus' />
						</button>
					</div>
					<button
						type='submit'
						className='submit'
						title='Submit'
						onClick={this.submit}
						disabled={loading}>
						{loading ? (
							<FontAwesomeIcon icon='spinner' className='loader' />
						) : (
							'Submit'
						)}
					</button>
				</div>
				<div className='success'>
					{success} {success && <FontAwesomeIcon icon='thumbs-up' />}
				</div>
				<div className='error'>{error}</div>
			</div>
		);
	}
}
