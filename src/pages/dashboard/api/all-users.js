import axios from "axios"
import { globalVars } from "../../../global/vars"

export const getAllUsers = async () => {
    const res = await axios.get(`${globalVars.API_URL}all-users`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })

    return res.data.data
}
