export const BASE_URL = "http://localhost:8000";

//utils/apiPaths.js

export const API_PATHS = {
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getUser"
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard",
    },
    INCOME:{
        ADD_INCOME:"/api/v1/income/add",
        ADD_EXPENSE:"/api/v1/expense/add",
        GET_ALL_EXPENSE:"/api/v1/expense/get",
        GET_ALL_INCOME:"/api/v1/income/get",
        DELETE_EXPENSE:(expenseId)=>`/api/v1/expense/${expenseId}`,
        DELETE_INCOME:(incomeId)=>`/api/v1/income/${incomeId}`,
        DOWNLOAD_EXPENSE:`/api/v1/expense/downloadexcel`,
         DOWNLOAD_INCOME:`/api/v1/income/downloadexcel`
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/uploads-image",
    },
}