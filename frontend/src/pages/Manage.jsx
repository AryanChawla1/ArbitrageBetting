import React, { useState } from 'react';
import { supabase } from '../supabase'; // Adjust the path if necessary


// TODO: FIX!!!
const Manage = () => {
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
    <div>
      <h1>Manage Account</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div>
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>

      <div>
        <h2>Delete Account</h2>
        <button onClick={handleDeleteAccount} style={{ color: 'red' }}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Manage;
