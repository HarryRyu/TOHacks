import axios from "axios";
import { useRouter } from "next/router"
import { createRef, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { GET_SESSION_ACCESS_TOKEN } from "../../apiEndpoints";
import useScript from "../../hooks/useScript"
import styles from '../../styles/sessions[id].module.css'
// import = require('twilio-video');



function addVideoStream(videoGrid, video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    videoGrid.append(video);
}


const SessionDash = () => {
    const status = useScript('https://sdk.twilio.com/js/video/releases/2.15.2/twilio-video.min.js')
    const fontAwesomeStatus = useScript('https://kit.fontawesome.com/c939d0e917.js')
    
    const router = useRouter();

    // const  [token, setToken]=useState('')
    const { id: roomId } = router.query


    useEffect(() => {
    }, []);


    useEffect(() => {
        if (!roomId || status !== 'ready') return;

        // GET access token to join the room

        axios.post(GET_SESSION_ACCESS_TOKEN, { sessionUUID: roomId }, { withCredentials: true }).then(async e => {
            console.log(e.data)

            if (e.data.error) {
                toast(e.data.message, { type: 'error' })
            } else {
                // setToken(e.data.token)
                const room = await joinVideoRoom(e.data.token)
                console.log();
                handleConnectedParticipant(room.localParticipant)
                room.participants.forEach(handleConnectedParticipant);
                room.on("participantConnected", handleConnectedParticipant);

                room.on("participantDisconnected", handleDisconnectedParticipant);
            }
        })

        // if error then show a toast


    }, [roomId, status])


    const handleTrackPublication = (trackPublication, participant) => {
        function displayTrack(track) {
            // append this track to the participant's div and render it on the page
            const participantDiv = document.getElementById(participant.identity);
            // track.attach creates an HTMLVideoElement or HTMLAudioElement
            // (depending on the type of track) and adds the video or audio stream
            participantDiv.append(track.attach());
          }
        
          // check if the trackPublication contains a `track` attribute. If it does,
          // we are subscribed to this track. If not, we are not subscribed.
          if (trackPublication.track) {
            displayTrack(trackPublication.track);
          }
        
          // listen for any new subscriptions to this track publication
          trackPublication.on("subscribed", displayTrack);


    }


    const participantDivRef=useRef()
    const handleConnectedParticipant = (participant) => {

        console.log(participant)
        // create a div for this participant's tracks
        const participantDiv = document.createElement("div");
        participantDiv.setAttribute("id", participant.identity);
        participantDiv.style = 'display: flex; flex-direction: column-reverse; align-items: center; font-weight: bolder;'
        const participantNameDiv = document.createElement("div");
        participantNameDiv.innerText=`@${participant.identity.split('---')[1].replaceAll(' ', '')}`
        participantDiv.append(participantNameDiv)
        participantDivRef.current.appendChild(participantDiv);

        // iterate through the participant's published tracks and
        // call `handleTrackPublication` on them
        participant.tracks.forEach((trackPublication) => {
            handleTrackPublication(trackPublication, participant);
        });

        // listen for any new track publications
        participant.on("trackPublished", handleTrackPublication);
    };

    const joinVideoRoom = async (token) => {
        // join the video room with the Access Token and the given room name
        const room = await Twilio.Video.connect(token, {
            room: roomId,
        });
        return room;
    };

    const handleDisconnectedParticipant = (participant) => {
        // stop listening for this participant
        participant.removeAllListeners();
        // remove this participant's div from the page
        const participantDiv = document.getElementById(participant.identity);
        participantDiv.remove();
      };
      

    return (
        <div className={styles['session_container']} style={{color: 'white'}}>
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

                {/* {users.map((e, indx) => <button key={indx} onClick={() => connectPeer(e.socket_id)}>{e.socket_id}</button>)} */}

                {/* SocketId: {socket.current && socket.current.id} */}
                {/* {users.map((user, indx) => <div key={indx}>{JSON.stringify(user)}</div>)} */}

                <div className={styles['header']}>
                    <div className={styles['logo']}>
                        <h3 className="text-2xl">Temporal Challenge Arena</h3>
                    </div>
                </div>
                <div className={styles['main']}>
                    <div className={styles['main__left']}>
                        <div className={styles['videos__group']}>
                            <div id="video-grid">
                            <div style={{display: 'flex', gap: '15px'}} ref={participantDivRef}>
                                </div>

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

                        <div style={{margin: '15px auto'}} className="text-sky-400">
                            In-Call Messages and Stats
                        </div>
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
