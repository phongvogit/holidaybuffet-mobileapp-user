import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { VoucherContext } from '../../../../services/voucher/voucher.context';

export const ScanQRCode = ({ navigation }) => {
	const [hasPermission, setHasPermission] = useState(null);
	const { resetStateBeforeVerifyingQRCode } = useContext(VoucherContext);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned = async ({ type, data }) => {
		if (data) {
			resetStateBeforeVerifyingQRCode();
			navigation.navigate('ScanQRCodeLoading', { QRCode: data });
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
});
