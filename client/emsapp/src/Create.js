import NavBar from './NavBar';
import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Create.css';
import './css/NavBar.css';

export default function Create() {

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

    const hEmpId = (event) => { setEmpId(event.target.value); };
    const hName = (event) => { setName(event.target.value); };
    const hChoice = (event) => { setChoice(event.target.value); };
    const hPosition = (event) => { setPosition(event.target.value); };
    const hSalary = (event) => { setSalary(event.target.value); };
    const hDate = (event) => { setDate(event.target.value); };

    const save = (event) => {
        event.preventDefault();

        let url = "https://server-9-79t4.onrender.com/save";
        let data = { empid, name, choice, position, salary, date };
        axios.post(url, data)
            .then(res => {
                if (res.data.insertedId === empid) {
                    toast.success("Employee Registered Successfully");
                    setMsg("Employee Registered!");
                    setEmpId("");
                    setName("");
                    setChoice("");
                    setPosition("");
                    setSalary("");
                    setDate("");
                    rEmpId.current.focus();
                } else {
                    setMsg(empid + " already exists");
			toast.error(empid + " already exists")
                    setEmpId("");
                    rEmpId.current.focus();
                }
            })
            .catch(error => {
                console.error("There was an error!", error);
                toast.error("There was an error while registering the employee");
            });
    };

    return (
        <>
            <ToastContainer />
            <NavBar />
            <center>
                <h1>Employee Management System</h1>
                <h3>Create Page</h3>
                <form onSubmit={save}>
                    <label>Employee ID:</label> &nbsp; &nbsp;
                    <input type="number" placeholder="Enter Employee ID" value={empid} ref={rEmpId} onChange={hEmpId} /> <br /> <br />

                    <label>Name:</label> &nbsp; &nbsp;
                    <input type="text" placeholder="Enter Employee Name" value={name} ref={rName} onChange={hName} /> <br /> <br />

                    <label>Select Employee Department:</label> &nbsp; &nbsp;
                    <input type="radio" name="c" value="HR" checked={choice === "HR"} ref={rChoice} onChange={hChoice} /> HR
                    <input type="radio" name="c" value="Finance" checked={choice === "Finance"} ref={rChoice} onChange={hChoice} /> Finance
                    <input type="radio" name="c" value="IT" checked={choice === "IT"} ref={rChoice} onChange={hChoice} /> IT
                    <input type="radio" name="c" value="Sales" checked={choice === "Sales"} ref={rChoice} onChange={hChoice} /> Sales
                    <input type="radio" name="c" value="Marketing" checked={choice === "Marketing"} ref={rChoice} onChange={hChoice} /> Marketing <br /> <br />

                    <label>Position:</label> &nbsp; &nbsp;
                    <input type="text" placeholder="Enter Employee Position" value={position} ref={rPosition} onChange={hPosition} /> <br /> <br />

                    <label>Salary:</label> &nbsp; &nbsp;
                    <input type="number" placeholder="Enter Employee Salary" value={salary} ref={rSalary} onChange={hSalary} /> <br /> <br />

                    <label>Date of Joining:</label> &nbsp; &nbsp;
                    <input type="date" value={date} ref={rDate} onChange={hDate} /> <br /> <br />

                    <input type="submit" />
                </form>
                <h2>{msg}</h2>
            </center>
        </>
    );
}
