// import google from '../assets/google.svg';
import loginImg from '../assets/loginImg.png';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // New state for error message
    const navigate = useNavigate()
    //const { updateUser } = useUser();
    const location = useLocation(); // Get the current location

    useEffect(() => {
        const isNavigated = location.state && location.state.fromOtherPage;
        if (isNavigated) {
            window.location.reload();
        }
    }, [location]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post('http://localhost:3001/login', { email, password })
          .then((res) => {
            if (res.data.status === 'Success') {
              const { token, user } = res.data;
             console.log()
              // Store the token in a cookie
              Cookies.set('authToken', token, { expires: 1 }); 
    
              if (user.role === 'admin') {
                navigate('/admin');
              } else {
                navigate('/', { state: { user } });
              }
            } else {
              setError('Incorrect username or password');
            }
          })
          .catch((err) => {
            console.log(err);
            setError('An error occurred');
          });
      };

    return (<>
        <div class="flex items-center justify-center min-h-screen bg-emerald-100">
            <div
                class="relative flex flex-col m-6 space-y-8 bg-emerald-200 shadow-2xl rounded-2xl md:flex-row md:space-y-0"
            >
                <div class="flex flex-col justify-center p-8 md:p-14">
                    <span class="mb-3 text-4xl font-bold">Welcome back</span>
                    <span class="font-light text-gray-400 mb-8">
                         Please enter your details
                    </span>
                    <div class="py-4">
                        <span class="mb-2 text-md">Email</span>
                        <input
                            type="text"
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
                    {error && (
                        <p className="text-red-500 text-sm mb-4">✖ Username or password is incorrect</p>
                    )}

                    <button
                        class="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                        onClick={handleSubmit} >
                        Sign in
                    </button>
                    <div class="text-center text-gray-400">
                        Dont'have an account?
                        <span class="font-bold text-black"><Link to='/signup'>Sign up for free</Link></span>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Login