import axios from "axios";
import { useRouter } from "next/router"
import { createRef, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { END_CHALLENGE, GET_SESSION_ACCESS_TOKEN, GET_SESSION_DETAILS, SERVER_URL, START_CHALLENGE } from "../../apiEndpoints";
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
    const status = useScript('https://sdk.twilio.com/js/video/releases/2.15.2/twilio-video.min.js')
    const fontAwesomeStatus = useScript('https://kit.fontawesome.com/c939d0e917.js')

    const script1 = useScript('https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.min.js')
    const script2 = useScript('https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js')
    const [timeElapsed, setTimeElapsed] = useState(0)

    const [sessionData, setSessionData] = useState(null)
    const router = useRouter();

    // const  [token, setToken]=useState('')
    const { id: roomId } = router.query


    useEffect(() => {
        if (!roomId) return;

        let id = setInterval(async () => {
            try {

                const data = await axios.post(GET_SESSION_DETAILS, { sessionUUID: roomId }, {
                    withCredentials: true,
                })
                setSessionData(data.data.data)
            } catch (err) {
                toast(err.message)
            }

        }, 5000);
        return () => clearInterval(id);
    }, [roomId]);


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


    const participantDivRef = useRef()
    const handleConnectedParticipant = (participant) => {

        console.log(participant)
        // create a div for this participant's tracks
        const participantDiv = document.createElement("div");
        participantDiv.setAttribute("id", participant.identity);
        participantDiv.style = 'display: flex; flex-direction: column; align-items: center; justify-content: flex-start;'
        const participantNameDiv = document.createElement("div");
        participantNameDiv.innerText = `@${participant.identity.split('---')[1].replaceAll(' ', '')}`
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


    const handleNewChallenge = () => {
        toast('Select a pose with which you want to challenge your buddies. 😎 Get ready... Clicking snapshot in 7 seconds.', {
            autoClose: 1000,
            onClose: () => {
                takepicture()
                // TODO: Add Challenge
                // let canvas = document.getElementById('screenshot-canvas');

                // let video = document.getElementById('my-video');

                // canvas.width = 1920;
                // canvas.height = 1080;

                // let ctx = canvas.getContext('2d');
                // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // let image = canvas.toDataURL('image/jpeg');
            }
        })
    }

    const handleEndChallenge = async () => {
        try {
            const res = await axios.post(END_CHALLENGE, { session_id: sessionData.session_id, challenge_id: sessionData.current_active_challenge_id }, { withCredentials: true })
            if (res.data.error) throw new Error(res.data.message);

            toast('Challenge successfully completed. Results will be compiled soon! Keep playing..')
        } catch (err) {
            toast(err.message, { type: 'error' })
        }
    }


    function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
    }


    async function takepicture() {
        var video = document.getElementsByTagName('video');
        var canvas = document.getElementById('canvas');
        var width = 100
        var height = 100
        var context = canvas.getContext('2d');


        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video[0], 0, 0, width, height);

            var data = canvas.toDataURL('image/png');

            console.log(data)
            photo.setAttribute('src', data);

            var bodyFormData = new FormData();

            bodyFormData.append('session_id', roomId);
            bodyFormData.append('pose', DataURIToBlob(data));
            try {
                const response = await axios.post(START_CHALLENGE, bodyFormData, { withCredentials: true })
                if (response.data.error) throw new Error(response.data.message)
                console.log(response.data)
            } catch (err) {
                toast(err.message, { type: 'error' })
            }
        } else {
            clearphoto();
        }
    }


    return (

        <div className={styles['session_container']} style={{ color: 'white' }}>
            <>

                <header className="text-gray-600 body-font">
                    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                            <a href="/index" className="mr-5 hover:text-gray-900">
                                Home
                            </a>
                            <a href="/create" className="mr-5 hover:text-gray-900">
                                Create a Room
                            </a>
                        </nav>
                        <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <span className="ml-3 text-xl">TOHacks 2022</span>
                        </a>
                        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                            <a href="/join">
                                <button className="inline-flex items-center bg-yellow-100 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-200 rounded text-base mt-4 md:mt-0">
                                    Join a Room
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 ml-1"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </a>
                        </div>
                    </div>
                </header>

                <hr />


                <div className={styles['main']}>
                    <div className={styles['main__left']}>

                        <div className={styles['container-dark']}>
                            <div>
                                <div>Latest Local Snapshot</div>
                                <canvas id="canvas" style={{ backgroundColor: 'black', borderRadius: '15px', }}>
                                    <div className="output">
                                        <img id="photo" alt="The screen capture will appear in this box."></img>
                                    </div>
                                </canvas>
                            </div>



                            {sessionData &&
                                <>
                                    {sessionData.current_active_challenge_id ?

                                        <div className={`flex flex-col gap-1 ${styles['divvvv']}`}>
                                            <div className="text-yellow-500 font-black">Current Challenge by: {sessionData.challenge_creator_name}</div>
                                            <img className='w-full h-auto rounded-lg' src={`${SERVER_URL}/${sessionData.challenge_pose_image_location}`} />
                                        </div>

                                        : null}

                                </>


                            }

                            <div id="video-grid" ref={participantDivRef} ></div>

                        </div>

                        {!sessionData && <div>Loading...</div>}



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

                        <div style={{ margin: '15px auto' }} className="text-sky-400">
                            In-Call Messages and Stats
                        </div>

                        <div style={{ margin: '15px auto', textAlign: 'center' }}>
                            {!(sessionData && sessionData.current_active_challenge_id) ? <div>
                                <div className="text-xs text-red-400">No challenge active</div>
                                <div className="btn-primary" onClick={handleNewChallenge}>Create a new challenge</div>
                            </div> : <div>
                                <div className="text-xs">Challenge is already active. Enjoy!</div>
                                {sessionData.is_challenge_owner ?
                                    < div className="btn-basic bg-red-500" onClick={handleEndChallenge}>End Current Challenge</div> :
                                    <div className="text-xs text-gray-400 text-center">Note: Only the creator of challenge can end it. </div>
                                }
                            </div>}
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

        </div >
    )
}

export default SessionDash
