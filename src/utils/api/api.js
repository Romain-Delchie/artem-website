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
        async update(token, data) {
            return axios.patch("/account", data, {
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

    product: {
        async getProducts(token) {
            return axios.get("/product", {
                headers: {
                    "x-auth-token": token,
                },
            });
        },
        async getProduct(token, id) {
            return axios.get(`/product/${id}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },
        async create(token, data) {
            return axios.post("/product", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },
        async update(token, id, data) {
            return axios.patch(`/product/${id}`, data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },
        async delete(token, id) {
            return axios.delete(`/product/${id}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
        }
    },

    range: {
        async getRanges() {
            return axios.get("/range");
        },

        async getRange(id) {
            return axios.get(`/range/${id}`);
        }
    },



};

export default API;