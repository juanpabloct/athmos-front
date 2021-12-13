import client from "./client"

export const createCourse = async ({ user_id, name, description }) => {
    const { data } = await client.post(`/courses`, { user_id, name, description })
    return data
}
export const deleteCourse = async (id) => {
    const { data } = await client.delete(`/courses/${id}`)
    return data
}