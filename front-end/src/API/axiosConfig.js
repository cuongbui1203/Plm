import axios from "axios";

const config = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  // "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
};

const net = axios.create(config);
export { net };
