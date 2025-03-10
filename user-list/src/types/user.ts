export interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
  picture: {
    large: string;
  };
}