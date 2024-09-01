import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface DealerCardProps {
	dealer: any;
	likeMemberHandler: any;
}

const DealerCard = (props: DealerCardProps) => {
	const { dealer, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = dealer?.memberImage
		? `${REACT_APP_API_URL}/${dealer?.memberImage}`
		: '/img/profile/defaultUser.svg';

	if (device === 'mobile') {
		return <div>DEALER CARD</div>;
	} else {
		return (
			<Stack className="dealer-general-card">
				<Link
					href={{
						pathname: '/dealer/detail',
						query: { dealerId: dealer?._id },
					}}
				>
					<Box
						component={'div'}
						className={'dealer-img'}
						style={{
							backgroundImage: `url(${imagePath})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}}
					>
						<div>{dealer?.memberProperties} properties</div>
					</Box>
				</Link>

				<Stack className={'dealer-desc'}>
					<Box component={'div'} className={'dealer-info'}>
						<Link
							href={{
								pathname: '/dealer/detail',
								query: { dealerId: 'id' },
							}}
						>
							<strong>{dealer?.memberFullName ?? dealer?.memberNick}</strong>
						</Link>
						<span>Dealer</span>
					</Box>
					<Box component={'div'} className={'buttons'}>
						<IconButton color={'default'}>
							<RemoveRedEyeIcon />
						</IconButton>
						<Typography className="view-cnt">{dealer?.memberViews}</Typography>
						<IconButton color={'default'} onClick={() => likeMemberHandler(user, dealer?._id)}>
							{dealer?.meLiked && dealer?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon color={'primary'} />
							) : (
								<FavoriteBorderIcon />
							)}
						</IconButton>
						<Typography className="view-cnt">{dealer?.memberLikes}</Typography>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default DealerCard;
