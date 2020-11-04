import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';
import Navbar from './components/Navbar';
import './App.css';

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path='/about' component={About} />
				<Route path='/' component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
