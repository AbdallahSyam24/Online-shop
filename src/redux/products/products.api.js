import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8082";



export const getAll = async () => {
    try {
        const url = "/product";
        const res = await axios.get(url);

        return res.data.items.map(item => {
            return {
                id: item.productNumber,
                title: item.name,
                description: item.description,
                price: item.price,
                stock: item.stock,
                image: item.imageUrl
            }
        });
    } catch (error) {
        throw error;
    }
}

export const getByID = async (id) => {
    try {
        const url = `/product/${id}`;
        const res = await axios.get(url);

        return {
            id: res.data.productNumber,
            title: res.data.name,
            description: res.data.description,
            price: res.data.price,
            stock: res.data.stock,
            image: res.data.imageUrl
        };
    } catch (error) {
        throw error;
    }
}

export const deleteByID = async (id) => {
    try {
        const url = `product/${id}`;
        const res = await axios.delete(url)

        return res.data;
    } catch (error) {
        throw error;
    }
}

export const createNew = async (data) => {
    const newData = {
        productNumber: data.id,
        name: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl
    }

    try {
        const url = "http://localhost:8082/product";
        const res = await axios.post(url, newData);

        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateByID = async (id, data) => {
    const newData = {
        productNumber: data.id,
        name: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl
    }
    try {
        const url = `/product/${id}`;
        const res = await axios.put(url, newData);

        return res.data;
    } catch (error) {
        throw error;
    }
}

export const checkout = async (data) => {
    try {
        const url = "http://localhost:8082/order";
        const res = await axios.post(url, data);

        return res.data;
    } catch (error) {
        throw error;
    }
}

export const addComment = async (productID, data) => {
    const postData = {
        productNumber: productID,
        description: data
    }

    try {
        const url = `http://localhost:8082/review/${productID}`;
        const res = await axios.post(url, postData);

        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getComment = async (productID) => {
    try {
        const url = `http://localhost:8082/review/${productID}`;
        const res = await axios.get(url);

        return res.data;
    } catch (error) {
        throw error;
    }
}