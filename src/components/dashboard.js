import React, { useEffect, useState } from 'react';
import SideBar from './shared/sidebar';
import LineChart from './shared/lineChart';
import Profile from '../images/person.svg';
import Pagination from './shared/pagination';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';


const Dashboard = () => {
    const DataTable = ({ posts }) => {
        return (
            <Table className='table table-striped tablelist-group mb-4'>
                <tbody>
                    {posts?.map(post => (
                        <tr key={post.id} onClick={() => showModal(post.id)} >
                            <td><img src={Profile} alt="profile" /></td>
                            <td>{post.username}</td>
                            <td>{post.location}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };


    const [state, setState] = useState();
    const [modal, setModal] = useState({
        modal: false,
        data: ''
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = state?.slice(indexOfFirstPost, indexOfLastPost);
    console.log('currentPosts', indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        fetch('http://ec2-52-66-43-154.ap-south-1.compute.amazonaws.com:8080/api/auth/users')
            .then((res) => res.json())
            .then((data) => { setState(data) })
    }, []);
    //show modal
    const showModal = (index) => {
        setModal({ ...modal, modal: true, data: index })
    }
    //close modal
    const closeModal = () => {
        setModal({ ...modal, modal: false })
    }


    const count = []

    if (state) {
        state.forEach(element => {
            count[element.area] = (count[element.area] || 0) + 1

        });

    }
    const uniqueIds = [];
    if (state) {
        var unique = state.filter(element => {
            const isDuplicate = uniqueIds.includes(element.area);
            if (!isDuplicate) {
                uniqueIds.push(element.area);
                return true
            }
            return false;
        })
    }
    return (
        <div className='main-container' >
            <SideBar />
            <Container className=''>
                <h3 className='text-primary relative '>Welcome Back</h3>
                <Row >
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
                                    <span className='ml-45'>{state && state.length}</span>
                                </div>
                                <DataTable posts={currentPosts} />
                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={state?.length}
                                    paginate={paginate}
                                />
                                <div>

                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="col-md-4">
                        <div className="col shadow-lg p-3 mb-5 bg-white rounded ">
                            <div className=' border-bottom p-1 mb-1 bg-light'>
                                locations
                            </div>
                            <Table>
                                <thead className='text-center'>
                                    <tr>
                                        <th> City </th>
                                        <th> Area </th>
                                        <th> Street </th>
                                        <th> No.of Registrations </th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">

                                    {
                                        unique && unique.map((users, index) => {
                                            return (

                                                <tr key={index}>
                                                    <td>{users.location}</td>
                                                    <td>{users.area}</td>
                                                    <td>{users.street}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
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
                                <div><span className='txt-bld'>Address:</span> {state && state[modal.data]?.location}</div>
                                <hr />
                                <div><span className='txt-bld'>Mobile No:</span>{state && state[modal.data]?.mobile}</div>
                                <hr />
                                <div><span className='txt-bld'>Email:</span>{state && state[modal.data]?.email}</div>
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
export default Dashboard;
