import React from "react";
import "./mainBanner.scss";
import { useState } from "react";
import { AppRoute } from "../../const";
import { Link } from "react-router-dom";

const MainBanner = () => {

    const [dropmenu, setdropmenu] = useState()
    const activeLeftMenu = () => {
        setdropmenu(!dropmenu);
    }

    return (
        <>
            <div className="header-selecter">
                <Link to={AppRoute.STREAM} type="button">Транслировать</Link>
                <Link to={AppRoute.WATCH} type="button">Cмотреть</Link>
            </div>
        </>
    )
}

export default MainBanner;