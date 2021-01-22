# Manual Fill

A simple chrome extension which allows the user to save selected text for later use.

## Manual Installation

## Revisions
- 0.1.0.0 Initial submission
- 0.1.0.1 Patch: `chrome.contextMenus.removeAll` isn't removing all the contextMenus prior rebuilding the menu. Added error handling.
- 0.1.0.2 Patch: Prevent already existent values in the list.

## About Author

Alejandro G. Carlstein Ramos Mejia

## Q&A

* *Why it says "Read your browsing history"*
  * The extension uses the permission "tabs" to interact with the browser's tab system.

## Credits

Rob W: https://stackoverflow.com/questions/10340481/popup-window-in-chrome-extension