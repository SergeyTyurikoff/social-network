import { randomUUID } from 'crypto';
import { JSONFilePreset } from 'lowdb/node';

export interface INote {
  id: string;
  text: string;
  authorId: string;
  createdAt: number;
}

const database = await JSONFilePreset<Record<string, INote>>('notes.json', {});

export interface IGetAllNotesOptions {
  page?: number;
  pageSize?: number;
  searchString?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface IGetAllNotesResult {
  list: INote[];
  pageCount: number;
}

export class Notes {
  static getOne(id: string): INote | undefined {
    return database.data[id];
  }

  static getAll({
    page,
    pageSize,
    searchString,
    sortDirection = 'desc',
  }: IGetAllNotesOptions = {}): IGetAllNotesResult {
    let list = Object.values(database.data);
    let pageCount = 1;

    if (searchString) {
      list = list.filter((note) =>
        note.text.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (sortDirection) {
      list.sort((noteA, noteB) => {
        if (sortDirection === 'desc') {
          return noteB.createdAt - noteA.createdAt;
        } else {
          return noteA.createdAt - noteB.createdAt;
        }
      });
    }

    if (page !== undefined && pageSize !== undefined) {
      pageCount = Math.ceil(list.length / pageSize);
      list = list.slice(page * pageSize, (page + 1) * pageSize);
    }

    return {
      list,
      pageCount,
    };
  }

  static async create(text: string, authorId: string): Promise<INote> {
    const note: INote = {
      id: randomUUID(),
      text,
      authorId,
      createdAt: Date.now(),
    };

    await database.update((data) => {
      data[note.id] = note;
    });

    return note;
  }
}
