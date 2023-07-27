import React, { useEffect, useState } from 'react'
import { FetchWrapper } from './fetch-wrapper'

function ManufacturerForm() {
    const [name, setName] = useState('')

    const InventoryAPI = new FetchWrapper('http://localhost:8100/')

    // const fetchData = async () => {
    //     const manufacturerData = await InventAPI.get('api/locations/')
    //     setLocations(locationsData.locations)
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}

        data.name = name

        const newManufacturer = await InventoryAPI.post('api/manufacturers/', data)
        setName('')
    }

    // const handleFabricChange = (event) => {
    //     const value = event.target.value
    //     setFabric(value)
    // }

    // const handleStyleChange = (event) => {
    //     const value = event.target.value
    //     setStyle(value)
    // }

    // const handleColorChange = (event) => {
    //     const value = event.target.value
    //     setColor(value)
    // }

    // const handleImageChange = (event) => {
    //     const value = event.target.value
    //     setImage(value)
    // }

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
                            <label htmlFor="name">Manufacturer Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default ManufacturerForm
