import React from "react";
import "./header.scss";
import { Link } from 'react-router-dom';
import { AppRoute } from "../../const";
import { useState } from 'react';

const Header = () => {

    const [dropmenu, setdropmenu] = useState()
    const activeDropMenu = () => {
        setdropmenu(!dropmenu);
    }


    return (
        <header className="header">
            <div className="header-profile" onClick={activeDropMenu}>
                <p className="username">Denis Kirilyuk</p>
                <div className="header-profile__avatar">
                    <img src="./image/avatar.jpg" alt="avatar" />
                    <div className={`dropmenu ${(dropmenu === true) && "activated"}`}  >
                        <Link to={AppRoute.MAIN}>Посмотреть профиль</Link>
                        <Link to={AppRoute.MAIN} className='red'>Выйти из системы</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;