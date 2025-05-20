import { toast } from "react-toastify";
import axios from "./axios";
import { IApiRes, IUser } from "../types";
import {
	AddTokenToLocalStorage,
	asyncWrapper,
	getTokenFromLocalStorage,
	removeTokenFromLocalStorage,
} from "../utils";

export const signup = async (cred: IUser) =>
	asyncWrapper(async () => {
		const { data } = (await axios.post("/auth/signup", cred)) as IApiRes;
		data?.token && AddTokenToLocalStorage(data?.token);
    data?.message && (toast.success(data.message))
		return data;
	});

export const login = async (cred: IUser) =>
	asyncWrapper(async () => {
		const { data } = (await axios.post("/auth/login", cred)) as IApiRes;
		data?.token && AddTokenToLocalStorage(data?.token);
    data?.message && (toast.success(data.message))
		return data;
	});

export const logout = async () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/auth/logout", {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		removeTokenFromLocalStorage();
		toast.success(data.message);
		return data;
	});

export const getProfile = async () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/auth/me", {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const updateProfile = async (user: IUser) =>
	asyncWrapper(async () => {
		const { data } = (await axios.patch("/auth/me", user, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});
