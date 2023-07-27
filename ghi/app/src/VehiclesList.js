import { useEffect, useState } from "react";
import { FetchWrapper } from "./fetch-wrapper";

function VehiclesList() {
    const [allVehicles, setAllVehicles] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    const InventoryAPI = new FetchWrapper('http://localhost:8100/')

    const fetchData = async () => {
        const vehiclesData = await InventoryAPI.get('api/models/')
        setAllVehicles(vehiclesData.models)
    }

    useEffect(() => {
        fetchData()
    }, [refreshKey])

    const deleteVehicle = id => {
        InventoryAPI.delete(`api/models/${id}`).then(() => {
            setRefreshKey(oldKey => oldKey + 1)
        }).catch(error => {
            console.error('Error deleting vehicle model:', error)
        })
    };


    return (
    <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Picture</th>
                    <th>Manufacturer</th>
                    <th>Delete?</th>
                </tr>
            </thead>
            <tbody>
                {allVehicles.map(vehicles => {
                    return (
                        <tr key={vehicles.id}>
                            <td>{ vehicles.name }</td>
                            <td>
                                <img src={ vehicles.picture_url } alt="new" />
                            </td>
                            <td>{ vehicles.manufacturer.name }</td>
                            <td onClick={() => deleteVehicle(vehicles.id)}><button className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
    );
}

export default VehiclesList
