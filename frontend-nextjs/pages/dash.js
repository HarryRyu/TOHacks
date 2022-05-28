import {useState} from 'react'
import { useForm } from 'react-hook-form';
import FormField from '../components/FormField';


const Dash = () => {
    const [waitingForServerResponse, setWaitingForServerResponse] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        
    };

    
    return (
        <div>
            <div className="form-container">
                <div className="heading-text">Create a new session</div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        id='sessionName'
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
