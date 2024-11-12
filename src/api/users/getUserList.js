import { apiClient } from "../axios";
export const getUserList = async (token) => {
  try {
    const response = await apiClient.get("/user/?page=1&limit=20", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, error: null }; // Assuming you want to return the response data
  } catch (error) {
    return { data: null, error };
  }
};
