import React from 'react';
import { Stack, Typography, Box, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const PropertyCard = (props: PropertyCardType) => {
	const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = property?.propertyImages[0]
		? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/property/detail',
							query: { id: property?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{property && property?.propertyRank > topPropertyRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(property?.propertyPrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/property/detail',
									query: { id: property?._id },
								}}
							>
								<Typography>{property.propertyTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								<img
									className="location-img"
									style={{ width: '20px', height: '20px' }}
									src="/img/icons/location.webp"
									alt=""
								/>
								{property.propertyAddress}, {property.propertyLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<div
								style={{
									marginTop: '65px',
									marginRight: '80px',
									display: 'flex',
									gap: '20px',
									flexDirection: 'column',
								}}
							>
								<div>
									<img src="/img/icons/diriven.png" alt="" />
									<span>{property.propertyDrivenDistance} km</span>
								</div>
								<div>
									<img src="/img/icons/transmission.png" alt="" />
									<span>{property.propertyTransmission} </span>
								</div>
							</div>
							<div
								style={{
									marginTop: '65px',
									marginRight: '50px',
									display: 'flex',
									gap: '20px',
									flexDirection: 'column',
								}}
							>
								<div>
									<img src="/img/icons/fuel.png" alt="" />
									<span>{property.propertyFuel} </span>
								</div>

								<div>
									<img src="/img/icons/year.png" alt="" />
									<span>{property.propertyManufacturedYear} </span>
								</div>
							</div>
						</Stack>
					</Stack>

					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={property.propertyRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
						</Stack>
						<Link
							style={{
								padding: '8px 30px',

								borderRadius: '10px',
								background: '#c429ad',
								color: '#fff',
							}}
							href={{
								pathname: '/property/detail',
								query: { id: property?._id },
							}}
						>
							Check detail
						</Link>
					</Stack>
				</Stack>

				{!recentlyVisited && (
					<Stack className="buttons">
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{property?.propertyViews}</Typography>
						<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
							{myFavorites ? (
								<FavoriteIcon color="primary" />
							) : property?.meLiked && property?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon color="primary" />
							) : (
								<FavoriteBorderIcon />
							)}
						</IconButton>
						<Typography className="view-cnt">{property?.propertyLikes}</Typography>
					</Stack>
				)}
			</Stack>
		);
	}
};

export default PropertyCard;
