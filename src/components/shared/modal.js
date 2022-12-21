import React, { useEffect, useState } from 'react';
import SideBar from '../shared/sidebar';
import LineChart from '../shared/lineChart';
import Profile from '../../images/person.svg';
import Arrow from '../../images/arrow-right.svg';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'



const Modalcomponent = () => {

    const [state, setState] = useState();
    const [modal, setModal] = useState({
        modal: false,
        data: ''
    })


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

    const showModal = (index) => {
        setModal({ ...modal, modal: true, data: index })
    }
    const closeModal = () => {
        setModal({ ...modal, modal: false })
    }

    console.log(state && state[modal.data]);
    return (
        <div>

            <SideBar />


            <Container>
                <Row >
                    <h1 className='text-primary'>Welcome Back</h1>
                    <Col className="col-md-3"></Col>
                    <Col className="col-md-4 ">
                                <div className="row ">
                                    <div className=" shadow-lg p-3 mb-5 bg-white rounded text-center">
                                        <LineChart />
                                    </div>
                                </div>
                    </Col>
                    <Col className="col-md-4  ">
                        <div className=" shadow-lg p-3 mb-5 bg-white rounded ">
                            <div className='border-bottom p-1 mb-1 bg-light '>
                                Today
                            </div>
                            <div>
                                <h6 className='text-primary text-adjustment p-2 bd-highlight'>New Registration</h6>
                                <div>
                                    <center>1.New Registration for the day</center>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-md-3"></Col>
                    <Col className="col-md-4">
                        <div className="row ">
                            <div className="col shadow-lg p-3 mb-5 bg-white rounded ">
                                <div className='border-bottom p-1 mb-1 bg-light'>
                                    Total No Of People Registered
                                    <span className='ml-50'>{state && state.length}</span>
                                </div>
                                <table className="table table-hover">
                                    <tbody>
                                        {
                                            state && state.map((each, index) => {
                                                return (
                                                    <tr key={index} onClick={() => showModal(index)}>
                                                        <td><img src={Profile} alt="profile" /></td>
                                                        <td>{each.name}</td>
                                                        <td>{each.location}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                    {/* <tfoot>
                                        <tr>
                                            <td>
                                                <img src={Arrow} />
                                            </td>
                                        </tr>
                                    </tfoot> */}
                                </table>
                            </div>
                        </div>
                    </Col>
                    <Col className="col-md-4">
                        <div className="col shadow-lg p-3 mb-5 bg-white rounded ">
                            <div className=' border-bottom p-1 mb-1 bg-light'>
                                locations
                            </div>
                        </div>
                        <Modal
                            size="md"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={modal.modal}
                        >
                            <Modal.Header>
                                {
                                    state && state[modal.data]?.name
                                }
                                <img src={Profile} alt="profile" />
                            </Modal.Header>
                            <Modal.Body >
                                <div>Address:{state && state[modal.data]?.location}</div>
                                <hr />
                                <div>Mobile No:0000000000</div>
                                <hr />
                                <div>Email:{state && state[modal.data]?.location}</div>
                            </Modal.Body>
                            <Modal.Footer onClick={closeModal}>
                                close
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}
export default Modalcomponent;