import React from "react";
import "./leftMenu.scss";
import { useState } from "react";

const LeftMenu = () => {

    const [dropmenu, setdropmenu] = useState()
    const activeLeftMenu = () => {
        setdropmenu(!dropmenu);
    }

    return (
        <div className="wrapper">
            <div className={`menu ${(dropmenu === true) && "menu_active"}`}>
                <a href="#" className={`menu-btn ${(dropmenu === true) && "menu_active"}`}  onClick={activeLeftMenu}>
                <div className={`arrow ${(dropmenu === true) && "arrow_active"}`}></div>
                </a>
                <nav className="menu-list">
                    <h3>Текущие активные комнаты:</h3>
                    <ul>
                        <li>Комната №1</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default LeftMenu;