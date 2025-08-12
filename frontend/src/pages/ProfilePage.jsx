import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, updateUserPassword } from '../services/userService';

const ProfilePage = () => {
    const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '' });
    const [password, setPassword] = useState({ oldPassword: '', newPassword: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setProfile(response.data);
            } catch  {
                setError('Failed to load profile.');
            }
        };
        fetchProfile();
    }, []);

    const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPassword({ ...password, [e.target.name]: e.target.value });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await updateUserProfile(profile);
            setMessage('Profile updated successfully!');
        } catch  {
            setError('Failed to update profile.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await updateUserPassword(password);
            setMessage('Password updated successfully!');
            setPassword({ oldPassword: '', newPassword: '' });
        } catch (err) {
            setError(err.response?.data || 'Failed to update password.');
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
                <form onSubmit={handleProfileSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" value={profile.firstName || ''} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" value={profile.lastName || ''} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input type="email" name="email" value={profile.email || ''} onChange={handleProfileChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">Update Profile</button>
                </form>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                     <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="oldPassword">Old Password</label>
                        <input type="password" name="oldPassword" value={password.oldPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="newPassword">New Password</label>
                        <input type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700">Change Password</button>
                </form>
            </div>
             {message && <p className="md:col-span-2 mt-4 text-center text-green-600">{message}</p>}
             {error && <p className="md:col-span-2 mt-4 text-center text-red-600">{error}</p>}
        </div>
    );
};
export default ProfilePage;