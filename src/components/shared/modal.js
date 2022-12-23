import React, { useEffect, useState } from 'react';
import SideBar from '../shared/sidebar';
import LineChart from '../shared/lineChart';
import Profile from '../../images/person.svg';
import Menu from '../../images/menu.svg';
import { Col, Container, Dropdown, Modal, Row, Spinner, Table } from 'react-bootstrap'
import Pagination from './pagination';
import { PeiChart } from './peiChart';
import femaleIcon from '../../images/male.svg'
import maleIcon from '../../images/female.svg'


const Modalcomponent = () => {
    const [display, setDisplay] = useState({ show: false })
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
                            <td>{post.gender.toLowerCase() === "male" ? "Male" : "Female"}</td>
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
            var lowerLocation = element.location.toLowerCase()
            const isDuplicate = uniqueIds.includes(lowerLocation);
            if (!isDuplicate) {
                uniqueIds.push(element.location.toLowerCase());
                return true
            }
            return false;
        })
    }
    let uniqueDates = [];
    //date filter
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
    //month filter
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
    let currentMonth = `${year}-${month}`.split('').join()
    let currentYear = `${year}-`.split('').join()
    // console.log("currentDate", currentDate);
    var Jan = 0, Feb = 0, Mar = 0, Apr = 0, May = 0, Jun = 0, Jul = 0, Aug = 0, Sep = 0, Oct = 0, Nov = 0, Dec = 0

    dates?.map((createdDate) => {
        let monthFilter = createdDate.createdOn?.toLocaleString().split('').splice(0, 7).join()
        let date = createdDate.createdOn?.toLocaleString().split('').splice(0, 10).join()
        if (date === currentDate) {
            countOfRegistedUsers = countOfRegistedUsers + 1
        }
        switch (monthFilter) {
            case (currentYear + `,1,2`):
                Dec++
                break;
            case (currentYear + `,1,1`):
                Nov++
                break;
            case (currentYear + `,1,0`):
                Oct++
                break;
            case (currentYear + `,0,9`):
                Sep++
                break;
            case (currentYear + `,0,8`):
                Aug++
                break;
            case (currentYear + `,0,7`):
                Jul++
                break;
            case (currentYear + `,0,6`):
                Jun++
                break;
            case (currentYear + `,0,5`):
                May++
                break;
            case (currentYear + `,0,4`):
                Apr++
                break;
            case (currentYear + `,0,3`):
                Mar++
                break;
            case (currentYear + `,0,2`):
                Feb++
                break;
            case (currentYear + `,0,1`):
                Jan++
                break;
        }


    })


    const handleshow = (open) => {
        if (open == false) {
            setDisplay({ ...display, show: true })

        } else {
            setDisplay({ ...display, show: false })

        }
    }
    return (
        <div >
            {/* {loading ? <Spinner animation="border" variant="primary" /> : */}
            <Container className=''>
                <h1 className='text-primary relative '>Welcome EyeBox</h1>
                <Row ><img src={Menu} className="img_size" onClick={() => handleshow(display?.show)} />
                    {display?.show ?
                        <SideBar /> : ""
                    }
                    {/* <SideBar state={state}/> */}
                    {/* <SideBar state={state} /> */}
                    <Col className="col-md-2  "></Col>
                    <Col className="col-md-5">
                        <div className=" ">
                            <div className=" shadow-lg p-3 mb-5 bg-white rounded ">
                                <h5>Eye View</h5>

                                <LineChart year={year} Jan={Jan} Feb={Feb} Mar={Mar} Apr={Apr} May={May} Jun={Jun} Jul={Jul} Aug={Aug} Sep={Sep} Oct={Oct} Nov={Nov} Dec={Dec} />
                            </div>
                        </div>
                    </Col>
                    <Col className="col-md-3">

                        <div className="row flx ">
                            <div className=" shadow-lg p-3 mb-5 bg-white rounded text-center">
                                <h5>Total No. Of People : {state?.length}</h5>
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
                                    <b>Total No Of People Registered</b>
                                    <span className='ml-50'><b className='txt-bld '>{state && state.length}</b></span>
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
                                <b>Locations</b>
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
                                    <div><span className='txt-bld'>Name:</span> {modal.data?.username}</div>

                                }
                                <img src={Profile} alt="profile" />
                            </Modal.Header>
                            <Modal.Body >
                                <div><span className='txt-bld'>Gender:</span> {modal.data?.gender}</div>
                                <hr />
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
                                <b> Today</b>
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