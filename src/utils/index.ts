import { Request } from 'express';
import { BaseUser } from '../types';

export const getBody = (req: Request): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const isBodyValid = (body: BaseUser) => {
  const { username, age, hobbies } = body;

  const allFields = username && (age || age === 0) && hobbies;

  const isNameValid = typeof username === 'string';
  const isAgeValid = typeof age === 'number' && age >= 0;
  const areHobbiesValid = Array.isArray(hobbies) && hobbies.every((item) => typeof item === 'string');

  return allFields && isNameValid && isAgeValid && areHobbiesValid;
};
