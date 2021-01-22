chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.status == 'loading'){    
    createContextMenus();
  }
});

function createContextMenus(){
  chrome.contextMenus.removeAll(() => {
    
    chrome.contextMenus.create({
      id: "SaveSelectionMenu",
      title: "Save Selection",
      contexts:["selection"]
    }, () => chrome.runtime.lastError);

    chrome.contextMenus.create({
      id: "insertValueMenu",
      title: "Insert Value",
      contexts:["all"]
    }, () => chrome.runtime.lastError);

    chrome.contextMenus.create({
      id: "ManageValuesMenu",
      title: "Manage Values",
      contexts:["all"]
    }, () => chrome.runtime.lastError);

    chrome.storage.sync.get(["words"], function(loaded){
      if (loaded.hasOwnProperty('words') && loaded.words instanceof Array){
        loaded.words.forEach((word) => {
          if (word.length > 0) {
            chrome.contextMenus.create({
              parentId: "insertValueMenu",
              id: word,
              title: word,
              contexts:["all"]
            }, () => chrome.runtime.lastError);
          }
        })
      }
    });
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.hasOwnProperty('selectionText') 
      && info.selectionText.length > 0){
    storeSelection(info.selectionText);    
  } else {
    if (info.menuItemId == "ManageValuesMenu"){
      openManagerValuesDialog();
    }else if (info.menuItemId != "insertValueMenu"){
      copyToClipboard(info.menuItemId);
      pasteFromClipboard(tab, info.frameId || null);  
    }
  }
});

function storeSelection(selectionText){
  chrome.storage.sync.get(["words"], function(loaded){    
    if (loaded !== undefined && loaded.hasOwnProperty('words')){
      if (!loaded.words.includes(selectionText)){
        loaded.words.push(selectionText);  
        chrome.storage.sync.set({"words" : loaded.words}, function(){
          createContextMenus();
        });    
      }
    }
  }); 
}

function openManagerValuesDialog(){
  chrome.tabs.create({
      url: chrome.extension.getURL('dialog.html'),
      active: false
  }, function(tab) {
    chrome.windows.create({ // After the tab has been created, open a window to inject the tab
        tabId: tab.id,
        type: 'popup',
        focused: true,
        width: 270,
        height: 240
    });
  });
}

function copyToClipboard(value){
  var textarea = document.createElement('textarea');
  document.body.appendChild(textarea);
  textarea.value = value || "";
  textarea.focus();
  textarea.select();    
  document.execCommand('copy');
}

function pasteFromClipboard(tab, frameId){
  chrome.tabs.executeScript(tab.id, {
    frameId: frameId, 
    matchAboutBlank: true, 
    code: "document.execCommand('paste');"
  }, 
  function() {
      let textarea = document.body.querySelector('textarea');
      document.body.removeChild(textarea);
  });
}