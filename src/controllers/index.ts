import { db } from '../db';
import { BaseUser } from '../types';
import { randomUUID } from 'crypto';

export const getUsers = async () => Object.values(db);

export const getUserById = async (id: string) => db[id];

export const createUser = async (newItem: BaseUser) => {
  const id = randomUUID();

  db[id] = {
    id,
    ...newItem,
  };
  return db[id];
};

export const updateUser = async (id: string, updatedUser: BaseUser) => {
  const item = await getUserById(id);

  if (!item) {
    return null;
  }
  db[id] = { id, ...updatedUser };
  return db[id];
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const item = await getUserById(id);

  if (!item) {
    return false;
  }

  delete db[id];
  return true;
};
