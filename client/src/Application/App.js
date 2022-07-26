import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage/StartPage';
import Users from './Users/Users';
import Space from './Space/Space';
import Navbar from './components/Navbar'; 

const App = () => {
        console.log("App.js renders");
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<StartPage />} />
					<Route path='users' element={<Users />} />
					<Route path='space/*' element={<Space />} />
				</Routes>
				<Navbar />
			</BrowserRouter >
		</>
	)
};

export default App;
