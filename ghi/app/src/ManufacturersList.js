import { useEffect, useState } from "react";
import { FetchWrapper } from "./fetch-wrapper";

function ManufacturersList() {
    const [allManufacturers, setAllManufacturers] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    const ManufacturerAPI = new FetchWrapper('http://localhost:8100/')

    const fetchData = async () => {
        const manufacturerData = await ManufacturerAPI.get('api/manufacturers/')
        setAllManufacturers(manufacturerData.manufacturers)
    }

    useEffect(() => {
        fetchData()
    }, [refreshKey])

    const deleteManufacturer = id => {
        ManufacturerAPI.delete(`api/manufacturers/${id}`).then(() => {
            setRefreshKey(oldKey => oldKey + 1)
        }).catch(error => {
            console.error('Error deleting manufacturer:', error)
        })
    };


    return (
    <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Delete?</th>
                </tr>
            </thead>
            <tbody>
                {allManufacturers.map(manufacturers => {
                    return (
                        <tr key={manufacturers.id}>
                            <td>{ manufacturers.name }</td>
                            <td onClick={() => deleteManufacturer(manufacturers.id)}><button className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
    );
}

export default ManufacturersList
