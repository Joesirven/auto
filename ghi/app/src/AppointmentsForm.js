import React, { useEffect, useState } from 'react'
import { FetchWrapper } from './fetch-wrapper'
import DateTimePicker from 'react-datetime-picker'

function AppointmentsForm() {
    const [vin, setVIN] = useState('')
    const [customer, setCustomer] = useState('')
    const [date_time, setDateTime] = useState('')
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
                    <h1>Create an service appoint</h1>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleVINChange} placeholder="VIN" required type="text" value={vin} name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCustomerChange} placeholder="Customer" required type="text" value={customer} name="year" id="year" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <DateTimePicker onChange={handleDateTimeChange} value={date_time} required type="text" className="form-select" />
                            <label htmlFor="date_time">Date and Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleTechnicianChange} placeholder="VIN" required type="text" value={vin} name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleReasonChange} placeholder="VIN" required type="text" value={vin} name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleTechnicianChange} required value={technician} name="technician" id="technician" className="form-select">
                                <option value="technician">Choose a Technicians</option>
                                {technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technicians.employee_id}>
                                            {technician.name}
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
