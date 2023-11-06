import Axios from "axios";

let alertDisplayed = false;

const axios = Axios.create({
    baseURL: "http://85.215.34.177:3305/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401 && !alertDisplayed) {
            alert("Votre session a expiré, veuillez vous reconnecter");
            alertDisplayed = true;
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);


const API = {
    auth: {
        async signin(email, password) {
            return axios.post("/auth/signin", { email, password });
        },

        async refreshToken({ id, email, firstname, lastname, role }) {
            return axios.post("/auth/refresh-token", { id, firstname, lastname, email, role });
        }
    },

    user: {
        async account(token) {
            return axios.get("/account", {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async getAccounts(token) {
            return axios.get("/account/all", {
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

        async delete(token, id) {
            return axios.delete(`/account/${id}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async updatePassword(data) {
            return axios.patch("/account/update-password", data);
        },

        async accountToValidate(token) {
            return axios.get("/account/validation", {
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

        async create(data) {
            return axios.post("/address", data);
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
        },

        async create(token, data) {
            return axios.post("/range", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async update(token, id, data) {
            return axios.patch(`/range/${id}`, data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async delete(token, id) {
            return axios.delete(`/range/${id}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
        }
    },

    email: {
        async sendEmail(token, data) {
            return axios.post("/email/order", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async sendConfirmationEmail(token, data) {
            return axios.post("/email/validation", data, {
                headers: {
                    "x-auth-token": token,
                }
            });
        },

        async verifyEmail(data) {
            return axios.post("/account/verify-email", data);
        },

        async reset(token, data) {
            return axios.post("/email/reset", data, {
                headers: {
                    "x-auth-token": token,
                }
            });
        },

        async forgotPassword(data) {
            return axios.post("/email/forgot-password", data);
        },

        async checkResetPasswordToken(token) {
            return axios.get(`/account/find-by-token/${token}`);
        }

    },

    upload: {
        async image(token, data) {
            return axios.post("/upload/image", data, {
                headers: {
                    "x-auth-token": token,
                    'Content-Type': 'multipart/form-data',
                },
            });
        },

        async pdf(token, data) {
            return axios.post("/upload/pdf", data, {
                headers: {
                    "x-auth-token": token,
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
    },

    techsheet: {

        async getTechsheets(token) {
            return axios.get("/techsheet", {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async create(token, data) {
            return axios.post("/techsheet", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        }
    },

    rangeHasTechsheet: {

        async getRangeHasTechsheets(token) {
            return axios.get("/rangeHasTechsheet", {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async create(token, data) {
            return axios.post("/rangeHasTechsheet", data, {
                headers: {
                    "x-auth-token": token,
                },
            });
        },

        async delete(token, data) {
            console.log(data);
            console.log(token);
            return axios.delete("/rangeHasTechsheet/", {
                headers: {
                    "x-auth-token": token,
                },
                params: {
                    range_id: data.range_id,
                    techsheet_id: data.techSheet_id
                }
            });
        }
    },

};

export default API;