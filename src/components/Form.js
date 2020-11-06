import React, { Component } from 'react';

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
		createMessage({ message, author, tags })
			.then(() => {
				this.setState({
					success: 'Message saved Successfully',
					error: '',
				});
			})
			.catch(err => {
				this.setState({ error: err.data.error, success: '', tag: '' });
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
		return (
			<div className='form'>
				<div className='input'>
					<label className='message-label'>New message</label>
					<input
						id='author'
						type='text'
						name='author'
						onChange={this.authorChanged}
						value={this.state.author}
						placeholder='Nick name'
					/>
					<textarea
						name='post'
						id='message'
						onChange={this.messageChanged}
						value={this.state.message}
						placeholder='Your message...'></textarea>
				</div>
				<div className='controls'>
					<label className='tags-label'>Add up to 3 tags</label>
					{this.state.tags.length ? (
						<div className='tags-wrapper'>
							{this.state.tags.map(tag => (
								<div
									key={tag}
									className='tag'
									onClick={() => this.removeTag(tag)}>
									<span className='remove'>Remove</span>
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
							value={this.state.tag}
							placeholder='New tag'
						/>
						<button className='tags-button' onClick={this.addTag}>
							Add
						</button>
					</div>
					<button
						type='submit'
						className='submit'
						onClick={this.submit}
						disabled={this.state.loading}>
						{this.state.loading ? 'Saving..' : 'Submit'}
					</button>
				</div>
				<div className='success'>{this.state.success}</div>
				<div className='error'>{this.state.error}</div>
			</div>
		);
	}
}
