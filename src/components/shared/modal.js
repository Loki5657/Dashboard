import React, { useEffect, useState } from 'react';
import SideBar from '../shared/sidebar';
import LineChart from '../shared/lineChart';
import Profile from '../../images/person.svg';
import { Col, Container, Modal, Row, Table } from 'react-bootstrap'
import Pagination from './pagination';
import { BarChart } from './barChart';
import femaleIcon from '../../images/male.svg'
import maleIcon from '../../images/female.svg'






const Modalcomponent = () => {
    const [state, setState] = useState();
    const [modal, setModal] = useState({
        modal: false,
        data: ''
    })
    const DataTable = ({ posts }) => {
        return (
            <Table className='table table-striped tablelist-group mb-4'>
                <tbody>
                    {posts?.map(post => (
                        <tr key={post.id} onClick={() => showModal(post)} >
                            <td>{state.gender === "male" ? <img src={maleIcon} alt="profile" /> : <img src={femaleIcon} alt="profile" />}</td>
                            <td>{post.username}</td>
                            <td>{post.location}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = state?.slice(indexOfFirstPost, indexOfLastPost);
    console.log('currentPosts', indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        let Token = localStorage.getItem('token')
        console.log(Token);
        fetch('http://ec2-52-66-43-154.ap-south-1.compute.amazonaws.com:8080/api/users', {
            method: "GET",
            headers: { "Authorization": `Bearer ${Token}` }
        }).then(res => res.json()).then((data) => setState(data));
    }, []);
    //show modal 
    const showModal = (index) => {
        console.log('index', index);
        setModal({ ...modal, modal: true, data: index })
    }
    //close modal
    const closeModal = () => {
        setModal({ ...modal, modal: false })

    }
    //gender filter
    const male = state && state.filter((element) => element.gender.toLowerCase() === "male")
    const female = state && state.filter((element) => element.gender.toLowerCase() === "female")
    const uniqueIds = [];
    const count = []
    if (state) {
        state.forEach(element => {
            count[element.location] = (count[element.location] || 0) + 1
        });
    }
    if (state) {
        var unique = state && state.filter(element => {
            const isDuplicate = uniqueIds.includes(element.location);
            if (!isDuplicate) {
                uniqueIds.push(element.location);
                return true
            }
            return false;
        })
    }
    return (
        <div >
            <Container className=''>
                <h1 className='text-primary relative '>Welcome Back</h1>
                <Row >
                    <SideBar />
                    <Col className="col-md-2  "></Col>
                    <Col className="col">
                        <div className=" ">
                            <div className=" shadow-lg p-3 mb-5 bg-white rounded ">
                                <h5>Over View</h5>
                                <LineChart />
                            </div>
                        </div>
                    </Col>
                    <Col className="col">
                        <div className="row ">
                            <div className=" shadow-lg p-3 mb-5 bg-white rounded text-center">
                                <BarChart state={state} male={male?.length} female={female?.length} />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className=" "></Col>
                    <Col className="col-4">
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
                                        <th> No.of Registrations </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        unique && unique.map((loc, index) => {
                                            let count = 0;
                                            state?.map((user) => {
                                                if (user.location === loc.location) {
                                                    count = count + 1
                                                }
                                            })
                                            return (
                                                <tr key={index}>
                                                    <td >{loc.location}</td><td></td>
                                                    <td >{count}</td>
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
                                <div><span className='txt-bld'>Address:</span> {modal.data?.location}</div>
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
                    <Col className="col-md-2  ">
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
            </Container >
        </div >
    )
}
export default Modalcomponent;