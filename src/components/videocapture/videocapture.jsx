import React, { useRef, useEffect }  from "react";
import  "./videocapture.scss";
import { Client, LocalStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';

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
        signal = new IonSFUJSONRPCSignal("ws://localhost:7000/ws");
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

    return (
        <div>
            <main>
                {isPub ? (
                    <div>
                        <button id="bnt_pubcam" onClick={() => start(true)}>Демка камеры</button>
                        <button id="bnt_pubscreen"  onClick={() => start(false)}>Каст экрана</button>
                    </div>
                ) : null
                }
            </main>
            {isPub ? (
                <video id="pubVideo" controls ref={pubVideo}></video>
            ) : (
                <video id="subVideo" controls ref={subVideo}></video>
            )}
        </div>
    );
}

export default Videocapture;