import React, { useEffect, useState } from 'react'
import { FetchWrapper } from './fetch-wrapper'

function VehiclesForm() {
    const [name, setName] = useState('')
    const [manufacturer_id, setManufacturer] = useState('')
    const [picture_url, setPictureUrl] = useState('')
    const [manufacturers, setManufacturers] = useState([])

    const InventoryAPI = new FetchWrapper('http://localhost:8100/')

    const fetchData = async () => {
        const manufacturersData = await InventoryAPI.get('api/manufacturers/')
        setManufacturers(manufacturersData.manufacturers)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}

        data.manufacturer_id = manufacturer_id
        data.name = name
        data.picture_url = picture_url

        const newVehicle = await InventoryAPI.post('api/models/', data)
        setName('')
        setManufacturer('')
        setPictureUrl('')
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value
        setPictureUrl(value)
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value
        setManufacturer(value)
    }

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }


    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name" required type="text" value={name} name="name" id="name" className="form-control" />
                            <label htmlFor="name">Vehicle Model</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} placeholder="Picture URL" required type="url" value={picture_url} name="picture" id="picture_url" className="form-control" />
                            <label htmlFor="name">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleManufacturerChange} required value={manufacturer_id} name="manufacturer" id="manufacturer" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default VehiclesForm
