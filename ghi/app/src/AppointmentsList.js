import { useEffect, useState } from "react";
import { FetchWrapper } from "./fetch-wrapper";

function AppointmentsList() {
    const [allAppointments, setAllAppointments] = useState([])
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)
    const [vipStatuses, setVIPStatuses] = useState({})


    const ServiceAPI = new FetchWrapper('http://localhost:8080/')
    const InventoryAPI = new FetchWrapper('http://localhost:8100/')




    const fetchData = async () => {
        const appointmentsData = await ServiceAPI.get('api/appointments/')
        setAllAppointments(appointmentsData.appointments)

        const updatedStatuses = {}
        for (const appointment of appointmentsData.appointments) {
            const vipStatus = await isVIP(appointment.vin)
            updatedStatuses[appointment.vin] = vipStatus
        }
        setVIPStatuses(updatedStatuses)
    }

    useEffect(() => {
        fetchData()
    }, [refreshKey])

    useEffect(() => {
        setFilteredAppointments(
            allAppointments.filter(
                appointment =>
                appointment.status !== "canceled" && appointment.status !== "finished"
                )
            );
    }, [allAppointments]);




    const isVIP = async (vin) => {
        try {
            await InventoryAPI.get(`api/automobiles/${vin}/`);
            return "Yes";
        } catch (error) {
            return "No";
        }
    };


    const cancelAppointment = async (id) => {
        try {
            await ServiceAPI.put(`api/appointments/${id}/cancel/`);
            setRefreshKey((oldKey) => oldKey + 1);
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };

    const finishAppointment = async (id) => {
        try {
            await ServiceAPI.put(`api/appointments/${id}/finish/`);
            setRefreshKey((oldKey) => oldKey + 1);
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };





    return (
    <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>ID</th>
                    <th>Is VIP?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Cancel/Finish</th>
                </tr>
            </thead>
            <tbody>
                {filteredAppointments.map((filteredAppointment) => (
                    <tr key={ filteredAppointment.id }>
                        <td>{ filteredAppointment.vin }</td>
                        <td>{ filteredAppointment.id }</td>
                        <td>
                            {vipStatuses[filteredAppointment.vin]}
                        </td>
                        <td>{ filteredAppointment.customer }</td>
                        <td>{ filteredAppointment.date_time }</td>
                        <td>{ filteredAppointment.date_time }</td>
                        <td>
                            { filteredAppointment.technician.first_name +
                            ' ' +
                            filteredAppointment.technician.last_name }
                        </td>
                        <td>{ filteredAppointment.reason }</td>
                        <td>{ filteredAppointment.status }</td>
                        <td>
                            <div onClick={() => cancelAppointment(filteredAppointment.id)}><button className="btn btn-danger">Cancel</button></div>
                            <div onClick={() => finishAppointment(filteredAppointment.id)}><button className="btn btn-success">Finish</button></div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    </>
    );
}

export default AppointmentsList
