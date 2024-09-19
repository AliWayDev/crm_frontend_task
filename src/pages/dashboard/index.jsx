import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListItem } from "./components/list-item";
import { TableHead } from "./components/table-head";
import { TableActions } from "./components/table-actions";
import { Header } from "./components/header";
import useAuthStore from "../../global/store/authStore";
import { getAllUsers } from "./api/all-users";
import { Loader } from "../../components/UI/Loader";
import { getCurrentDate } from "../../utils";
import { updateOneUser } from "../../global/api/updateOneUser";

export const Dashboard = () => {
	const navigate = useNavigate();
	const isAuth = useAuthStore((state) => state.isAuthenticated);

	const [selectedUsers, setSelectedUsers] = useState([]);
	const [isAllUsersSelected, setIsAllUsersSelected] = useState(false);
	const [isUsersSelected, setIsUsersSelected] = useState(false);
	const [users, setUsers] = useState()
	const [updateList, setUpdateList] = useState(false)

	const removeFromSelecteds = (id) => {
		setSelectedUsers((l) => l.filter((item) => item._id !== id));
	};

	const selectAllUsers = (e) => {
		let value = e?.target?.checked;

		const usersSample = users.map((i) => {
			return {
				_id: i._id,
				isChecked: value,
			};
		});

		if (value) {
			setSelectedUsers(usersSample);
			setIsAllUsersSelected(true)
		} else {
			setSelectedUsers([])
			setIsAllUsersSelected(false)
		}

	};

	const selectUserHandler = (e, id) => {
		let value = e?.target?.checked;

		let userSample = {
			_id: id,
			isChecked: value,
		};

		if (value) {
			setSelectedUsers((p) => [...p, userSample]);
		} else {
			removeFromSelecteds(id);
		}
	};

	const isCheckedHandler = (id) => {
		let res = false

		for (let i of selectedUsers) {
			if (i._id === id) {
				res = true
			}
		}

		return res
	}

	useEffect(() => {
		(async () => {
			const users = await getAllUsers()

			setUsers(users)
			setUpdateList(false)
		})();
	}, [updateList])

	useEffect(() => {
		if (!isAuth) {
			navigate("/login");
		} else {
			(async () => {
				await updateOneUser(localStorage.getItem('id'), {
					lastActivity: getCurrentDate()
				})
			})()
		}
	}, [isAuth, navigate]);

	useEffect(() => {
		console.log(selectedUsers);
	}, [selectedUsers]);

	useEffect(() => {
		if (selectedUsers.length !== users?.length) {
			setIsAllUsersSelected(false)
		} else {
			setIsAllUsersSelected(true)
		}

		if (selectedUsers.length > 1) {
			setIsUsersSelected(true)
		} else {
			setIsUsersSelected(false)
		}
	}, [selectedUsers, users])

	return (
		<div className="max-w-[1140px] mx-auto">
			<Header />
			{users === undefined ? (<Loader />) : (
				<>
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
						<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							<TableHead selectAllUsers={selectAllUsers} isChecked={isAllUsersSelected} />
							<tbody>
								{users && users.map((i) => (
									<ListItem
										key={i._id}
										name={i.name}
										email={i.email}
										lastActivity={i.lastActivity}
										status={i.status}
										selectUserHandler={selectUserHandler}
										id={i._id}
										isChecked={isCheckedHandler(i._id)}
										setUpdate={setUpdateList}
									/>
								))}
							</tbody>
						</table>
					</div>
					{isUsersSelected && (<TableActions selecteds={selectedUsers} setUpdate={setUpdateList} setSelecteds={setSelectedUsers} />)}
				</>
			)}
		</div>
	);
};
