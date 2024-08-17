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

export interface PropertyUpdate {
	_id: string;
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
	propertyDrivenDistance: number;
	propertyImages: string[];
	propertyDesc?: string;
	propertyRent?: boolean;
	memberId?: string;
	soldAt?: Date;
	deletedAt?: Date;
}
