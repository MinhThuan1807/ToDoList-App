import authorizeAxiosInstance from '../utils/authorizeAxios'
import { API_URL } from '../utils/constants'

const getAllTasksByUserId = async (userId: string) => {
  return await authorizeAxiosInstance.get(`${API_URL}/v1/tasks/user/${userId}`)
}

const createTask = async (taskData: { title: string; userId: string }) => {
  return await authorizeAxiosInstance.post(`${API_URL}/v1/tasks`, taskData)
}

const toggleCheck = async (taskId: string, currentStatus: boolean) => {
  return await authorizeAxiosInstance.patch(`${API_URL}/v1/tasks/${taskId}`, {
    status: !currentStatus
  })
}

const deleteTask = async (taskId: string) => {
  return await authorizeAxiosInstance.delete(`${API_URL}/v1/tasks/${taskId}`)
}

export const taskService = {
  getAllTasksByUserId,
  createTask,
  toggleCheck,
  deleteTask
}
