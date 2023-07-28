import React, { useEffect, useState } from 'react'
import { FetchWrapper } from './fetch-wrapper'

function SalespersonForm() {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [employee_id, setEmployee] = useState('')

    const SalespersonAPI = new FetchWrapper('http://localhost:8090/')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}

        data.first_name = first_name
        data.last_name = last_name
        data.employee_id = employee_id

        const newSalesperson = await SalespersonAPI.post('api/salespeople/', data)
        setFirstName('')
        setLastName('')
        setEmployee('')
    }

    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value)
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)
    }

    const handleEmployeeChange = (event) => {
        const value = event.target.value
        setEmployee(value)
    }


    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} placeholder="First Name" required type="text" value={first_name} name="first_name" id="first_name" className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} placeholder="Last Name" required type="text" value={last_name} name="last_name" id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmployeeChange} placeholder="Employee ID" required type="text" value={employee_id} name="employee_id" id="employee_id" className="form-control" />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default SalespersonForm
