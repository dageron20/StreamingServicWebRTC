import React from "react";
import "./leftMenu.scss";

const LeftMenu = () => {
    return (
        <div className="wrapper">
            <div className="menu">
                <a href="#" className="menu-btn"></a>
                <nav className="menu-list">
                    <a href="#">Главная</a>
                    <a href="#">Новости</a>
                    <a href="#">Контакты</a>
                    <a href="#">Портфолио</a>
                </nav>
            </div>
        </div>
    )
}

export default LeftMenu;