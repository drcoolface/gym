import { Decimal } from "@prisma/client/runtime/library";

export interface MembershipPlans {
  p_id: number;
  name: string;
  rate: Decimal | Number;
  description: string | null;
}

export interface User {
  u_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  user_name: string;
  email: string;
  password: string;
  role: string;
}
