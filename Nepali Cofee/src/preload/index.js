import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}
const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');
const { dialog } = require('@electron/remote'); // Requires remote enabled

contextBridge.exposeInMainWorld('electronAPI', {
  downloadExcel: async () => {
    const result = await dialog.showSaveDialog({
      title: 'Save Excel File',
      defaultPath: 'coffee_menu_data.xlsx',
      filters: [{ name: 'Excel Files', extensions: ['xlsx'] }],
    });

    if (!result.canceled) {
      const sourcePath = path.join(__dirname, '../assets/coffee_menu_data.xlsx');
      fs.copyFile(sourcePath, result.filePath, (err) => {
        if (err) {
          console.error('Failed to save file:', err);
        } else {
          console.log('File saved successfully.');
        }
      });
    }
  }
});


// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
