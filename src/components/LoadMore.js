import React from 'react';

import './LoadMore.css';

export default function LoadMore({ loadMore }) {
	return (
		<div className='load-more'>
			<button onClick={loadMore}>More</button>
		</div>
	);
}
