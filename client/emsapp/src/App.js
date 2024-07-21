import logo from './logo.svg';
import Home from './Home';
import Update from './Update';
import Create from './Create';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/create" element={<Create/>} />
			<Route path="/update" element={<Update/>} />
			<Route path="*" element={<Home/>} />
		</Routes>
	</BrowserRouter>
	);
}

export default App;
