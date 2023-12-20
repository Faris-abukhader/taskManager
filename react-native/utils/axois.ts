import axios from "axios";

export const Api = (secret: string) => axios.create({
    baseURL: 'http://localhost:4500',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        secret
    }
});

