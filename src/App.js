import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faPlus,
	faSpinner,
	faTrash,
	faClock,
	faThumbsUp,
	faQuoteLeft,
	faQuoteRight,
	faUser,
	faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';

import Home from './pages/home';
import About from './pages/about';
import Tag from './pages/tag';
import NotFound from './pages/notFound';
import Contact from './pages/contact';
import Navbar from './components/Navbar';

import './App.css';

library.add(
	faPlus,
	faSpinner,
	faTrash,
	faThumbsUp,
	faUser,
	faClock,
	faQuoteLeft,
	faQuoteRight,
	faAngleLeft
);

function App() {
	return (
		<Router basename='/confessio'>
			<Navbar />
			<main>
				<div className='page'>
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/about' exact component={About} />
						<Route path='/contact' exact component={Contact} />
						<Route path='/tag/:tag' exact component={Tag} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</main>
		</Router>
	);
}

export default App;
