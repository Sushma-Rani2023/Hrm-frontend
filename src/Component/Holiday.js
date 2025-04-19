import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import dev_url from "../config";

const HolidaysList = () => {
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get(`${dev_url}/attendence/holidayList?company_id='6b969e80f3ff11e9afc7acde48001122'`,
            {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            }
        )
            .then(response => {
                console.log('reponse isss',response.data.data)
                setHolidays(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching holidays:", error);
            });
    }, []);
console.log('holidayee',holidays)
    return (
        <div>
            <h2>Holiday List</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {holidays.map(holiday => (
                        <tr key={holiday.id}>
                        <td>{holiday.id}</td>
                            <td>{holiday.alias}</td>
                            <td>{holiday.start_date}</td>
                            <td>{holiday.duration_day}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default HolidaysList;
