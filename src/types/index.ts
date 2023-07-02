export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type BaseUser = {
  username: string;
  age: number;
  hobbies: string[];
};

export type Users = {
  [key: string]: User;
};
