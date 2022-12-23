import React, { useEffect, useState } from 'react';
import SideBar from '../shared/sidebar';
import LineChart from '../shared/lineChart';
import Profile from '../../images/person.svg';
import { Col, Container, Dropdown, Modal, Row, Spinner, Table } from 'react-bootstrap'
import Pagination from './pagination';
import { PeiChart } from './peiChart';
import femaleIcon from '../../images/male.svg'
import maleIcon from '../../images/female.svg'


const Modalcomponent = () => {
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState();
    const [modal, setModal] = useState({
        modal: false,
        data: '',
        date: ''
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

        fetch('http://ec2-52-66-43-154.ap-south-1.compute.amazonaws.com:8080/api/users', {
            method: "GET",
            headers: { "Authorization": `Bearer ${Token}` }
        }).then(res => res.json()).then((data) => setState(data));


    }, []);
    //show modal 
    const showModal = (index) => {
        setModal({ ...modal, modal: true, data: index })
    }
    //close modal
    const closeModal = () => {
        setModal({ ...modal, modal: false })

    }
    //gender filter
    const male = state && state.filter((element) => element.gender.toLowerCase() === "m" || "male")
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
    let uniqueDates = [];

    if (state) {
        var dates = state && state.filter(element => {
            const isDuplicate = uniqueIds.includes(element?.createdOn);
            if (!isDuplicate) {
                uniqueDates.push(element.createdOn);
                return true
            }
            return false;
        })
    }
    let countOfRegistedUsers = 0;
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    let currentDate = `${year}-${month}-${day}`.split('').join()
    // console.log("currentDate", currentDate);
    dates?.map((createdDate, index) => {
        let date = createdDate.createdOn?.toLocaleString().split('').splice(0, 10).join()

        if (date === currentDate) {
            countOfRegistedUsers = countOfRegistedUsers + 1
        }
    })
   

    console.log("date", modal.date);
    return (
        <div >
            {/* {loading ? <Spinner animation="border" variant="primary" /> : */}
            <Container className=''>
                <h1 className='text-primary relative '>Welcome EyeBox</h1>
                <Row >
                    <SideBar state={state} />
                    <Col className="col-md-2  "></Col>
                    <Col className="col-md-5">
                        <div className=" ">
                            <div className=" shadow-lg p-3 mb-5 bg-white rounded ">
                                <h5>Eye View</h5>
                                
                                <LineChart />
                            </div>
                        </div>
                    </Col>
                    <Col className="col-md-3">

                        <div className="row flx ">
                            <div className=" shadow-lg p-3 mb-5 bg-white rounded text-center">
                                <h5>Total NO. Of People : {state?.length}</h5>
                                <PeiChart state={state} male={male?.length} female={female?.length} />
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
                    <Col className="col-md-3.">
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
                                    modal.data?.name
                                }
                                <img src={Profile} alt="profile" />
                            </Modal.Header>
                            <Modal.Body >
                                <div><span className='txt-bld'>Address:</span> {modal.data?.location}</div>
                                <hr />
                                <div><span className='txt-bld'>Mobile No:</span>{modal.data?.mobile}</div>
                                <hr />
                                <div><span className='txt-bld'>Email:</span>{modal.data?.email}</div>
                            </Modal.Body>
                            <Modal.Footer onClick={closeModal}>
                                close
                            </Modal.Footer>
                        </Modal>
                    </Col>
                    <Col className="col-md-  ">
                        <div className=" shadow-lg p-3 mb-5 bg-white rounded ">
                            <div className='border-bottom p-1 mb-1 bg-light '>
                                Today
                            </div>
                            <div>
                                <h6 className='text-primary text-adjustment p-2 bd-highlight'>New Registration</h6>
                                <div>
                                    <center><span className='txt-bld'>{countOfRegistedUsers}</span>New Registration for the day</center>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
            {/* } */}
        </div >
    )
}
export default Modalcomponent;