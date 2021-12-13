import client from "./client"

export const createCourse = async ({ user_id, name, description }) => {
    const { data } = await client.post(`/courses`, { user_id, name, description })
    return data
}