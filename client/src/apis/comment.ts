import axios from "./axios";
import { asyncWrapper, getTokenFromLocalStorage } from "../utils";
import { IApiRes, IComment } from "../types";

export const createComment = (comment: IComment) =>
	asyncWrapper(async () => {
		const { data } = (await axios.post("/comment", comment, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const getComments = () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/comment", {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const updateComment = (id: string, comment: IComment) =>
	asyncWrapper(async () => {
		const { data } = (await axios.patch(`/comment/${id}`, comment, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const deleteComment = (id: string) =>
	asyncWrapper(async () => {
		const { data } = (await axios.delete(`/comment/${id}`, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});
