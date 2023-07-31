import React, { useEffect, useState } from 'react'
import { FetchWrapper } from './fetch-wrapper'

function CustomersForm() {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phone_number, setPhoneNumber] = useState('')


    const CustomerAPI = new FetchWrapper('http://localhost:8090/')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}

        data.first_name = first_name
        data.last_name = last_name
        data.address = address
        data.phone_number = phone_number

        const newCustomer = await CustomerAPI.post('api/customers/', data)
        console.log(newCustomer)
        setFirstName('')
        setLastName('')
        setAddress('')
        setPhoneNumber('')
    }

    const handleFirstNameChange = (event) => {
        console.log(event)
        const value = event.target.value
        setFirstName(value)
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)
    }

    const handleAddressChange = (event) => {
        const value = event.target.value
        setAddress(value)
    }

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value
        setPhoneNumber(value)
    }


    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Customer</h1>
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
                            <input onChange={handleAddressChange} placeholder="Address" required type="text" value={address} name="address" id="address" className="form-control" />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePhoneNumberChange} placeholder="Phone Number" required type="text" value={phone_number} name="phone_number" id="phone_number" className="form-control" />
                            <label htmlFor="address">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default CustomersForm
