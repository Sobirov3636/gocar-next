export const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}`;

export const availableOptions = ['propertyBarter', 'propertyRent'];

const thisYear = new Date().getFullYear();

export const propertyYears: any = [];

for (let i = 2000; i <= thisYear; i++) {
	propertyYears.push(String(i));
}

export const propertyMileage = [0, 10000, 50000, 75000, 100000, 125000, 150000, 200000, 300000, 500000];

export const Messages = {
	error1: 'Something went wrong!',
	error2: 'Please login first!',
	error3: 'Please fulfill all inputs!',
	error4: 'Message is empty!',
	error5: 'Only images with jpeg, jpg, png format allowed!',
};

const topPropertyRank = 50;
