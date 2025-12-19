// preload.js (optional for now)
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // Future methods can be exposed here
});
