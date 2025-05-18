import axios from "./axios";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import { asyncWrapper } from "../utils";
import { IApiRes } from "../types";

export const getUsers = async () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/user", {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});
