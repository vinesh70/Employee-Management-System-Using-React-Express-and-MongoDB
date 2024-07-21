import NavBar from './NavBar';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import './css/Update.css';
import './css/NavBar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Update() {
	const rEmpId = useRef(); 	
	const rName = useRef();
	const rChoice = useRef();
	const rPosition = useRef();
	const rSalary = useRef();
	const rDate = useRef();

	const [empid, setEmpId] = useState("");
	const [name, setName] = useState("");
	const [choice, setChoice] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [date, setDate] = useState("");
	const [msg, setMsg] = useState("");

	const loc = useLocation();
	useEffect(() => {
		if (loc.state) {
			setEmpId(loc.state.empid || "");
			setName(loc.state.name || "");
			setChoice(loc.state.choice || "");
			setPosition(loc.state.position || "");
			setSalary(loc.state.salary || "");
			setDate(loc.state.date ? loc.state.date.split('/').reverse().join('-') : ""); // Convert dd/mm/yyyy to yyyy-mm-dd
		}
	}, [loc.state]);

	const hEmpId = (event) => { setEmpId(event.target.value); };
	const hName = (event) => { setName(event.target.value); };
	const hChoice = (event) => { setChoice(event.target.value); };
	const hPosition = (event) => { setPosition(event.target.value); };
	const hSalary = (event) => { setSalary(event.target.value); };
	const hDate = (event) => { setDate(event.target.value); };

	const save = (event) => {
		event.preventDefault();
		let url = "https://server-9-79t4.onrender.com/update";
		let data = { empid, name, choice, position, salary, date };
		axios.put(url, data)
		.then(res => {
			toast.success("Employee Updated!");
		})
		.catch(err => toast.error("There was an issue while updating the employee"));
	};

	return (
		<>
		<center>
		<ToastContainer />
		<NavBar />
		<h1>Update Page</h1>
		<form onSubmit={save}>
			<label>Employee ID:</label> &nbsp; &nbsp;
			<input type="number" placeholder="Enter Employee ID" disabled={true} value={empid} ref={rEmpId} onChange={hEmpId} /> <br/> <br/>

			<label>Name:</label> &nbsp; &nbsp;
			<input type="text" placeholder="Enter Employee Name" value={name} ref={rName} onChange={hName} /> <br/> <br/>

			<label>Select Employee Department:</label> &nbsp; &nbsp;
			<input type="radio" name="c" value="HR" checked={choice === "HR"} ref={rChoice} onChange={hChoice} /> HR
			<input type="radio" name="c" value="Finance" checked={choice === "Finance"} ref={rChoice} onChange={hChoice} /> Finance
			<input type="radio" name="c" value="IT" checked={choice === "IT"} ref={rChoice} onChange={hChoice} /> IT
			<input type="radio" name="c" value="Sales" checked={choice === "Sales"} ref={rChoice} onChange={hChoice} /> Sales
			<input type="radio" name="c" value="Marketing" checked={choice === "Marketing"} ref={rChoice} onChange={hChoice} /> Marketing   			<br/> <br/>

			<label>Position:</label> &nbsp; &nbsp;
			<input type="text" placeholder="Enter Employee Position" value={position} ref={rPosition} onChange={hPosition} /> <br/> <br/>

			<label>Salary:</label> &nbsp; &nbsp;
			<input type="number" placeholder="Enter Employee Salary" value={salary} ref={rSalary} onChange={hSalary} /> <br/> <br/>

			<label>Date of Joining:</label> &nbsp; &nbsp;
			<input type="date" value={date} ref={rDate} onChange={hDate} /> <br/> <br/>

			<input type="submit" />
		</form>
		<h2>{msg}</h2>
		</center>
		</>
	);
}
