import axios from "axios"
import { globalVars } from "../vars"

export const deleteUsers = async (data) => {
    console.log(data)
    try {
        const response = await axios.delete(`${globalVars.API_URL}users`, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            data,
        });

        return response.data
    } catch (e) {
        console.log(e)
    }
}
