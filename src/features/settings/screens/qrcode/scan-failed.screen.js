import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';

export const ScanFailedScreen = ({ navigation }) => {
	let animation = null;

	useEffect(() => {
		animation.play();
	}, []);

	return (
		<SafeArea>
			<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
				<LottieView
					ref={(input) => {
						animation = input;
					}}
					key='animation'
					resizeMode='cover'
					duration={1500}
					style={{
						width: 300,
						height: 300,
					}}
					loop={false}
					onAnimationFinish={() => {
						navigation.navigate('ListUserScan');
					}}
					source={require('../../../../../assets/icon-failed.json')}
				/>
			</View>
		</SafeArea>
	);
};
