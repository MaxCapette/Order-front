// // chatApi.ts
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import myAxiosInstance from "../../api/axios";

// const sendMessage = async (message: string) => {
//   const postData = {
//     topic: "https://localhost/demo/books/1.jsonld",
//     data: JSON.stringify({ key: message }),
//   };
//   await myAxiosInstance.post("/.well-known/mercure", postData);
// };
// export default sendMessage;

// const sendMessageThunk = createAsyncThunk(
//   "chat/SEND_MESSAGE",
//   async (message: string) => {
//     const postData = {
//       topic: "https://localhost/demo/books/1.jsonld",
//       data: JSON.stringify({ key: message }),
//     };
//     const result = await myAxiosInstance.post("/.well-known/mercure", postData);return result.data;
//   }
// );
