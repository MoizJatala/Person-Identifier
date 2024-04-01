import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Transition } from '@headlessui/react';
import Header from './Admin_header';
import Avatar from '@mui/material/Avatar';

const UserProfile = () => {
  const authToken = Cookies.get('authToken');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch user details when the component mounts
    axios
      .get('http://localhost:3001/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === 'Success') {
          setName(res.data.user.name);
          setEmail(res.data.user.email);
        } else {
          // Handle error
        }
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, [authToken]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsSaving(true);
    // Send updated user details to the server
    axios
      .post(
        'http://localhost:3001/profile',
        { name, email },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === 'Success') {
          setIsEditing(false);
        } else {
          // Handle error
        }
        setIsSaving(false);
      })
      .catch((err) => {
        console.log(err);
        // Handle error
        setIsEditing(false);
        setIsSaving(false);
      });
  };

  return (
    <>
    <Header/>
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md text-center">
      <Avatar alt="Avatar" className="mx-auto mb-4" sx={{ width: 100, height: 100 }} />
      

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name:</label>
        <Transition
          show={!isEditing}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <p className="text-gray-800">{name}</p>
        </Transition>
        <Transition
          show={isEditing}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md p-2 w-full"
            disabled={isSaving}
          />
        </Transition>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <Transition
          show={!isEditing}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <p className="text-gray-800">{email}</p>
        </Transition>
        <Transition
          show={isEditing}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md p-5 w-full"
            disabled={isSaving}
          />
        </Transition>
      </div>

      <div className="flex justify-center">
        {isEditing ? (
          <button onClick={handleSaveClick} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md mr-4" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        ) : (
          <button onClick={handleEditClick} className="bg-blue-300 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-4">
            Edit
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default UserProfile;
