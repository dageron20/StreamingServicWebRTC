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
            <Link to={AppRoute.MAIN}>
                <img className="header-logo" src="./image/logo.png" alt="Лого" border="0" />
            </Link>
            <div className="header-selecter">
                <Link to={AppRoute.STREAM} type="button">Транслировать</Link>
                <Link to={AppRoute.MAIN} type="button">Cмотреть</Link>
            </div>

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