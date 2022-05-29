import { useRouter } from "next/router"
import { createRef, useEffect, useState } from "react"
import useScript from "../../hooks/useScript"
import styles from '../../styles/sessions[id].module.css'



function addVideoStream(videoGrid, video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    videoGrid.append(video);
}


const SessionDash = () => {
    const status = useScript('https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.1/socket.io.js')
    const peerStatus = useScript('https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js')
    const fontAwesomeStatus = useScript('https://kit.fontawesome.com/c939d0e917.js')
    const [peerInstance, setPeerInstance] = useState(null)
    const [socketInstance, setSocketInstance] = useState(null)

    const router = useRouter();

    const { id:roomId } = router.query


    const initPeer = () => {

        const socket = io("127.0.0.1:8080", {transports: ['websocket']});
        setSocketInstance(socket)

        var peer = new Peer(undefined, {
            path: "peerjs",
            host: "127.0.0.1",
            port: "8080",
        });
        setPeerInstance(() => peer)

        console.log(peer)

        peer.on("open", (tmp_uid) => {
            socket.emit("join-room", roomId, tmp_uid);
        });
        
    }

    const videoGridRef = createRef();
    useEffect(() => {
        if (!roomId || !videoGridRef || !videoGridRef.current) return;

        let myVideoStream;
        const videoGrid = videoGridRef.current;

        const myVideo = document.createElement("video");
        myVideo.muted = true;
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })
            .then((stream) => {
                myVideoStream = stream;
                addVideoStream(videoGrid, myVideo, stream);
            });

    }, [roomId, videoGridRef])

    useEffect(() => {
        if (!roomId || status !== "ready" || peerStatus !== 'ready')  return;
        // connect to server and all

        initPeer()
    }, [roomId, status, peerStatus])

    if (status !== "ready" || peerStatus !== 'ready' || fontAwesomeStatus !== 'ready') {
        // TODO: replace with a nice loader
        return (
            <div>
                Loading...
            </div>
        )
    }




    return (
        <div className={styles['session_container']}>
            <>
                <div className={styles['header']}>
                    <div className={styles['logo']}>
                        <h3>Video Chat</h3>
                    </div>
                </div>
                <div className={styles['main']}>
                    <div className={styles['main__left']}>
                        <div className={styles['videos__group']}>
                            <div id="video-grid" ref={videoGridRef}></div>
                        </div>
                        <div className={styles['options']}>
                            <div className={styles['options__left']}>
                                <div id="stopVideo" className={styles['options__button']}>
                                    <i className="fa fa-video-camera" />
                                </div>
                                <div id="muteButton" className={styles['options__button']}>
                                    <i className="fa fa-microphone" />
                                </div>
                            </div>
                            <div className={styles['options__right']}>
                                <div id="inviteButton" className={styles['options__button']}>
                                    <i className="fas fa-user-plus" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['main__right']}>
                        <div className={styles['main__chat_window']}>
                            <div className={styles['messages']}></div>
                        </div>
                        <div className={styles['main__message_container']}>
                            <input
                                id="chat_message"
                                type="text"
                                autoComplete="off"
                                placeholder="Type message here..."
                            />
                            <div id="send" className={styles['options__button']}>
                                <i className="fa fa-plus" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </div>
    )
}

export default SessionDash
