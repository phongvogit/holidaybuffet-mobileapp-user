import { firestore } from '../../firebase/firebase.utils';

export const getAllUsersRequest = async () => {
	const results = [];
	const usersRef = firestore.collection('users');
	const snapshot = await usersRef.get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const getAllScannedListRequest = async () => {
	const results = [];
	const scannedListRef = firestore
		.collection('scannedLists')
		.orderBy('createdAt', 'desc')
		.limit(10);
	const snapshot = await scannedListRef.get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const getUserByUserIdRequest = async (userId) => {
	let result = null;
	const userRef = firestore.doc(`users/${userId}`);
	const doc = await userRef.get();
	if (doc.exists) {
		result = {
			id: doc.id,
			...doc.data(),
		};
	} else {
		return Promise.reject(new Error('This id_user does not exist'));
	}
	return result;
};

export const getAllFeedbacksByUserIdRequest = async (userId) => {
	let results = [];
	const feedbackRef = firestore.collection(`users/${userId}/feedbacks`);
	const snapshot = await feedbackRef.get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const updateListCheckInByUserIdRequest = async (
	userId,
	listDateCheckIn
) => {
	try {
		let result = null;
		const createdAt = new Date();
		listDateCheckIn.push(createdAt);
		const noCheckIn = listDateCheckIn.length;
		const userRef = firestore.doc(`users/${userId}`);
		await userRef.update({ listDateCheckIn });
		await userRef.update({ noCheckIn });
		const doc = await userRef.get();
		if (doc.exists) {
			result = {
				id: doc.id,
				...doc.data(),
			};
		} else {
			return Promise.reject(new Error('This id_user does not exist'));
		}
		return result;
	} catch (e) {
		console.log('error updating listCheckIn: ', e.message);
	}
};

export const deleteScannedListUserByIdRequest = (id) => {
	try {
		firestore.doc(`scannedLists/${id}`).delete();
	} catch (e) {
		console.log('Error delete scanned list, ', e.message);
	}
};
