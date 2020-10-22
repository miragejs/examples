export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  streetAddress: string;
  cityStateZip: string;
  phone: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
};

type PeopleResponse = {
  people: Person[];
};

export const fetchPeople = (url: string) =>
  fetch(url).then<PeopleResponse>((r) => r.json());
