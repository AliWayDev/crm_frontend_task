import React from 'react'
import { toast } from 'react-toastify'
import { updateManyUser } from '../../../../global/api/updateManyUsers'
import { deleteUsers } from '../../../../global/api/deleteUsers'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../../../global/store/authStore'

export const TableActions = ({ selecteds, setUpdate, setSelecteds }) => {
    const navigate = useNavigate()
    const logout = useAuthStore((state) => state.logout);

    const blockAndUblockHandler = async (type) => {
        const conditionFromType = type === 'block'

        const sample = selecteds.map((i) => {
            return {
                id: i._id,
                data: { status: conditionFromType ? 'Blocked' : 'Active' }
            }
        })

        await updateManyUser(sample)

        const myOwnId = localStorage.getItem('id')

        const sampleFromJustIds = selecteds.map(i => i._id)

        if (sampleFromJustIds.includes(myOwnId) && conditionFromType) {
            logout()
            return navigate('/login')
        }

        setSelecteds([])
        setUpdate(true)
        toast.success(conditionFromType ? 'Blocked!' : 'Unblocked!')
    }

    const deleteHandler = async () => {
        const sample = selecteds.map((i) => {
            return i._id
        })

        await deleteUsers(sample)

        const myOwnId = localStorage.getItem('id')

        if (sample.includes(myOwnId)) {
            logout()
            return navigate('/login')
        }

        setSelecteds([])
        setUpdate(true)
        toast.success("Deleted!")
    }

    return (
        <div className="w-full my-4">
            <button type="button" onClick={() => blockAndUblockHandler('unblock')} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Unblock</button>
            <button type="button" onClick={() => blockAndUblockHandler('block')} className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Block</button>
            <button type="button" onClick={() => deleteHandler()} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
        </div>
    )
}
