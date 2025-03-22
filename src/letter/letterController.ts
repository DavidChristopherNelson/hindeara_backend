import Joi from 'joi';
import type { Request, Response } from 'express';
import type { Letter } from './Letter';
import { validateInput } from '../utilities/validationUtilities';
import letterBusinessLogic from './letterBusinessLogic';

const letterStringSchema = Joi.string()
  .length(1)
  .pattern(/^[a-z]$/)
  .required()
  .messages({
    'string.length': 'Letter must be exactly one character',
    'string.pattern.base': 'Letter must be a lowercase letter from a-z'
  });

const letterSchema = Joi.object({
  letter: letterStringSchema,
  word: Joi.string()
    .pattern(/^[a-z]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Word must contain only lowercase letters (a-z)'
    }),
  picture: Joi.string().required()
});

const updateDataSchema = Joi.object({
  word: Joi.string()
    .pattern(/^[a-z]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Word must contain only lowercase letters (a-z)'
    }),
  picture: Joi.string().required()
});

export default class letterController {
  static create = (
    req: Request,
    res: Response
  ) => {
    try {
      // Validate Letter Data 
      const { error, value } = validateInput<Letter>(
        letterSchema,
        req.body
      );
      if (error) {
        return res.status(400).json({ 
          error: error.toString()
        });
      }
      const letterData = value!;

      // Create letter
      res.status(201).json(letterBusinessLogic.create(letterData));
    } catch (error) {
      res.status(500).json({ error: 'Failed to create letter.' });
    }
  };

  static readAll = (
    req: Request,
    res: Response
  ) => {
    try {
      const letters = letterBusinessLogic.readAll();
      res.status(200).json(letters);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read all letters.' });
    }
  };

  static read = (
    req: Request,
    res: Response
  ) => {
    try {
      const { error, value } = validateInput<string>(
        letterStringSchema,
        req.params.letter
      );
      if (error) {
        return res.status(400).json({ error });
      }
      const letterString = value!;
      const letter = letterBusinessLogic.read(letterString);
      if (!letter) {
        return res.status(404).json({ error: 'Letter not found' });
      }
      res.status(200).json(letter);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read letter.' });
    }
  };
  
  static update = (
    req: Request,
    res: Response
  ) => {
    try {
      // Validate LetterString
      const { error: letterStringError, value: letterStringValue } = validateInput<string>(
        letterStringSchema,
        req.params.letter
      );
      if (letterStringError) {
        return res.status(400).json({ letterStringError });
      }
      const letterString = letterStringValue!;

      // Validate Letter Data 
      const { error: letterDataError, value: letterDataValue } = validateInput<Partial<Omit<Letter, 'letter'>>>(
        updateDataSchema,
        req.body
      );
      if (letterDataError) {
        return res.status(400).json({ letterDataError });
      }
      const letterData = letterDataValue!;

      const letter = letterBusinessLogic.update(letterString, letterData);
      if (!letter) {
        return res.status(404).json({ error: 'Letter not found' });
      }
      res.status(200).json(letter);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update letter' });
    }
  };

  static delete = (
    req: Request,
    res: Response
  ) => {
    try {
      const { error, value } = validateInput<string>(
        letterStringSchema,
        req.params.letter
      );
      if (error) {
        return res.status(400).json({ error });
      }
      const letterString = value!;

      const success = letterBusinessLogic.delete(letterString);
      if (!success) {
        return res.status(404).json({ error: 'Letter not deleted' });
      }
      res.status(204).send();
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete letter' });
    }
  };
}
