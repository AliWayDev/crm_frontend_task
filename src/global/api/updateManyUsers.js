import axios from "axios"
import { globalVars } from "../vars"

export const updateManyUser = async (data) => {
    try {
        const response = await axios.put(`${globalVars.API_URL}users`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}
