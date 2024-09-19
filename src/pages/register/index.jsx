import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { globalVars } from '../../global/vars';
import { validateEmail } from '../../utils';

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name) {
      return toast.error("Check inputs!", {
        position: "top-left"
      });
    }

    if(!validateEmail(email)) {
      return toast.error("Invalid email address!", {
        position: "top-left"
      });
    }

    await axios.post(`${globalVars.API_URL}user/register`, {
      name,
      email,
      password,
    }).then((res) => {
      toast.success("Account created successfully!", {
        position: "top-left"
      });

      navigate('/login');
    }).catch(e => {
      toast.error(e.response.data.msg, {
        position: "top-left"
      });
    })
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[300px] px-5 py-6 border-solid rounded-xl border-black border-[1px] flex flex-col gap-4">
        <p className='font-bold text-xl text-center'>Register</p>
        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John@service.com" required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123" required />
        </div>

        <input type="submit" value={"Submit"} onClick={() => handleRegister()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" />

        <p className="text-center text-sm">Or you can login into <span className="cursor-pointer text-blue-500 underline" onClick={() => navigate('/login')}>your account</span></p>
      </div>
    </div>
  )
}

// id, name, e-mail, last login time, registration time, status (active/blocked).