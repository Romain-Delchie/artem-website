import Axios from "axios";

const axios = Axios.create({
    baseURL: "http://localhost:3305",
});

const API = {
    auth: {
        async signin(email, password) {
            return axios.post("/auth/signin", { email, password });
        },
    },

    user: {
        async account(token) {
            return axios.get("/account", {
                headers: {
                    "x-auth-token": token,
                },
            });
        },
    },

    quotation: {
        async getQuotation(token) {
            return axios.get("/quotation", {
                headers: {
                    "x-auth-token": token,
                },
            });
        }
    },


};

export default API;