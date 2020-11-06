import React from 'react';
import Form from '../components/Form';
import Intro from '../components/Intro';
import Messages from '../components/Messages';

export default function home() {
	return (
		<>
			<Intro />
			<Form />
			<Messages />
		</>
	);
}
