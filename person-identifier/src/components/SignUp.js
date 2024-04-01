import signUpImg from '../assets/signUpImage2.png';
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        axios.post('http://localhost:3001/register', {name, email, password})
        .then(res => {
            console.log(res.data.status)
            navigate('/login')
        }).catch(err => console.log(err))
    }
    return (<>
        <div class="flex items-center justify-center min-h-screen bg-emerald-100">
            <div
                class="relative flex flex-col m-6 space-y-8 bg-emerald-200 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                <div class="flex flex-col justify-center p-8 md:p-14">
                    <span class="mb-3 text-4xl font-bold">Welcome back</span>
                    <div class="py-4">
                        <span class="mb-2 text-md">Name</span>
                        <input
                            type="text"
                            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            name="name"
                            id="email"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div class="py-4">
                        <span class="mb-2 text-md">Email</span>
                        <input
                            type="email"
                            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="py-4">
                        <span class="mb-2 text-md">Password</span>
                        <input
                            type="password"
                            name="pass"
                            id="pass"
                            class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                    onClick={handleSubmit}>
                        Sign Up
                    </button>
                    <div class="text-center text-gray-400">
                        Have an account?
                        <span class="font-bold text-black"><Link to='/login'>Back to Sign in</Link></span>
                    </div>
                </div>
                
            </div>
        </div>
    </>);
};

export default SignUp;