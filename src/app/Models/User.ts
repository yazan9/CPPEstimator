export class User {
  id: number;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
  admin: boolean;
  active: boolean
  
  public constructor(init?:Partial<User>) {
        Object.assign(this, init);
    }
}