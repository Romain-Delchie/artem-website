import Axios from "axios";

const axios = Axios.create({
    baseURL: "http://85.215.34.177:3305",
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

        async create(data) {
            return axios.post("/account", data);
        },

        async update(token, data) {
            return axios.patch("/account", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async updatePassword(token, data) {
            return axios.patch("/account/password", data, {
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
        },

        async getQuotationById(token, id) {
            return axios.get(`/quotation/${id}`, {
                headers: {
                    "x-auth-token": token,
                },

            });
        },

        async create(data) {
            return axios.post("/quotation", data);
        },

        async update(token, id, data) {
            return axios.patch(`/quotation/${id}`, data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async delete(token, id) {
            return axios.delete(`/quotation/${id}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },


        async updateProduct(token, id, data) {
            return axios.patch(`/quotationHasProduct/${id}`, data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async deleteProduct(token, id) {
            return axios.delete(`/quotationHasProduct/${id}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async addProduct(token, data) {
            return axios.post("/quotationHasProduct", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

    },

    address: {
        async getAddresses(token) {
            return axios.get("/address", {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async getAddress(token, id) {
            return axios.get(`/address/${id}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async create(token, data) {
            return axios.post("/address", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async update(token, id, data) {
            return axios.patch(`/address/${id}`, data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async delete(token, id) {
            return axios.delete(`/address/${id}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
        }
    },

    delivery: {
        async getDeliveries(token) {
            return axios.get("/delivery", {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async create(token, data) {
            return axios.post("/delivery", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async delete(token, id) {
            return axios.delete(`/delivery/${id}`, {
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

        async getAllTE(token) {
            return axios.get("/product/te", {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async getAllLam(token) {
            return axios.get("/product/lam", {
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

    email: {
        async sendEmail(token, data) {
            return axios.post("/email-order", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        }
    }


};

export default API;