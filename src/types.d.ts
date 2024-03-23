export interface EventDatabase {
  id:         number;
  start:      Date;
  end:        Date;
  title:      string;
  notes:      string;
  state:      number;
  createdAt:  Date;
  updateAt:   Date;
  employeId:  number;
  customerId: number;
  price:      number;
  payment:    number;
  serviceId:  number;
  customer:   Customer;
  employe:    Customer;
  service:    Service;
}

export interface Customer {
  id:        number;
  firstName: string;
  lastName:  string;
  state:     number;
  phone:     number;
  createdAt: Date;
  updateAt:  Date;
}

export interface Employe {
  id:        number;
  firstName: string;
  lastName:  string;
  state:     number;
  phone:     number;
  createdAt: Date;
  updateAt:  Date;
  user?:     string;
  password?: string;
}


export interface Service {
  id:         number;
  service:    string;
  time:       number;
  state:      number;
  isMounting: boolean;
  createdAt:  Date;
  updateAt:   Date;
}
