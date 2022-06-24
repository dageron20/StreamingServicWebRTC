import React from 'react';
import Header from '../../components/header/header';
import LeftMenu from '../../components/leftMenu/leftMenu';
import Videocapture from '../../components/videocapture/videocapture';
import "./main.scss";

const Main = () => {
    return (
        <>
            <LeftMenu />
            <Header />
            <main className='main-content'>
                <Videocapture />
            </main>
            
        </>
    )
}

export default Main;