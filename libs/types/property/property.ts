import {
	PropertyDomestic,
	PropertyFuel,
	PropertyImported,
	PropertyLocation,
	PropertyManufacture,
	PropertyOptions,
	PropertyStatus,
	PropertyTransmission,
	PropertyType,
} from '../../enums/property.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Property {
	_id: string;

	propertyType: PropertyType;
	propertyStatus: PropertyStatus;
	propertyFuel: PropertyFuel;
	propertyTransmission: PropertyTransmission;
	propertyOptions: PropertyOptions[];
	propertyManufacture: PropertyManufacture;
	propertyDomestic?: PropertyDomestic;
	propertyImported?: PropertyImported;
	propertyLocation: PropertyLocation;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyModel: string;
	propertyManufacturedYear: number;
	propertyRegistrationDate: Date;
	propertyEngineDisplacement: number;
	propertyDrivenDistance: number;
	propertyImages: string[];
	propertyDesc?: string;
	propertyRent?: boolean;
	propertyViews: number;
	propertyLikes: number;
	propertyComments: number;
	propertyRank: number;
	memberId?: string;
	soldAt?: Date;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Properties {
	list: Property[];
	metaCounter: TotalCounter[];
}
