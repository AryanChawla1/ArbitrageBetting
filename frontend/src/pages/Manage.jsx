import React, { useState } from 'react';
import { supabase } from '../supabase';

function Manage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password updated successfully.');
    }
  };

  const handleDeleteAccount = async () => {
    setError('');
    setSuccess('');
    const user = supabase.auth.user();
    if (user) {
      const { error } = await supabase.from('profiles').delete().eq('id', user.id);
      if (error) {
        setError(error.message);
      } else {
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          setError(signOutError.message);
        } else {
          setSuccess('Account deleted successfully.');
        }
      }
    } else {
      setError('No user is logged in.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 font-sans">
      <h1 className="text-center text-gray-800 text-2xl font-bold">Manage Account</h1>
      {error && <p className="text-center text-red-500">{error}</p>}
      {success && <p className="text-center text-green-500">{success}</p>}

      <div className="mb-5">
        <h2 className="text-lg text-gray-600 font-medium">Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <button
          onClick={handleChangePassword}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Change Password
        </button>
      </div>

      <div>
        <h2 className="text-lg text-gray-600 font-medium">Delete Account</h2>
        <button
          onClick={handleDeleteAccount}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Manage;
