export enum AnimalType {
  Cat = 'cat',
  Dog = 'dog',
  Other = 'other',
}

export interface Animal {
  id: string;
  type: AnimalType;
  name?: string;
  breed?: string;
  images: string[];
  typeNote?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
