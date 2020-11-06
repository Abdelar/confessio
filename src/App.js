import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faPlus,
	faSpinner,
	faTrash,
	faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Navbar from './components/Navbar';

import './App.css';

library.add(faPlus, faSpinner, faTrash, faThumbsUp);

function App() {
	return (
		<Router>
			<Navbar />
			<main>
				<div className='page'>
					<Switch>
						<Route path='/about' component={About} />
						<Route path='/contact' component={Contact} />
						<Route path='/' component={Home} />
					</Switch>
				</div>
			</main>
		</Router>
	);
}

export default App;
