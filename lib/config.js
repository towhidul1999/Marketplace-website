// "use client";
import axios from "axios";
import Cookies from "js-cookie";
import { base } from "./constant";
const token =  Cookies.get("accessToken");

const baseAxios = axios.create({
  baseURL: `${base}/v1`,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar", Authorization: `Bearer ${token}` },
});

export default baseAxios;
