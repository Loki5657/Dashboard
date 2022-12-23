import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import SideBar from '../shared/sidebar';
import Profile from '../../images/person.svg'
import csvDownload from 'json-to-csv-export'


const Users = (props) => {

    const [state, setState] = useState([])
    const [modal, setModal] = useState({
        modal: false,
        data: ''
    })
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

    const DataTable = ({ posts }) => {
        const dataToConvert = {
            data: state,
            filename: 'Number of people registered',
            delimiter: ',',
            headers: ['ID', "Name", "Address", "Gender", "Mobile-Number", "Email"]
        }
        
        return (

            <Table className='table table-striped tablelist-group mb-4 pe-5'>
                <tbody>
                    {state?.map(post => (
                        <tr key={post.id} onClick={() => showModal(post)} >
                            <td><img src={Profile} alt="profile" /></td>
                            <td>{post.username}</td>
                            <td>{post.location}</td>
                        </tr>
                    ))}
                    <tr>
                        <Button className='btn-primary' onClick={() => csvDownload(dataToConvert)}>Export</Button>
                    </tr>
                </tbody>
            </Table>
        );
    };


    return (
        <>
            <div className='main-container' >
                {/* <SideBar /> */}
                <Container className='container'>
                    <h3 className='text-primary relative' >Users</h3>
                    <DataTable />
                </Container>
            </div>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modal.modal}
            >
                <Modal.Header>
                    {
                        modal.data?.username
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
        </>

    )

}

export default Users;