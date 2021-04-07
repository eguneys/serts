import { xhr } from './config';
import { kbt } from 'koob';

export const book = (id: kbt.BookId) =>
  xhr.json(`/book/${id}`);

export const chapter = (id: kbt.ChapterId) =>
  xhr.json(`/chapter/${id}`);

export const section = (id: kbt.SectionId) =>
  xhr.json(`/section/${id}`);

export const content = (id: kbt.ContentId) =>
  xhr.json(`/content/${id}`);

export const books = () =>
  xhr.json('/books');

export const chapters = (id: kbt.BookId) =>
  xhr.json(`/chapters/${id}`);

export const sections = (id: kbt.ChapterId) =>
  xhr.json(`/sections/${id}`);

export const contents = (id: kbt.SourceId) =>
  xhr.json(`/contents/${id}`)



export const newBook = (name: string) =>
  xhr.json('/books', {
    method: 'POST',
    body: xhr.form({
      name
    })
  });

export const newChapter = (bookId: kbt.BookId, name: string) =>
  xhr.json('/chapters', {
    method: 'POST',
    body: xhr.form({
      bookId,
      name
    })
  });

export const newSection = (chapterId: kbt.ChapterId, name: string) =>
  xhr.json('/sections', {
    method: 'POST',
    body: xhr.form({
      chapterId,
      name
    })
  });


export const newContent = (sourceId: kbt.SourceId, name: string, content: string) =>
  xhr.json('/contents', {
    method: 'POST',
    body: xhr.form({
      sourceId,
      name,
      content
    })
  });

export const updateContent = (contentId: kbt.ContentId, content: string) =>
  xhr.json(`/contents/${contentId}`, {
    method: 'POST',
    body: xhr.form({
      content
    })
  });
