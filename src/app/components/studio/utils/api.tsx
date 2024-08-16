import axios from 'axios';

export const fetchContents = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API2_URL}contents/`);
    return response.data;
};

export const saveContent = async (id: string, data: any) => {
    return await axios.put(`${process.env.NEXT_PUBLIC_API2_URL}contents/${id}`, data);
};

export const deleteContent = async (id: string) => {
    return await axios.delete(`${process.env.NEXT_PUBLIC_API2_URL}contents/${id}`);
};
