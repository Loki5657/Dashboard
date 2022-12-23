

import React, { useState } from "react";
import { Button, Table } from "react-bootstrap"
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import Menu from '../../images/menu.svg';


const SideBar = (props) => {
    const navigate = useNavigate()

    const [display, setDisplay] = useState({
        show: false
    })

    const handleData = () => {
        navigate('/users')
        setDisplay({ ...display, show: true })
    }
    const handleClose = () => {
        setDisplay({ ...display, show: false })
    }
    const handleshow = (open) => {
        if (open == false) {
            setDisplay({ ...display, show: true })

        } else {
            setDisplay({ ...display, show: false })

        }
    }
    return (
        <div>
            <img src={Menu} className="img_size" onClick={() => handleshow(display?.show)} />
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse">
                <div className="list-group list-group-flush">
                    <a className="list-group-item textbg_color" >
                        <i className="textbg_color"></i><span> Dashboard</span>
                    </a>
                    <h5 onClick={handleData} className="modalClose ml-10">Users</h5>
                </div>
            </nav>
        </div>
    );
}
export default SideBar;