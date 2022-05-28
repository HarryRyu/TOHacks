import { useState } from 'react'
import { useForm } from "react-hook-form";
import FormField from '../components/FormField'
import axios from 'axios';
import { LOGIN_URL } from '../apiEndpoints';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const Login = () => {
    const [waitingForServerResponse, setWaitingForServerResponse] = useState(false)
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        try {
            setWaitingForServerResponse(true);
            const response = await axios.post(LOGIN_URL, data, {
                withCredentials: true
            })
            if(response.data.error){
                throw new Error(response.data.message)
            }

            toast('Login Successful. Redirecting...')
            router.push('/dash/')


        } catch (err) {
            toast(err.message, {type:'error'})
        } finally {
            setWaitingForServerResponse(false);
        }
    };


    return (
        <div className="main-container w-full pt-4 overflow-y-scroll">
            <div className="form-container">
                <div className="heading-text text-center">Login</div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        id='email'
                        label='Email Address'
                        type='email'
                        register={register}
                        errors={errors}
                    />

                    <FormField
                        id='password'
                        label='Password'
                        type='password'
                        register={register}
                        errors={errors}
                    />


                    <button
                        type="submit"
                        className="btn"
                        disabled={waitingForServerResponse}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login;
