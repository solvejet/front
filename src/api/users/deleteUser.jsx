import { apiClient } from "../axios";
export const deleteUser = async (token, id) => {
  try {
    const response = await apiClient.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, error: null }; // Return data and null error return response.data;  // Assuming you want to return the response data
  } catch (error) {
    // console.error("Error fetching columns:", error);
    return { data: null, error }; // Return null data and error
  }
};
