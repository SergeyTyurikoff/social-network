import { Router } from 'express';
import { z } from 'zod';

import { authorizeRequest } from '../auth.js';
import { IGetAllNotesOptions, Notes } from '../database';

export const notesRouter = Router();

const GetNotesSchema = z
  .object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
    searchString: z.string().optional(),
    sortDirection: z.enum(['asc', 'desc']).default('desc'),
  })
  .transform(
    ({ page, pageSize, searchString, sortDirection }): IGetAllNotesOptions => ({
      page: page !== undefined ? Number(page) : undefined,
      pageSize: pageSize !== undefined ? Number(pageSize) : undefined,
      searchString,
      sortDirection,
    })
  );

notesRouter.get('/', (req, res) => {
  const queryParseResult = GetNotesSchema.safeParse(req.query);

  if (!queryParseResult.success) {
    return res.status(400).send(queryParseResult.error.message);
  }

  res.status(200).json(Notes.getAll(queryParseResult.data));
});

const CreateNoteSchema = z.object({
  text: z.string().min(10),
});

notesRouter.post('/', async (req, res) => {
  const userId = authorizeRequest(req);

  if (!userId) {
    return res.status(401).send('Unauthorized');
  }

  const bodyParseResult = CreateNoteSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.message);
  }

  const { text } = bodyParseResult.data;

  const note = await Notes.create(text, userId);

  res.status(201).send(note.id);
});
