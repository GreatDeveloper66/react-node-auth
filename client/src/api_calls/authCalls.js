const AuthCalls = {
    getUserInfo: async () => {
        const response = await fetch('/api/auth/user/:id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        return data;
    },
    deleteUser: async () => {
        const response = await fetch('/api/auth/user/:id', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        return data;
    },
    updateUser: async (updatedUserBody) => {
        const response = await fetch('/api/auth/user/:id', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }, 
            body: JSON.stringify(updatedUserBody)
        });
        const data = await response.json();
        return data;
    },
    logoutUser: async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    },
    loginUser: async (userBody) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userBody)
        });
        const data = await response.json();
        return data;
    },
    registerUser: async (userBody) => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userBody)
        });
        const data = await response.json();
        return data;
    },

    
}

export default AuthCalls;