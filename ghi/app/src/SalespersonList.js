import { useEffect, useState } from "react";
import { FetchWrapper } from "./fetch-wrapper";

function SalespeopleList() {
    const [allSalespeople, setAllSalespeople] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    const SalespersonAPI = new FetchWrapper('http://localhost:8090/')

    const fetchData = async () => {
        const salespersonData = await SalespersonAPI.get('api/salespeople/')
        setAllSalespeople(salespersonData.salespeople)
    }

    useEffect(() => {
        fetchData()
    }, [refreshKey])

    const deleteSalesperson = id => {
        SalespersonAPI.delete(`api/salespeople/${id}`).then(() => {
            setRefreshKey(oldKey => oldKey + 1)
        }).catch(error => {
            console.error('Error deleting salesperson:', error)
        })
    };


    return (
    <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {allSalespeople.map(salesperson => {
                    return (
                        <tr key={salesperson.id}>
                            <td>{ salesperson.employee_id }</td>
                            <td>{ salesperson.first_name }</td>
                            <td>{ salesperson.last_name }</td>
                            <td onClick={() => deleteSalesperson(salesperson.id)}><button className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
    );
}

export default SalespeopleList
