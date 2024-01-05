const TwilioCalls = {
    sendCode: async () => {
        const response = await fetch('/api/auth/sendCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    },
    verifyCode: async () => {
        const response = await fetch('/api/auth/verifyCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    }
}


export default TwilioCalls;