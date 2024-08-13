import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface TopPropertyCardProps {
	property: Property;
	likePropertyHandler: any;
}

const TopPropertyCard = (props: TopPropertyCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	const pushDetailHandler = async (propertyId: string) => {
		console.log('propertyId:', propertyId);
		await router.push({ pathname: '/property/detail', query: { id: propertyId } });
	};

	if (device === 'mobile') {
		return (
			<Stack className="top-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => {
						pushDetailHandler(property._id);
					}}
				>
					<div>${property?.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong
						className={'title'}
						onClick={() => {
							pushDetailHandler(property._id);
						}}
					>
						{property?.propertyTitle}
					</strong>
					<p className={'desc'}>{property?.propertyAddress}</p>
					<div className={'options'}>
						<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
							<div>
								<img src="/img/icons/diriven.png" alt="" />
								<span>{property.propertyDrivenDistance} km</span>
							</div>
							<div>
								<img src="/img/icons/transmission.png" alt="" />
								<span>{property.propertyTransmission} </span>
							</div>
						</div>
						<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
							<div>
								<img src="/img/icons/fuel.png" alt="" />
								<span>{property.propertyFuel} </span>
							</div>

							<div>
								<img src="/img/icons/year.png" alt="" />
								<span>{property.propertyManufacturedYear} </span>
							</div>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p> {property.propertyRent ? 'Rent' : ''}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => {
						pushDetailHandler(property._id);
					}}
				>
					<div>${property?.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong
						className={'title'}
						onClick={() => {
							pushDetailHandler(property._id);
						}}
					>
						{property?.propertyTitle}
					</strong>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img
							className="location-img"
							style={{ width: '20px', height: '20px' }}
							src="/img/icons/location.webp"
							alt=""
						/>
						<p className={'desc'}>{property.propertyAddress}</p>
					</div>
					<div className={'options'}>
						<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
							<div>
								<img src="/img/icons/diriven.png" alt="" />
								<span>{property.propertyDrivenDistance} km</span>
							</div>
							<div>
								<img src="/img/icons/transmission.png" alt="" />
								<span>{property.propertyTransmission} </span>
							</div>
						</div>
						<div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
							<div>
								<img src="/img/icons/fuel.png" alt="" />
								<span>{property.propertyFuel} </span>
							</div>

							<div>
								<img src="/img/icons/year.png" alt="" />
								<span>{property.propertyManufacturedYear} </span>
							</div>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p> {property.propertyRent ? 'Rent' : ''}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default TopPropertyCard;
