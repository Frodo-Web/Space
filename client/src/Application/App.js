import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage/StartPage';
import Users from './Users/Users';
import Navbar from './components/Navbar'; 

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<StartPage />} />
					<Route path='users' element={<Users />} />
				</Routes>
				<Navbar />
			</BrowserRouter >
		</>
	)
};

export default App;
