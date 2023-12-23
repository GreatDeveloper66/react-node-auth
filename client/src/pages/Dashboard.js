import React from 'react';

const Dashboard = ({ user, logout }) => {
    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
