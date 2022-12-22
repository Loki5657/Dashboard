

import React, { useState } from "react";
import { Button, Table } from "react-bootstrap"
import "../styles/dashboard.css"

const SideBar = (props) => {
    const DataTable = ({ posts }) => {
        return (
            <Table className='table table-striped tablelist-group mb-4'>
                <tbody>
                    {posts?.map(post => (
                        <tr key={post.id} >
                            <td>{post.username}</td>
                        </tr>
                    ))}
                    <tr><Button onClick={handleClose} className="m-4">Close</Button>
                        {/* <Button>Export</Button> */}
                        </tr>
                </tbody>
            </Table>
            
        );

    };
    const [display, setDisplay] = useState({
        show:false
    })

    const handleData=()=>{
        setDisplay({...display,show:true})
    }
    const handleClose=()=>{
        setDisplay({...display,show:false})
    }
    return (
        <div>
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse">
                <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item textbg_color" >
                        <i className="textbg_color"></i><span> Dashboard</span>
                    </a>
                    <h5 onClick={handleData} className="modalClose ml-10">Users</h5>
                    
                       { display?.show && 
                        <DataTable posts={props.state}  />
                       }
                   </div>
            </nav>
        </div>
    );
}
export default SideBar;