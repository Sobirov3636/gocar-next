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
import { Direction } from '../../enums/common.enum';

export interface PropertyInput {
	propertyType: PropertyType;
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
	memberId?: string;
}

interface PISearch {
	memberId?: string;
	locationList?: PropertyLocation[];
	typeList?: PropertyType[];
	fuelList?: PropertyFuel[];
	transmissionList?: PropertyTransmission[];
	options?: string[];
	manufactureList?: PropertyManufacture[];
	pricesRange?: Range;
	manufacturedYearRange?: ManufacturedYearRange;
	drivenDistanceRange?: DrivenDistanceRange;
	text?: string;
}

export interface PropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface DPISearch {
	propertyStatus?: PropertyStatus;
}

export interface DealerPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: DPISearch;
}

interface ALPISearch {
	propertyStatus?: PropertyStatus;
	propertyLocationList?: PropertyLocation[];
}

export interface AllPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface DrivenDistanceRange {
	start: number;
	end: number;
}

interface ManufacturedYearRange {
	start: number;
	end: number;
}
