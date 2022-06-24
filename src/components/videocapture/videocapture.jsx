import React, { useRef, useEffect } from "react";
import "./videocapture.scss";
import { Client, LocalStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import Wand from "./wand";


const Videocapture = () => {
    const pubVideo = useRef();
    const subVideo = useRef();

    let isPub, client, signal;

    const config = {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
        ],
    };
    const URL = new URLSearchParams(window.location.search).get("publish");
    console.log("url", URL);
    if (URL) {
        isPub = true;
    } else {
        isPub = false;
    }

    useEffect(() => {
        signal = new IonSFUJSONRPCSignal("ws://192.168.0.103:7000/ws");
        client = new Client(signal, config);
        signal.onopen = () => client.join("test room");

        if (!isPub) {
            client.ontrack = (track, stream) => {
                console.log("got track: ", track.id, "for stream: ", stream.id);
                track.onunmute = () => {
                    subVideo.current.srcObject = stream;
                    subVideo.current.autoplay = true;
                    subVideo.current.muted = false;

                    stream.onremovetrack = () => {
                        subVideo.current.srcObject = null;
                    }
                }
            }
        }
    }, []);

    const start = (event) => {
        if (event) {
            LocalStream.getUserMedia({
                resolution: 'vga',
                audio: true,
                codec: "vp8"
            }).then((media) => {
                pubVideo.current.srcObject = media;
                pubVideo.current.autoplay = true;
                pubVideo.current.controls = true;
                pubVideo.current.muted = true;
                client.publish(media);
            }).catch(console.error);
        } else {
            LocalStream.getDisplayMedia({
                resolution: 'vga',
                video: true,
                audio: true,
                codec: "vp8"
            }).then((media) => {
                pubVideo.current.srcObject = media;
                pubVideo.current.autoplay = true;
                pubVideo.current.controls = true;
                pubVideo.current.muted = true;
                client.publish(media);
            }).catch(console.error);
        }
    }

    Wand({
        targetSelector: "#wand",
        event: "click",
        iconSrc: "https://raw.githubusercontent.com/gist/mmathys/fbbfbc171233a30e478ad5b87ec4f5d8/raw/cd9219e336b8f3b85579015bdce9665def091bb8/heart.svg"
    })




    return (
        <>
            <div className="video-chat">
                <div className="video-chat_name">
                    ЧАТ ТРАНСЛЯЦИИ
                </div>
                <div className="video-chat-window">
                    <div className="video-chat-window--line">
                        <span className="chat-text-name">Anonym:</span>
                        <span className="chat-text">Привет Всем</span>
                    </div>
                </div>
            </div>

            <div className="video-window">
                {isPub ? (
                    <div>
                        <button id="bnt_pubcam" onClick={() => start(true)}>Демка камеры</button>
                        <button id="bnt_pubscreen" onClick={() => start(false)}>Каст экрана</button>
                    </div>
                ) : null
                }
                {isPub ? (
                    <video className="video-tag" id="pubVideo" controls ref={pubVideo} poster="./image/poster2.gif">
                    </video>
                ) : (
                    <video className="video-tag" id="subVideo" controls ref={subVideo} poster="./image/poster2.gif">
                    </video>
                )}
                <button id="wand">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path fill="red" d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z" />
                    </svg>
                    <span className="like-counter">5</span>
                </button>
            </div>

        </>

    );
}

export default Videocapture;