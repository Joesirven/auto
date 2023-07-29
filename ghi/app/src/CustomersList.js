import { useEffect, useState } from "react";
import { FetchWrapper } from "./fetch-wrapper";

function CustomersList() {
    const [allCustomers, setAllCustomers] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    const CustomerAPI = new FetchWrapper('http://localhost:8090/')

    const fetchData = async () => {
        const customersData = await CustomerAPI.get('api/customers/')
        setAllCustomers(customersData.customers)
    }

    useEffect(() => {
        fetchData()
    }, [refreshKey])

    const deleteCustomer = id => {
        CustomerAPI.delete(`api/customers/${id}`).then(() => {
            setRefreshKey(oldKey => oldKey + 1)
        }).catch(error => {
            console.error('Error deleting customer:', error)
        })
    };

    return (
    <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Image</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {allCustomers.map(customer => {
                    return (
                        <tr key={ customer.id}>
                            <td>{ customer.first_name }</td>
                            <td>{ customer.last_name }</td>
                            <td>{ customer.phone_number }</td>
                            <td>{ customer.address }</td>
                            <td onClick={() => deleteCustomer(customer.id)}><button className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
    );
}

export default CustomersList
