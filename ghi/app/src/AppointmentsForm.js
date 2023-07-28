import React, { useEffect, useState } from 'react'
import { FetchWrapper } from './fetch-wrapper'

function AppointmentsForm() {
    const [vin, setVIN] = useState('')
    const [customer, setCustomer] = useState('')
    const [date, setDateTime] = useState('')
    const [technicians, setTechnicians] = useState([])
    const [technician, setTechnician] = useState('')
    const [reason, setReason] = useState('')

    const ServiceAPI = new FetchWrapper('http://localhost:8100/')

    const fetchData = async () => {
        const techniciansData = await ServiceAPI.get('api/technicians/')
        setTechnicians(techniciansData.technicians)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}

        data.vin = vin
        data.customer = customer
        data.date_time = date_time
        data.technician = technician
        data.reason = reason

        const newAppointment = await ServiceAPI.post('api/appointments/', data)
        setVIN('')
        setCustomer('')
        setDateTime('')
        setTechnician('')
        setReason('')
    }

    const handleVINChange = (event) => {
        const value = event.target.value
        setVIN(value)
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value
        setCustomer(value)
    }

    const handleDateTimeChange = (event) => {
        const value = event.target.value
        setDateTime(value)
    }

    const handleTechnicianChange = (event) => {
        const value = event.target.value
        setTechnician(value)
    }

    const handleReasonChange = (event) => {
        const value = event.target.value
        setReason(value)
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
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleYearChange} placeholder="Year" required type="text" value={year} name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleVINChange} placeholder="VIN" required type="text" value={vin} name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleModelChange} required value={model_id} name="model" id="model" className="form-select">
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

export default AppointmentsForm
