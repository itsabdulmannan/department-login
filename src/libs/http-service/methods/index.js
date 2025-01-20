import axios from "../../http-service/config/axios.config";



export const postRequest = async (url, data, params = {}) => {
    try {
        console.log(url)
        console.log(data)
        console.log(params)
        const response = await axios.post(url, data, params );
        console.log("RESPONSE:", response)
        return response.data;
    } catch (error) {
        return errorHandler(error);
    }
};
export const getRequest = async (url, params= {}) => {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        // return errorHandler(error);
    }
};
export const putRequest = async (url, data, params = {}) => {
    try {
     
        const response  = await axios.put(url, data, { params });
        return response.data;
    } catch (error) {
        // return errorHandler(error);
    }
};
export const patchRequest = async (url , data , params = {}) => {
    try {
        const response = await axios.patch(url, data, { params });
        return response.data;
    } catch (error) {
        // return errorHandler(error);
        console.log(error)
    }
};
export const deleteRequest  = async (url , params  = {}) => {
    try {
        const response = await axios.delete(url, { params });
        console.log(response)
        return response?.data;
    } catch (error) {
        // return errorHandler(error);
        console.log(error)
    }
}

export const errorHandler = (error) => {
    let message = "An unknown error occurred.";

    if (error.response) {
        const res = error.response.data;
        if (error.response.status === 401) {
            // toastr.error('Session expired. Please log in again.');
            // errorToaster(warningMessages.sessionExpired);
            
         }
        // else {
        //     toastr.error('Something went wrong. Please try again later.');
        //     // errorToaster(errorMessages.somethingWentWrong);
        // }
        if (res) {
            message = res.message || res.metadata?.message || message;
            
        } else {
            message = JSON.stringify(res);
        }
    } else if (error?.message) {
        message = error.message;
        // toastr.error(message);
        
    }

    return { error: message };
};
