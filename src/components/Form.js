import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
	state = {
		message: '',
		tags: [],
		tag: '',
		error: '',
	};

	tagChanged = event => {
		this.setState({ tag: event.target.value });
	};
	messageChanged = event => {
		this.setState({ message: event.target.value });
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

	render() {
		return (
			<div className='form'>
				<div className='input'>
					<label htmlFor='message'>New message</label>
					<textarea
						name='post'
						id='message'
						onChange={this.messageChanged}
						value={this.state.message}
						placeholder='Your message...'></textarea>
				</div>
				<div className='controls'>
					<label htmlFor='post'>Add up to 3 tags</label>
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
					<button type='submit' className='submit'>
						Submit
					</button>
				</div>
				<div></div>
				<div className='error'>{this.state.error}</div>
			</div>
		);
	}
}
