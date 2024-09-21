// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import getNames from '../dbManager';

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
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

// contextBridge.exposeInMainWorld('electronAPI', {
//   loadSave: () => ipcRenderer.invoke('load-save'),
// });

export type ElectronHandler = typeof electronHandler;
