import { Box, Button, Stack } from '@mui/material';
import React from 'react';

const Info = () => {
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
						<Button className="btn" variant="contained" size="large">
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
						<Button className="btn" variant="contained" size="large">
							Sell your car
						</Button>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Info;
