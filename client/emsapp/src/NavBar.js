import { Link } from "react-router-dom";
import './css/NavBar.css';

export default function NavBar() {
	return(
		<>
		<center>
		<div className="nav">
			<Link to="/">Home</Link>
			<Link to="/create">Create</Link>
		</div>
		</center>
		</>
	);
}