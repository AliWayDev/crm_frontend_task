import React from 'react'
import { updateOneUser } from '../../../../global/api/updateOneUser';
import { toast } from 'react-toastify';
import { deleteUsers } from '../../../../global/api/deleteUsers';
import { useNavigate } from 'react-router-dom';

export const ListItem = (props) => {
    const navigate = useNavigate()

    const { name, email, lastActivity, status, selectUserHandler, id, isChecked, setUpdate } = props;

    const isBlocked = status !== 'Active' ? true : false

    const blockHandler = async (id) => {
        await updateOneUser(id, {
            status: 'Blocked'
        })

        setUpdate(true)
        toast.success('Blocked!')
    }

    const unBlockHandler = async (id) => {
        await updateOneUser(id, {
            status: 'Active'
        })

        setUpdate(true)
        toast.success('Unblocked!')
    }

    const deleteHandler = async (id) => {
        await deleteUsers([id])

        const myOwnId = localStorage.getItem('id')

        if (id === myOwnId) {
            return navigate('/login')
        }

        setUpdate(true)
        toast.success('Deleted!')
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input onChange={(e) => selectUserHandler(e, id)} checked={isChecked} id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {name}
            </th>
            <td className="px-6 py-4">
                {email}
            </td>
            <td className="px-6 py-4">
                {lastActivity  ? lastActivity : '-'}
            </td>
            <td className={`px-6 py-4 font-bold text-base ${isBlocked ? 'text-red-600' : 'text-green-600'}`}>
                {status}
            </td>
            <td className="flex items-center px-6 py-4">
                <button disabled={!isBlocked} onClick={() => unBlockHandler(id)} className={`font-medium ${isBlocked && 'text-green-600 hover:underline'} dark:text-green-500 ms-3`}>Unblock</button>
                <button disabled={isBlocked} onClick={() => blockHandler(id)} className={`font-medium ${!isBlocked && 'text-blue-600 hover:underline'} dark:text-blue-500 ms-3`}>Block</button>
                <button onClick={() => deleteHandler(id)} className={`font-medium text-red-600 hover:underline dark:text-red-500 ms-3`}>Delete</button>
            </td>
        </tr>
    )
}
