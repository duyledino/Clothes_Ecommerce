type BestCustomer = {
  id: string;
  name: string;
  email: string;
  total: number;
};

const standardBestCustomer = (users: BestCustomer[]) => {
  return users;
};
