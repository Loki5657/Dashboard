import React, { useEffect, useState } from 'react'
import SideBar from './shared/sidebar'
import LineChart from './shared/lineChart'

export const Dashboard = () => {

    const [state, setState] = useState();

    useEffect(() => {
        // fetch('http://localhost:3000/users')
        // .then((res) => res.json)
        // .then((data) => { setState(data) })
        fetch('http://localhost:3000/users').then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
            .then((data) => {
                setState(data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])
    console.log("state", state);
    return (

        <div className="modal-body row ">
            <div className="col-md-3 ">
                <SideBar />
            </div>
            <div className="col-md-6 main-container ">
                <h1 className='text-primary text-adjustment d-flex p-2 bd-highlight'>Welcome Back</h1>
                <div className=" container boarder  ">
                    <div className="row ">
                        <div className="col shadow-lg p-3 mb-5 bg-white rounded text-center">
                            <LineChart />
                        </div>
                        <div className="col shadow-lg p-3 mb-5 bg-white rounded text-center">
                            new registration
                        </div>
                    </div>
                </div>
                <div className=" container boarder  ">
                    <div className="row  ">
                        <div className="col shadow-lg p-3 mb-5 bg-white rounded text-center">
                            no of 
                        </div>
                        <div className="col shadow-lg p-3 mb-5 bg-white rounded text-center">
                           Locations
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
