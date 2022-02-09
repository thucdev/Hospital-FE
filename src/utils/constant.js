export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080/v1/api'
        : 'https://sleepy-inlet-56101.herokuapp.com/api'

export const ACCESS_TOKEN = 'accessToken'
