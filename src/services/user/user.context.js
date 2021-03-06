import React, { useState, useEffect, createContext } from 'react';
import {
	getAllUsersRequest,
	getUserByUserIdRequest,
	getAllFeedbacksByUserIdRequest,
	updateListCheckInByUserIdRequest,
	getAllScannedListRequest,
	deleteScannedListUserByIdRequest,
} from './user.service';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [scannedListUsers, setScannedListUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getAllUsers = () => {
		setIsLoading(true);
		getAllUsersRequest()
			.then((results) => {
				setUsers(results);
				setIsLoading(false);
			})
			.catch((e) => console.log('Get All Users error: ', e.message));
	};

	const getUserByUserId = (userId) => {
		return getUserByUserIdRequest(userId);
	};

	const deleteScannedListUserById = (id) => {
		deleteScannedListUserByIdRequest(id);
	};

	const getAllFeedbacksByUserId = (userId) => {
		return getAllFeedbacksByUserIdRequest(userId);
	};

	const updateListCheckInByUser = (user) => {
		return updateListCheckInByUserIdRequest(user);
	};

	const getAllUserScannedLists = () => {
		getAllScannedListRequest()
			.then((results) => {
				setScannedListUsers(results);
			})
			.catch((e) => {
				console.log('Error Get All ScannedList', e.message);
			});
	};

	const checkInForUser = () => {};

	useEffect(() => {
		function callback() {
			getAllUsers();
		}
		callback();
	}, []);

	return (
		<UserContext.Provider
			value={{
				users,
				checkInForUser,
				getUserByUserId,
				getAllFeedbacksByUserId,
				getAllUsers,
				updateListCheckInByUser,
				getAllUserScannedLists,
				deleteScannedListUserById,
				scannedListUsers,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
