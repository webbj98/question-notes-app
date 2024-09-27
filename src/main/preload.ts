// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import getNames from '../dbManager';
import {
  createQuestion,
  getQuestionsByCategoryId,
  getQuestionsById,
} from '../categoryManager';
import { Question } from '../model';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    loadSave: () => ipcRenderer.invoke('load-save'),
    fetchCategories: () => ipcRenderer.invoke('get-categories'),
    createCategory: (title: string) =>
      ipcRenderer.invoke('create-category', title),
    getQuestionsById: (id: number): Promise<Question> =>
      ipcRenderer.invoke('get-question-by-id', id),
    getQuestionsByCategoryId: (id: number) =>
      ipcRenderer.invoke('get-questions-by-category-id', id),
    createQuestion: (title: string, time: number, categoryId: number) =>
      ipcRenderer.invoke('create-question', { title, time, categoryId }),
    getAttemptsByQuestionId: (questionId: number) =>
      ipcRenderer.invoke('get-attempts-by-question-id', questionId),
    createAttempt: (
      date: string,
      timeTaken: number,
      performanceCategoryId: number,
      questionId: number,
    ) =>
      ipcRenderer.invoke('create-attempt', {
        date,
        timeTaken,
        performanceCategoryId,
        questionId,
      }),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

// contextBridge.exposeInMainWorld('electronAPI', {
//   loadSave: () => ipcRenderer.invoke('load-save'),
// });

export type ElectronHandler = typeof electronHandler;
