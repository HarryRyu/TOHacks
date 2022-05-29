import { useRouter } from "next/router"
import { createRef, useEffect, useRef, useState } from "react"
import useScript from "../../hooks/useScript"
import styles from '../../styles/sessions[id].module.css'
import SimplePeer from "simple-peer"
import io from "socket.io-client"

function addVideoStream(videoGrid, video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    videoGrid.append(video);
}


const SessionDash = () => {
    // const status = useScript('https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.1/socket.io.js')
    // const peerStatus = useScript('https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js')
    const fontAwesomeStatus = useScript('https://kit.fontawesome.com/c939d0e917.js')
    const [peerInstance, setPeerInstance] = useState(null)
    const [canShow, setCanShow] = useState(false)

    const [socketInstance, setSocketInstance] = useState(null)
    const [stream, setStream] = useState();
    const userVideo = useRef();
    const partnerVideos = useRef({});
    const partnerVideo = useRef();

    const [users, setUsers] = useState([]);

    const socket = useRef();


    const router = useRouter();

    const { id: roomId } = router.query


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })

    }, []);


    const initPeer = () => {

        socket.current = io("localhost:8080", { transports: ['websocket'], withCredentials: true, });


        socket.current.on("connect", (data) => {
            socket.current.emit('join-session', { sessionId: roomId });
            // socket.current.on('start-session', (payload) => {
            //     setUsers(payload)
            //     for (const user of payload) {
            //         if(user.socket_id !== socket.current.id) connectPeer(user.socket_id)
            //     }
            // })

            socket.current.on('allUsers', (payload) => {
                setUsers(payload)
                console.log('allu', payload)

                for (const user of payload) {
                    if(user.socket_id !== socket.current.id) connectPeer(user.socket_id)
                }
            })


            // setReceivingCall(true);

            // setCaller(data.from);
            // setCallerSignal(data.signal);

            // acceptCall(data.signal, data.caller)

            socket.current.on('hey', (payload) => {
                console.log(payload.from, ' is requesting', payload)
                const peer = new SimplePeer({
                    initiator: false,
                    trickle: false,
                    stream: stream,
                });
                peer.on("signal", data => {
                    //   accept the connection
                    socket.current.emit("acceptCall", { signal: data, to: payload.from })
                })

                peer.on("stream", stream => {
                    setCanShow(true)

                    console.log('adding stream...', partnerVideo.current, stream)
                    if (partnerVideo.current) partnerVideo.current.srcObject = stream
                    // if (partnerVideos.current[payload.from]) {
                    //     partnerVideos.current[payload.from].current.srcObject = stream;
                    // }
                });

                peer.signal(payload.signal);
            })
        })


    }


    const connectPeer = (peerSocketId) => {
        // setSocketInstance(socket)

        const peer = new SimplePeer({
            initiator: true,
            offerOptions: {
                offerToReceiveVideo: true,
                offerToReceiveAudio: true,
            },
            bundlePolicy: 'max-compat',
            rtcpMuxPolicy: 'negotiate',
            config: {

                iceServers: [
                    // {
                    //   urls: "stun:openrelay.metered.ca:80",
                    // },
                    // {
                    //   urls: "turn:openrelay.metered.ca:80",
                    //   username: "openrelayproject",
                    //   credential: "openrelayproject",
                    // },
                    // {
                    //   urls: "turn:openrelay.metered.ca:443",
                    //   username: "openrelayproject",
                    //   credential: "openrelayproject",
                    // },
                    // {
                    //   urls: "turn:openrelay.metered.ca:443?transport=tcp",
                    //   username: "openrelayproject",
                    //   credential: "openrelayproject",
                    // },
                ],
            },
            trickle: true,
            stream: stream,
        });



        peer.on("signal", data => {
            console.log('requesting connection to ', peerSocketId)
            socket.current.emit("callUser", { userToCall: peerSocketId, signalData: data, from: socket.current.id })
        })

        peer.on("stream", stream => {
            console.log('adding 2 stream...')

            partnerVideo.current.srcObject = stream


            // if (partnerVideos.current[peerSocketId]) {
            //     partnerVideos.current[peerSocketId].current.srcObject = stream;
            // }
        });

        socket.current.on("callAccepted", signal => {
            console.log('accepted connection', signal)
            peer.signal(signal);
        })





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
        if (!roomId) return;
        // connect to server and all

        initPeer()
    }, [roomId])



    // if (fontAwesomeStatus !== 'ready') {
    //     // TODO: replace with a nice loader
    //     return (
    //         <div>
    //             Loading...
    //         </div>
    //     )
    // }


    console.log()

    return (
        <div className={styles['session_container']}>
            <>

                {/* {<video playsInline muted ref={partnerVideo} autoPlay />}

                {false && users.map((e, indx) => {
                    const sockId = e.socket_id;
                    if (sockId === socket.current.id) return null;

                    console.log(partnerVideos.current[sockId])
                    return (
                        <>
                            {!partnerVideos.current[sockId] ? 'NULLL' : partnerVideos.current[sockId].toString()}

                            <video key={indx} playsInline muted ref={e => (partnerVideos.current[sockId] = e)} autoPlay />

                        </>
                    )
                })} */}

                {users.map((e, indx) => <button key={indx} onClick={() => connectPeer(e.socket_id)}>{e.socket_id}</button>)}

                SocketId: {socket.current && socket.current.id}
                {users.map((user, indx) => <div key={indx}>{JSON.stringify(user)}</div>)}

                <div className={styles['header']}>
                    <div className={styles['logo']}>
                        <h3>Video Chat</h3>
                    </div>
                </div>
                <div className={styles['main']}>
                    <div className={styles['main__left']}>
                        <div className={styles['videos__group']}>
                            <div id="video-grid">
                                {<video muted ref={userVideo} autoPlay />}
                                {<video muted ref={partnerVideo} autoPlay />}
                            </div>
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
