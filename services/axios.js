import axios from "axios";
import {toast} from "react-hot-toast";

export const headers = {
	"Access-Control-Allow-Origin": "*",
	"Content-Type": "application/json",
	// 'Authorization': 'Bearer $2a$10$I49vzP56RBiMpgWsAVz8Wep1diqELvofSsHXu0q391oJc6qQUN8hC',
};

const instance = axios.create({
	baseURL: "/api",
	headers: headers,
});

// // Add a request interceptor
instance.interceptors.request.use(
	function (config) {
		// config.headers.token = localStorage.getItem('token');

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		toast.error("No connection");
		if (error.response) {
			if (error.response.status === 400) {
			}
			if (error.response.status === 401) {
			}
			if (error.response.status === 441) {
			} else {
			}
		}
		return Promise.reject(error);
	}
);

// export const swrFetcher = url => instance(url).then(res => res.data);
export const swrFetcher = p => {
	const t = typeof p === "string" ? p : {url: p[0], params: p[1]};
	return instance(t).then(res => res.data);
};

export default instance;
