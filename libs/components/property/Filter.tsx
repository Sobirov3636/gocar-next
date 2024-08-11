import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import {
	PropertyFuel,
	PropertyLocation,
	PropertyManufacture,
	PropertyTransmission,
	PropertyType,
} from '../../enums/property.enum';
import { PropertiesInquiry } from '../../types/property/property.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { propertyMileage, propertyYears } from '../../config';
import RefreshIcon from '@mui/icons-material/Refresh';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

const thisYear = new Date().getFullYear();

interface FilterType {
	searchFilter: PropertiesInquiry;
	setSearchFilter: any;
	initialInput: PropertiesInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [propertyLocation, setPropertyLocation] = useState<PropertyLocation[]>(Object.values(PropertyLocation));
	const [propertyType, setPropertyType] = useState<PropertyType[]>(Object.values(PropertyType));
	const [yearCheck, setYearCheck] = useState({ start: 2000, end: thisYear });
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);
	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.fuelList?.length == 0) {
			delete searchFilter.search.fuelList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.transmissionList?.length == 0) {
			delete searchFilter.search.transmissionList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.manufactureList?.length == 0) {
			delete searchFilter.search.manufactureList;
			router
				.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/

	const yearStartChangeHandler = async (event: any) => {
		const value = event.target.value;

		setYearCheck({ ...yearCheck, start: Number(value) });
		await router.push(
			`/property?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
					manufacturedYearRange: { ...searchFilter.search.manufacturedYearRange, start: value },
				},
			})}`,
			`/property?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
					manufacturedYearRange: { ...searchFilter.search.manufacturedYearRange, start: value },
				},
			})}`,
			{ scroll: false },
		);

		setSearchFilter({
			...searchFilter,
			search: {
				...searchFilter.search,
				manufacturedYearRange: { start: Number(event.target.value), end: yearCheck.end },
			},
		});
	};

	const yearEndChangeHandler = async (event: any) => {
		const value = event.target.value;

		setYearCheck({ ...yearCheck, end: Number(value) });

		await router.push(
			`/property?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
					manufacturedYearRange: { ...searchFilter.search.manufacturedYearRange, end: value },
				},
			})}`,
			`/property?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
					manufacturedYearRange: { ...searchFilter.search.manufacturedYearRange, end: value },
				},
			})}`,
			{ scroll: false },
		);

		setSearchFilter({
			...searchFilter,
			search: {
				...searchFilter.search,
				manufacturedYearRange: { start: yearCheck.start, end: Number(event.target.value) },
			},
		});
	};

	const propertyLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	// 	async (e: any) => {
	// 		try {
	// 			const isChecked = e.target.checked;
	// 			const value = e.target.value;
	// 			if (isChecked) {
	// 				await router.push(
	// 					`/property?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: {
	// 							...searchFilter.search,
	// 							transmissionList: [...(searchFilter?.search?.transmissionList || []), value],
	// 						},
	// 					})}`,
	// 					`/property?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: {
	// 							...searchFilter.search,
	// 							transmissionList: [...(searchFilter?.search?.transmissionList || []), value],
	// 						},
	// 					})}`,
	// 					{ scroll: false },
	// 				);
	// 			} else if (searchFilter?.search?.transmissionList?.includes(value)) {
	// 				await router.push(
	// 					`/property?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: {
	// 							...searchFilter.search,
	// 							transmissionList: searchFilter?.search?.transmissionList?.filter((item: string) => item !== value),
	// 						},
	// 					})}`,
	// 					`/property?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: {
	// 							...searchFilter.search,
	// 							transmissionList: searchFilter?.search?.transmissionList?.filter((item: string) => item !== value),
	// 						},
	// 					})}`,
	// 					{ scroll: false },
	// 				);
	// 			}

	// 			if (searchFilter?.search?.transmissionList?.length == 0) {
	// 				alert('error');
	// 			}

	// 			console.log('propertyTransmissionSelectHandler:', e.target.value);
	// 		} catch (err: any) {
	// 			console.log('ERROR, propertyTransmissionSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	// const propertyFuelSelectHandler = useCallback(
	// 	async (e: any) => {
	// 		try {
	// 			const isChecked = e.target.checked;
	// 			const value = e.target.value;
	// 			if (isChecked) {
	// 				await router.push(
	// 					`/property?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: { ...searchFilter.search, fuelList: [...(searchFilter?.search?.fuelList || []), value] },
	// 					})}`,
	// 					`/property?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: { ...searchFilter.search, fuelList: [...(searchFilter?.search?.fuelList || []), value] },
	// 					})}`,
	// 					{ scroll: false },
	// 				);
	// 			} else if (searchFilter?.search?.fuelList?.includes(value)) {
	// 				await router.push(
	// 					`/property?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: {
	// 							...searchFilter.search,
	// 							fuelList: searchFilter?.search?.fuelList?.filter((item: string) => item !== value),
	// 						},
	// 					})}`,
	// 					`/property?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: {
	// 							...searchFilter.search,
	// 							fuelList: searchFilter?.search?.fuelList?.filter((item: string) => item !== value),
	// 						},
	// 					})}`,
	// 					{ scroll: false },
	// 				);
	// 			}

	// 			if (searchFilter?.search?.fuelList?.length == 0) {
	// 				alert('error');
	// 			}

	// 			console.log('propertyFuelSelectHandler:', e.target.value);
	// 		} catch (err: any) {
	// 			console.log('ERROR, propertyFuelSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	const propertyFuelSelectHandler = useCallback(
		async (string: String) => {
			try {
				if (string != '') {
					if (searchFilter?.search?.fuelList?.includes(string as PropertyFuel)) {
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									fuelList: searchFilter?.search?.fuelList?.filter((item: String) => item !== string),
								},
							})}`,
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									fuelList: searchFilter?.search?.fuelList?.filter((item: String) => item !== string),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, fuelList: [...(searchFilter?.search?.fuelList || []), string] },
							})}`,
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, fuelList: [...(searchFilter?.search?.fuelList || []), string] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.fuelList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('propertyRoomSelectHandler:', string);
			} catch (err: any) {
				console.log('ERROR, propertyRoomSelectHandler:', err);
			}
		},
		[searchFilter],
	);
	const propertyTransmissionSelectHandler = useCallback(
		async (string: String) => {
			try {
				if (string != '') {
					if (searchFilter?.search?.transmissionList?.includes(string as PropertyTransmission)) {
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									transmissionList: searchFilter?.search?.transmissionList?.filter((item: String) => item !== string),
								},
							})}`,
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									transmissionList: searchFilter?.search?.transmissionList?.filter((item: String) => item !== string),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									transmissionList: [...(searchFilter?.search?.transmissionList || []), string],
								},
							})}`,
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									transmissionList: [...(searchFilter?.search?.transmissionList || []), string],
								},
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.transmissionList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('propertyTransmissionSelectHandler:', string);
			} catch (err: any) {
				console.log('ERROR, propertyTransmissionSelectHandler:', err);
			}
		},
		[searchFilter],
	);
	const propertyManufactureSelectHandler = useCallback(
		async (string: String) => {
			try {
				if (string != '') {
					if (searchFilter?.search?.manufactureList?.includes(string as PropertyManufacture)) {
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									manufactureList: searchFilter?.search?.manufactureList?.filter((item: String) => item !== string),
								},
							})}`,
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									manufactureList: searchFilter?.search?.manufactureList?.filter((item: String) => item !== string),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									manufactureList: [...(searchFilter?.search?.manufactureList || []), string],
								},
							})}`,
							`/property?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									manufactureList: [...(searchFilter?.search?.manufactureList || []), string],
								},
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.manufactureList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/property?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('propertyManufactureSelectHandler:', string);
			} catch (err: any) {
				console.log('ERROR, propertyManufactureSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyMileageHandler = useCallback(
		async (e: any, type: string) => {
			const value = e.target.value;

			if (type == 'start') {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							drivenDistanceRange: { ...searchFilter.search.drivenDistanceRange, start: value },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							drivenDistanceRange: { ...searchFilter.search.drivenDistanceRange, start: value },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							drivenDistanceRange: { ...searchFilter.search.drivenDistanceRange, end: value },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							drivenDistanceRange: { ...searchFilter.search.drivenDistanceRange, end: value },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const propertyPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/property?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/property?input=${JSON.stringify(initialInput)}`,
				`/property?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>PROPERTIES FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Car</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Location
					</p>
					<Stack
						className={`property-location`}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.locationList) {
								setShowMore(false);
							}
						}}
					>
						{propertyLocation.map((location: string) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										sx={{ color: 'red' }}
										id={location}
										className="property-checkbox"
										color="info"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as PropertyLocation)}
										onChange={propertyLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{location}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Property Type</Typography>

					{propertyType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								sx={{ color: 'red' }}
								id={type}
								className="property-checkbox"
								color="success"
								size="small"
								value={type}
								onChange={propertyTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as PropertyType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="property_type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Property Manufacture</Typography>
					<Stack className="button-group">
						<Button
							sx={{
								borderRadius: '12px 0 0 12px',
								border: !searchFilter?.search?.manufactureList ? '2px solid #f59fe8' : '1px solid #b9b9b9',
								background: !searchFilter?.search?.manufactureList ? '#f8b1ed ' : '',
								color: !searchFilter?.search?.manufactureList ? '#fff ' : '#181a20;',
							}}
							onClick={() => propertyManufactureSelectHandler('')}
						>
							Any
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.manufactureList?.includes(PropertyManufacture.IMPORT)
									? '2px solid #f59fe8'
									: '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.manufactureList?.includes(PropertyManufacture.IMPORT)
									? undefined
									: 'none',
								background: searchFilter?.search?.manufactureList?.includes(PropertyManufacture.IMPORT)
									? '#f8b1ed'
									: '',
								color: searchFilter?.search?.manufactureList?.includes(PropertyManufacture.IMPORT)
									? '#fff '
									: '#181a20;',
							}}
							onClick={() => propertyManufactureSelectHandler(PropertyManufacture.IMPORT)}
						>
							IMPORT
						</Button>
						<Button
							sx={{
								borderRadius: '0 12px 12px 0',
								border: searchFilter?.search?.manufactureList?.includes(PropertyManufacture.DOMESTIC)
									? '2px solid #f59fe8'
									: '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.manufactureList?.includes(PropertyManufacture.DOMESTIC)
									? undefined
									: 'none',
								background: searchFilter?.search?.manufactureList?.includes(PropertyManufacture.DOMESTIC)
									? '#f8b1ed'
									: '',
								color: searchFilter?.search?.manufactureList?.includes(PropertyManufacture.DOMESTIC)
									? '#fff '
									: '#181a20;',
							}}
							onClick={() => propertyManufactureSelectHandler(PropertyManufacture.DOMESTIC)}
						>
							DOMESTIC
						</Button>
					</Stack>
				</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Property Transmission</Typography>
					<Stack className="button-group">
						<Button
							sx={{
								borderRadius: '12px 0 0 12px',
								border: !searchFilter?.search?.transmissionList ? '2px solid #f59fe8' : '1px solid #b9b9b9',
								background: !searchFilter?.search?.transmissionList ? '#f8b1ed ' : '',
								color: !searchFilter?.search?.transmissionList ? '#fff ' : '#181a20;',
							}}
							onClick={() => propertyTransmissionSelectHandler('')}
						>
							Any
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.transmissionList?.includes(PropertyTransmission.AUTOMATIC)
									? '2px solid #f59fe8'
									: '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.transmissionList?.includes(PropertyTransmission.AUTOMATIC)
									? undefined
									: 'none',
								background: searchFilter?.search?.transmissionList?.includes(PropertyTransmission.AUTOMATIC)
									? '#f8b1ed'
									: '',
								color: searchFilter?.search?.transmissionList?.includes(PropertyTransmission.AUTOMATIC)
									? '#fff '
									: '#181a20;',
							}}
							onClick={() => propertyTransmissionSelectHandler(PropertyTransmission.AUTOMATIC)}
						>
							AUTOMAT
						</Button>
						<Button
							sx={{
								borderRadius: '0 12px 12px 0',
								border: searchFilter?.search?.transmissionList?.includes(PropertyTransmission.MANUAL)
									? '2px solid #f59fe8'
									: '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.transmissionList?.includes(PropertyTransmission.MANUAL)
									? undefined
									: 'none',
								background: searchFilter?.search?.transmissionList?.includes(PropertyTransmission.MANUAL)
									? '#f8b1ed'
									: '',
								color: searchFilter?.search?.transmissionList?.includes(PropertyTransmission.MANUAL)
									? '#fff '
									: '#181a20;',
							}}
							onClick={() => propertyTransmissionSelectHandler(PropertyTransmission.MANUAL)}
						>
							MANUAL
						</Button>
					</Stack>
				</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Property Fuel</Typography>
					<Stack className="button-group">
						<Button
							sx={{
								borderRadius: '12px 0 0 12px',
								border: !searchFilter?.search?.fuelList ? '2px solid #f59fe8' : '1px solid #b9b9b9',
								background: !searchFilter?.search?.fuelList ? '#f8b1ed ' : '',
								color: !searchFilter?.search?.fuelList ? '#fff ' : '#181a20;',
							}}
							onClick={() => propertyFuelSelectHandler('')}
						>
							Any
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.fuelList?.includes(PropertyFuel.GASOLINE)
									? '2px solid #f59fe8'
									: '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.fuelList?.includes(PropertyFuel.GASOLINE) ? undefined : 'none',
								background: searchFilter?.search?.fuelList?.includes(PropertyFuel.GASOLINE) ? '#f8b1ed' : '',
								color: searchFilter?.search?.fuelList?.includes(PropertyFuel.GASOLINE) ? '#fff ' : '#181a20;',
							}}
							onClick={() => propertyFuelSelectHandler(PropertyFuel.GASOLINE)}
						>
							GASOLINE
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.fuelList?.includes(PropertyFuel.DIESEL)
									? '2px solid #f59fe8'
									: '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.fuelList?.includes(PropertyFuel.DIESEL) ? undefined : 'none',
								background: searchFilter?.search?.fuelList?.includes(PropertyFuel.DIESEL) ? '#f8b1ed' : '',
								color: searchFilter?.search?.fuelList?.includes(PropertyFuel.DIESEL) ? '#fff ' : '#181a20;',
							}}
							onClick={() => propertyFuelSelectHandler(PropertyFuel.DIESEL)}
						>
							DIESEL
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.fuelList?.includes(PropertyFuel.LPG)
									? '2px solid #f59fe8'
									: '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.fuelList?.includes(PropertyFuel.LPG) ? undefined : 'none',
								background: searchFilter?.search?.fuelList?.includes(PropertyFuel.LPG) ? '#f8b1ed' : '',
								color: searchFilter?.search?.fuelList?.includes(PropertyFuel.LPG) ? '#fff ' : '#181a20;',
							}}
							onClick={() => propertyFuelSelectHandler(PropertyFuel.LPG)}
						>
							LPG
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.fuelList?.includes(PropertyFuel.ELECTR)
									? '2px solid #f59fe8'
									: '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.fuelList?.includes(PropertyFuel.ELECTR) ? undefined : 'none',
								borderRight: searchFilter?.search?.fuelList?.includes(PropertyFuel.ELECTR) ? undefined : 'none',
								background: searchFilter?.search?.fuelList?.includes(PropertyFuel.ELECTR) ? '#f8b1ed' : '',
								color: searchFilter?.search?.fuelList?.includes(PropertyFuel.ELECTR) ? '#fff ' : '#181a20;',
							}}
							onClick={() => propertyFuelSelectHandler(PropertyFuel.ELECTR)}
						>
							ELECTR
						</Button>
						<Button
							sx={{
								borderRadius: '0 12px 12px 0',
								border: searchFilter?.search?.fuelList?.includes(PropertyFuel.HYBRID)
									? '2px solid #f59fe8'
									: '1px solid #b9b9b9',
								background: searchFilter?.search?.fuelList?.includes(PropertyFuel.HYBRID) ? '#f8b1ed' : '',
								color: searchFilter?.search?.fuelList?.includes(PropertyFuel.HYBRID) ? '#fff ' : '#181a20;',
							}}
							onClick={() => propertyFuelSelectHandler(PropertyFuel.HYBRID)}
						>
							HYBRID
						</Button>
					</Stack>
				</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Made Year</Typography>
					<Stack className="mileage-year-input">
						<FormControl>
							<InputLabel id="demo-simple-select-label">Min</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={yearCheck.start.toString()}
								onChange={yearStartChangeHandler}
								label="Min"
								MenuProps={MenuProps}
							>
								{propertyYears?.slice(0)?.map((year: number) => (
									<MenuItem value={year} disabled={yearCheck.end <= year} key={year}>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Max</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={yearCheck.end.toString()}
								onChange={yearEndChangeHandler}
								displayEmpty
								label="Max"
								MenuProps={MenuProps}
							>
								{propertyYears
									?.slice(0)
									.reverse()
									.map((year: number) => (
										<MenuItem value={year} disabled={yearCheck.start >= year} key={year}>
											{year}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Stack>
				</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Mileage</Typography>
					<Stack className="mileage-year-input">
						<FormControl>
							<InputLabel id="demo-simple-select-label">Min</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.drivenDistanceRange?.start ?? 0}
								label="Min"
								onChange={(e: any) => propertyMileageHandler(e, 'start')}
								MenuProps={MenuProps}
							>
								{propertyMileage.map((mileage: number) => (
									<MenuItem
										value={mileage}
										disabled={
											searchFilter?.search?.drivenDistanceRange?.end !== undefined &&
											mileage > searchFilter?.search?.drivenDistanceRange?.end
										}
										key={mileage}
									>
										{mileage}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Max</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.drivenDistanceRange?.end ?? 500000}
								label="Max"
								onChange={(e: any) => propertyMileageHandler(e, 'end')}
								MenuProps={MenuProps}
							>
								{propertyMileage.map((mileage: number) => (
									<MenuItem
										value={mileage}
										disabled={
											searchFilter?.search?.drivenDistanceRange?.start !== undefined &&
											mileage < searchFilter?.search?.drivenDistanceRange?.start
										}
										key={mileage}
									>
										{mileage}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack>

				<Stack className={'find-your-home'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="mileage-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									propertyPriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									propertyPriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
