import axios from 'axios';

const baseUrl = "http://localhost:3000";

const axiosClient = (token: string | null) => {
    const instance = axios.create({
        baseURL: baseUrl
    });

    // Add a request interceptor to include the token in the headers
    instance.interceptors.request.use(
        function (config) {
            if (token) {
                console.log({ token });

                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    return instance;
}

export default axiosClient;
