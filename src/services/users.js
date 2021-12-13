import client from "./client";


export const getUsers = async () => {
    const { data } = await client.get("/users");
    return data;
}

export const getUser = async (id) => {
    const { data } = await client.get(`/users/${id}`);
    return data;
}


export const createUser = async (user) => {
    const { data } = await client.post("/users", user);
    return data;
}

export const deleteUser = (id) => {
    return client.delete(`/users/${id}`)
}

export const editUser = (id, data) => {
    return client.put(`/users/${id}`, data)
}

export const getUserCourses = async (id) => {
    const { data } = await client.get(`/users/${id}/courses`)
    return data
}