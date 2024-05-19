import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8082";



export const getAll = async () => {
    try {
        const url = "/order";
        const res = await axios.get(url);

        return res.data.items;
    } catch (error) {
        throw error;
    }
}

export const getByID = async (id) => {
    try {
        const url = `/order/${id}`;
        const res = await axios.get(url);

        return res.data;

    } catch (error) {
        throw error;
    }
}

export const updateOrderStatus = async (id, newValue) => {
    try {
        const url = `/order/${id}`;
        const res = await axios.put(url, { newValue });

        return res.data;

    } catch (error) {
        throw error;
    }
}