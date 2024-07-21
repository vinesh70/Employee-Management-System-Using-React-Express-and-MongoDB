import NavBar from './NavBar';
import { useState, useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import deleteicon from './Img Icons/delete.ico';
import updateicon from './Img Icons/update.ico';
import './css/Home.css';
import './css/NavBar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let url = "https://server-9-79t4.onrender.com/get";
        toast.promise(
            axios.get(url)
            .then(res => {
                setInfo(res.data);
                setLoading(false);
            })
            .catch(err => {
                toast.error("Issue: " + err);
                setLoading(false);
            }), 
            {
                pending: 'Loading the server...',
                success: 'Data fetched successfully!',
                error: 'Error fetching data'
            }
        );
    }, []);

    const delStu = (empid) => {
        let url = "https://server-9-79t4.onrender.com/delete";
        toast.promise(
            axios.delete(url, { data: { empid } })
            .then(res => {
                toast.success("Record Deleted");
                setInfo(info.filter(item => item._id !== empid));
            })
            .catch(err => toast.error("Issue: " + err)),
            {
                pending: 'Deleting the record...',
                success: 'Record deleted successfully!',
                error: 'Error deleting record'
            }
        );
    };

    const nav = useNavigate();

    const upStu = (empid, name, choice, position, salary, date) => {
        nav("/update", { state: { empid, name, choice, position, salary, date } });
    };

    return (
        <>
        <ToastContainer />
        <NavBar />
        <center>
        <h1>Employee Management System</h1>
        <h3>Home Page</h3>
            <table border="5">
                <thead>
                    <tr>
                        <th>Emp Id</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>DOJ</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((e) => (
                    <tr key={e._id}>
                        <td>{e._id}</td>
                        <td>{e.name}</td>
                        <td>{e.choice}</td>
                        <td>{e.position}</td>
                        <td>{e.salary}</td>
                        <td>{e.date}</td>
                        <td>
                            <button onClick={() => { if (window.confirm('Are you sure?')) delStu(e._id) }}> 
                            <img src={deleteicon} alt="Delete" style={{width: '20px', height: '20px'}} />
                            </button>
                        </td>
                        <td>
                            <button onClick={() => upStu(e._id, e.name, e.choice, e.position, e.salary, e.date)}>
                            <img src={updateicon} alt="Update" style={{ width: '20px', height: '20px' }} />
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        
        </center>
        </>
    );
}
