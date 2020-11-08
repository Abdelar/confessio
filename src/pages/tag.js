import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { getMessagesByTag } from '../api/api';
import Messages from '../components/Messages';
import './tag.css';

const Tag = ({ match }) => {
	const [taggedMessages, setTaggedMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	useEffect(() => {
		setLoading(true);
		getMessagesByTag(match.params.tag)
			.then(res => {
				setTaggedMessages(res.data);
			})
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, [match.params.tag]);

	return (
		<>
			<h1>
				{taggedMessages.length} messages tagged with{' '}
				<FontAwesomeIcon icon='quote-left' size='xs' /> {match.params.tag}{' '}
				<FontAwesomeIcon icon='quote-right' size='xs' />
			</h1>
			<Messages messages={taggedMessages} error={error} loading={loading} />
			<div>
				<Link to='/' className='back-home'>
					<FontAwesomeIcon icon='angle-left' /> Home
				</Link>
			</div>
		</>
	);
};

export default Tag;
