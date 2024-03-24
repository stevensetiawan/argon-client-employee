export interface Employee {
  id: number;
  name: string;
  email: string;
  emp_photo: string;
  position: string;
  phone: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeParams {
  id?: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  password: string;
  image: string;
}
