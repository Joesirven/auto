import React, { useEffect, useState } from 'react'
import { FetchWrapper } from './fetch-wrapper'

function AutomobilesForm() {
    const [model_id, setModel] = useState('')
    const [color, setColor] = useState('')
    const [year, setYear] = useState('')
    const [vin, setVIN] = useState('')
    const [models, setModels] = useState([])

    const InventoryAPI = new FetchWrapper('http://localhost:8100/')

    const fetchData = async () => {
        const modelsData = await InventoryAPI.get('api/models/')
        setModels(modelsData.models)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}

        data.color = color
        data.year = year
        data.vin = vin
        data.model_id = model_id

        const newAutomobile = await InventoryAPI.post('api/automobiles/', data)
        setColor('')
        setModel('')
        setYear('')
        setVIN('')
    }

    const handleColorChange = (event) => {
        const value = event.target.value
        setColor(value)
    }

    const handleModelChange = (event) => {
        const value = event.target.value
        setModel(value)
    }

    const handleYearChange = (event) => {
        const value = event.target.value
        setYear(value))
    }

    const handleVINChange = (event) => {
        const value = event.target.value
        setVIN(value))
    }


    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add an automobile to inventor</h1>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} placeholder="Color" required type="text" value={color} name="color" id="color" className="form-control" />
                            <label htmlFor="name">Vehicle Model</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} placeholder="Picture URL" required type="url" value={picture_url} name="picture" id="picture_url" className="form-control" />
                            <label htmlFor="name">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handlemodelChange} required value={model_id} name="model" id="model" className="form-select">
                                <option value="">Choose a model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
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

export default AutomobilesForm
