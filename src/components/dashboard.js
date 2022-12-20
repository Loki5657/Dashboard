import React, { useEffect, useState } from 'react'
import SideBar from './shared/sidebar'
import LineChart from './shared/lineChart'

export const Dashboard = () => {

    const [state, setState] = useState();

    useEffect(() => {
        //api : http://ec2-52-66-43-154.ap-south-1.compute.amazonaws.com:8080/api/users
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
                        <div className="col shadow-lg p-3 mb-5 bg-white rounded ">
                            <div className='border-bottom p-1 mb-1 bg-light '>
                                Today
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" container boarder  ">
                    <div className="row ">
                        <div className="col shadow-lg p-3 mb-5 bg-white rounded ">
                            <div className='border-bottom p-1 mb-1 bg-light'>

                                on of
                            </div>
                        </div>
                        <div className="col shadow-lg p-3 mb-5 bg-white rounded ">
                            <div className=' border-bottom p-1 mb-1 bg-light'>
                                locations
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
