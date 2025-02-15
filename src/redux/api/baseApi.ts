import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5000/api/v1",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       console.log("header set token",token);
//       headers.set("authorization", `${token}`);
//     }
//     return headers;
//   },
// });
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log("🔍 Sending Token in Header:", token); // ✅ Check if correct token is sent
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});


// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {

//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {

//     console.log("sending refresh token");

//     const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
//       method: "POST",
//      credentials: "include",
//     });

//     const data = await res.json();

//     console.log("refresh token data",data);

    
//     // console.log("user print from base api", user);
    
//     if (data?.data?.accessToken) {
      
//       const user = (api.getState() as RootState).auth.user;
     
//       api.dispatch(
//         setUser({
//           user,
//           token: data?.data?.accessToken,
//         })
//       );

//       result = await baseQuery(args, api, extraOptions);

//       console.log("Token update success ✔");


//     } else {
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Access Token Expired, Refreshing...");
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include", // ✅ কুকি পাঠাতে হবে
    });

    const data = await res.json();
    // console.log(data.data.accessToken);

    if (data.data.accessToken) {
      console.log("New Access Token Received:", data.data.accessToken);
     await api.dispatch(
        setUser({
          user: api.getState().auth.user,
          token: data.data.accessToken, // ✅ Redux-এ নতুন Token Update
        })
      );
      
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay 100ms  



      result = await baseQuery(args, api, extraOptions); // ✅ নতুন Token দিয়ে Request Retry করো
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};




export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,

  endpoints: () => ({}),
});
