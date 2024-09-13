import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Heroicons v2 uses /24/solid or /24/outline
import Select from 'react-select';
import SignupBanner from './SignupBanner';

export default function Signup() {
  const [showForm, setShowForm] = useState(true);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [thurayaPhone, setThurayaPhone] = useState('');
  const [country, setCountry] = useState(null);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryOptions = response.data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
        }));
        countryOptions.sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const validateFields = () => {
    let newErrors = {};
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (validateFields()) {
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('thuraya_phone', thurayaPhone);
        formData.append('country', country?.value || '');

        const response = await axios.post(`https://174.138.25.87:5000/api/signup`, formData);
        setSuccessMessage(response.data.message);
        setIsSuccess(true);
        setApiError('');
        setShowForm(false);
      } catch (error) {
        setApiError(error.response?.data.message || 'Signup failed');
        setIsSuccess(false);
        setShowForm(false);
      }
    }
  };

  return (
    <div>
    <SignupBanner/>
     <div className="flex flex-col items-center min-h-screen mt-[100px]">
      {showForm ? (
        <div className="flex flex-col w-full max-w-lg space-y-6 p-4">
          <h1 className="text-xl font-semibold text-center">Signup</h1>
          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium">First Name</label>
              <input
                className={`w-full px-3 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium">Last Name</label>
              <input
                className={`w-full px-3 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <label className="block mb-1 text-sm font-medium">Country</label>
          <Select
            options={countries}
            value={country}
            onChange={setCountry}
            className="w-full"
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            className={`w-full px-3 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

          <label className="block mb-1 text-sm font-medium">Thuraya Phone Number</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            type="text"
            value={thurayaPhone}
            onChange={(e) => setThurayaPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="Optional"
          />

          {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}

          <button
            onClick={handleSignup}
            className="w-full py-2 mt-4 text-white bg-green-600 rounded-lg font-bold"
            style={{ backgroundColor: '#226B51' }} 
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-center bg-gray-100 p-6">
          <CheckCircleIcon className={`w-16 h-16 ${isSuccess ? 'text-green-500' : 'text-red-500'}`} />
          <h2 className="text-lg">{successMessage || apiError}</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 text-white  rounded-lg"
            style={{ backgroundColor: '#226B51' }} 
          >
            Back to Signup
          </button>
        </div>
      )}
    </div>
    </div>
    
  );
}
