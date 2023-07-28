import { useEffect, useState } from "react";
import { FetchWrapper } from "./fetch-wrapper";

function TechniciansList() {
    const [allAutomobiles, setAllAutomobiles] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)

    const InventoryAPI = new FetchWrapper('http://localhost:8100/')

    const fetchData = async () => {
        const automobilesData = await InventoryAPI.get('api/automobiles/')
        setAllAutomobiles(automobilesData.autos)
    }

    useEffect(() => {
        fetchData()
    }, [refreshKey])


    // const soldText = automobile.sold ? 'Yes' : 'No';

    // const deleteAutomobiles = id => {
    //     InventoryAPI.delete(`api/Automobiles/${id}`).then(() => {
    //         setRefreshKey(oldKey => oldKey + 1)
    //     }).catch(error => {
    //         console.error('Error deleting automobile:', error)
    //     })
    // };


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
                {allAutomobiles.map(automobile => {
                    return (
                        <tr key={ automobile.id}>
                            <td>{ automobile.vin }</td>
                            <td>{ automobile.color }</td>
                            <td>{ automobile.year }</td>
                            <td>{ automobile.model.name }</td>
                            <td>{ automobile.model.manufacturer.name }</td>
                            <td>
                                <img src={ automobile.model.picture_url } alt="new" />
                            </td>
                            <td>{ automobile.sold ? 'Yes' : 'No' }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
    );
}

export default TechniciansList
