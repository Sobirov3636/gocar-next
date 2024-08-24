import { Box, Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { userVar } from '../../../apollo/store';
import { useReactiveVar } from '@apollo/client';
import { sweetBasicAlert } from '../../sweetAlert';

const Info = () => {
	const user = useReactiveVar(userVar);
	const router = useRouter();

	const handleInventoryClick = () => {
		router.push('/property');
	};

	const handleSellCarClick = () => {
		if (user?.memberType === 'DEALER') {
			router.push('/mypage?category=addProperty');
		} else {
			sweetBasicAlert('Only dealers add cars to sell. Please sign up as a dealer!');
		}
	};

	return (
		<Stack className="info-container">
			<Stack className="container-box">
				<Stack className="box-1">
					<img src="/img/icons/searchcar.png" alt="" />
					<Box className="desc-box">
						<h2>Looking for a car?</h2>
						<p>
							Our cars are delivered fully-registered with all requirements completed. We’ll deliver your car wherever
							you are.
						</p>
						<Button className="btn" variant="contained" size="large" onClick={handleInventoryClick}>
							Inventory
						</Button>
					</Box>
				</Stack>

				<Stack className="box-2">
					<img src="/img/icons/cardollor.webp" alt="" />
					<Box className="desc-box">
						<h2>Want to sell a car?</h2>
						<p>
							Receive the absolute best value for your trade-in vehicle. We even handle all paperwork. Schedule
							appointment!
						</p>
						<Button className="btn" variant="contained" size="large" onClick={handleSellCarClick}>
							Sell your car
						</Button>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Info;
