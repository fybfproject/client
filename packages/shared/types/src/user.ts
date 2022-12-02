export type UserStatus = 'created' | 'invited' | 'confirmed' | 'blocked';

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
