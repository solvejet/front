import { apiClient } from "../../axios"
export const userColumns = async (token) => {
    try {
        const response = await apiClient.get("/schema", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Custom-Header': 'Custom-Value'
            }
        });
        return response.data;  // Assuming you want to return the response data
    } catch (error) {
        console.error("Error fetching columns:", error);
        throw error;  // Optionally, rethrow or handle the error as needed
    }
}
