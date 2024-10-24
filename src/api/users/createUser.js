

import { apiClient } from "../axios"
export const createUser = async (token, userData) => {
    try {

        const response = await apiClient.post("/users/create", JSON.stringify(userData), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Custom-Header': 'Custom-Value'
            }
        }); return { data: response.data, error: null };  // Return data and null error return response.data;  // Assuming you want to return the response data
    } catch (error) {
        console.error("Error fetching columns:", error);
        return { data: null, error };  // Return null data and error
    }
}
