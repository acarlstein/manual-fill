# Manual Fill

A simple chrome extension which allows the user to save selected text for later use.

## Manual Installation

Currently, there is only one way to access this chrome extension, by downloading the code and incorporate it into Google Chrome. The following are the steps to do that.

1. Download this code
  * If you download it as a zip file, you must uncompress it.
2. Open Google Chrome.
 * On the far right, there are three vertical dots. Click on them.
 * On the menu, hover over `More Tools` and select Extensions
3. On Extensions (`chrome://extensions/`), on the right side, toggle the `Developer mode`
  * Three buttons will show up `Load unpacked`, `Pack extension`, and `Update`. Click on `Load unpacked`
  * A dialog will popup. Browser until you reach the folder were you saved the files of this project.
  * Click on "Select Folder"
4. Refresh whatever page you were planning to use the extension and enjoy

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