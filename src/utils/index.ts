import { db } from '../db';
import { BaseUser, User } from '../types';
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

export const update = async (id: string, updatedUser: BaseUser) => {
  const item = await getUserById(id);

  if (!item) {
    return null;
  }
  db[id] = { id, ...updatedUser };
  return db[id];
};

export const deleteUser = async (id: string) => {
  const item = await getUserById(id);

  if (!item) {
    return null;
  }
  delete db[id];
};
