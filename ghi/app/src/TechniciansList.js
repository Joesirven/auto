import { useEffect, useState } from "react";
import { FetchWrapper } from "./fetch-wrapper";

function TechniciansList() {
    const [allTechnicians, setAllTechnicians] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    const ServiceAPI = new FetchWrapper('http://localhost:8080/')

    const fetchData = async () => {
        const techniciansData = await ServiceAPI.get('api/technicians/')
        setAllTechnicians(techniciansData.technicians)
    }

    useEffect(() => {
        fetchData()
    }, [refreshKey])


    return (
    <>
    <h1>Technicians</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {allTechnicians.map(technician => {
                    return (
                        <tr key={ technician.id }>
                            <td>{ technician.employee_id }</td>
                            <td>{ technician.first_name }</td>
                            <td>{ technician.last_name }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
    );
}

export default TechniciansList
