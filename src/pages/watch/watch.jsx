import React from 'react';
import Header from '../../components/header/header';
import LeftMenu from '../../components/leftMenu/leftMenu';
import Videocapture from '../../components/videocapture/videocapture';
import "./watch.scss";

const Watch = () => {
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

export default Watch;