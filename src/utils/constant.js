export const apiUrl =
   process.env.NODE_ENV !== "production"
      ? "http://localhost:8080/v1/api"
      : // "https://hospital-backend-thucdev.herokuapp.com/v1/api"
        "https://hospital-backend-thucdev.herokuapp.com/v1/api"

export const ACCESS_TOKEN = "accessToken"
export const REFRESH_TOKEN = "refreshToken"
