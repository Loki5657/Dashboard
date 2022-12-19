import React from "react";

const sideBar = () => {
    return (
        <div>
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse">
                <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item textbg_color" >
                        <i className="textbg_color"></i><span> Dashboard</span>
                    </a>
                </div>
            </nav>
        </div>
    );
}
export default sideBar;