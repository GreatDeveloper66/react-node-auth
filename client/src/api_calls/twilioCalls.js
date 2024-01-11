const TwilioCalls = {
    sendCode: async (phoneNumber) => {
        const response = await fetch('/api/auth/sendCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(phoneNumber)
        });
        const data = await response.json();
        return data;
    },
    verifyCode: async (code) => {
        const response = await fetch('/api/auth/verifyCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(code)
        });
        const data = await response.json();
        return data;
    }
}


export default TwilioCalls;