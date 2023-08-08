import { toast } from 'react-toastify';

export const showNotify = (status, msg, config = {}) => {
    const configPadrao = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
    }
    toast[status](msg, {
        ...config, ...configPadrao
    });
}

export const formateDate = (date) => {
    date = new Date(date)
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return formattedDate
}

export const formatData = (data) => {
    const date = new Date(data)
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return formattedDate
}