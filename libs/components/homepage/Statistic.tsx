import { Box, Stack } from '@mui/material';
import React from 'react';

const Statistic = () => {
	return (
		<Stack className="statistic-container">
			<Stack className="about-us">
				<Stack className="about-us-detail">
					<Box>
						<img style={{ color: 'white' }} src="/img/network.svg" alt="" width="48px" height="57px" />
					</Box>
					<Stack className="detail">
						<h3>Wide range of brands</h3>
						<p>With a robust selection of popular vehicles on hand, as well as leading vehicles from BMW and Ford.</p>
					</Stack>
				</Stack>
				<Stack className="about-us-detail">
					<Box>
						<img style={{ color: 'white' }} src="/img/message.svg" alt="" width="48px" height="57px" />
					</Box>
					<Stack className="detail">
						<h3>TRUSTED BY THOUSANDS</h3>
						<p>10 new offers every day. 350 offers on site, trusted by a community of thousands of users.</p>
					</Stack>
				</Stack>

				<Stack className="about-us-detail">
					<Box>
						<img style={{ color: 'white' }} src="/img/service.svg" alt="" width="48px" height="57px" />
					</Box>
					<Stack className="detail">
						<h3>SERVICE & MAINTENANCE</h3>
						<p>Our stress-free finance department that can find financial solutions to save you money.</p>
					</Stack>
				</Stack>
			</Stack>
			<Stack className="statistic-box">
				<Stack className="statistic-detail">
					<Box>
						<img style={{ color: 'white' }} src="/img/carssale.webp" alt="" width="48px" height="57px" />
					</Box>
					<Stack className="detail-info">
						<p>15500+</p>
						<h3>Cars for sale</h3>
					</Stack>
				</Stack>

				<Stack className="statistic-detail">
					<Box>
						<img style={{ color: 'white' }} src="/img/person.svg" alt="" width="48px" height="57px" />
					</Box>
					<Stack className="detail-info">
						<p>1,750+</p>
						<h3>Visitors per day</h3>
					</Stack>
				</Stack>

				<Stack className="statistic-detail">
					<Box>
						<img style={{ color: 'white' }} src="/img/reviews.webp" alt="" width="48px" height="57px" />
					</Box>
					<Stack className="detail-info">
						<p>3,500+</p>
						<h3>Dealer reviews</h3>
					</Stack>
				</Stack>

				<Stack className="statistic-detail">
					<Box>
						<img style={{ color: 'white' }} src="/img/verified.png" alt="" width="48px" height="57px" />
					</Box>
					<Stack className="detail-info">
						<p>250+</p>
						<h3>Verified dealers</h3>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Statistic;
