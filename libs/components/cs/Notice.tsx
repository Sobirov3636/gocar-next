import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { NoticeInquiry } from '../../types/notice/notice.input';
import { useQuery } from '@apollo/client';
import { GET_NOTICES } from '../../../apollo/user/query';
import { NoticeType } from '../../types/notice/notice';
import { T } from '../../types/common';

const Notice = ({ initialNotice, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [noticeInquiry, setNoticeInquity] = useState<NoticeInquiry>(initialNotice);
	const [propertyNotices, setPropertyNotices] = useState<NoticeType[]>([]);
	const [noticeTotal, setNoticeTotal] = useState<number>(0);

	/** APOLLO REQUESTS **/
	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticesError,
		refetch: getNoticesRefetch,
	} = useQuery(GET_NOTICES, {
		fetchPolicy: 'network-only',
		variables: { input: initialNotice },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setPropertyNotices(data?.getNotices?.list);
			setNoticeTotal(data?.getNotices?.metaCounter[0]?.total);
		},
	});

	/** LIFECYCLES **/

	useEffect(() => {
		if (noticeInquiry) {
			getNoticesRefetch({ input: noticeInquiry });
		}
	}, [noticeInquiry, getNoticesRefetch]);

	/** HANDLERS **/

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<Stack className={'notice-content'}>
				<span className={'title'}>Notice</span>
				<Stack className={'main'}>
					<Stack className={'top'}>
						<span>number</span>
						<span>title</span>
						<span>date</span>
					</Stack>
					<Stack className={'bottom'}>
						{propertyNotices.map((notice: any, index: any) => (
							<div className={`notice-card ${notice?.event && 'event'}`} key={notice.title}>
								{notice?.event ? <div>event</div> : <span className={'notice-number'}>{index}</span>}
								<span className={'notice-title'}>{notice.noticeTitle}</span>
								<span className={'notice-date'}>{notice.createdAt}</span>
							</div>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

Notice.defaultProps = {
	initialNotice: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'DESC',
	},
};

export default Notice;
