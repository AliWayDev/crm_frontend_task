import axios from "axios"
import { globalVars } from "../vars"

export const updateOneUser = async (id, data) => {
    try {
        const response = await axios.put(`${globalVars.API_URL}user/${id}`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}
