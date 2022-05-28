import axios from 'axios';
import { useRouter } from 'next/router';
import {useState} from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CREATE_NEW_SESSION } from '../apiEndpoints';
import FormField from '../components/FormField';


const Dash = () => {
    const [waitingForServerResponse, setWaitingForServerResponse] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        try {
            setWaitingForServerResponse(true);
            const response = await axios.post(CREATE_NEW_SESSION, data, {
                withCredentials: true
            })
            if(response.data.error){
                throw new Error(response.data.message)
            }

            toast('Session creation successful. Redirecting to session dashboard...')
            router.push(`/sessions/${response.data.data.session_id}`)

        } catch (err) {
            toast(err.message, {type:'error'})
        } finally {
            setWaitingForServerResponse(false);
        }
    };

    
    return (
        <div className='mt-12'>
            <div className="form-container">
                <div className="heading-text">Create a new session</div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        id='session_name'
                        label='Session Name'
                        type='text'
                        register={register}
                        errors={errors}
                    />

                    <button
                        type="submit"
                        className="btn"
                        disabled={waitingForServerResponse}
                    >
                        Create new session
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Dash;
