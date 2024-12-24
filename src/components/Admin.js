import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../style/admin.css'
function Admin() {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const res = await axios.get('http://localhost:1000/scores');
            setList(res.data)
        }
        fetchData();
    }, [])

    return (
        <div>

            <h1 className='name' >User Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Total Score </th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((l) => (
                        <tr key={l.id}>
                            <td>{l.name}</td>
                            <td>{l.score}</td>
                            <td>9</td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </div>
    )
}

export default Admin
