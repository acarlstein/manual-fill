/**
 * For some unknown reason, chrome insist on trying to trigger the script 
 * prior the DOM Tree being created from the page.
 */
window.onload = function(){

  window.resizeTo(260, 230);

  let form = document.forms[0];

  if (form){
    chrome.storage.sync.get(["words"], function(loaded){    
      if (loaded.hasOwnProperty('words') && loaded.words instanceof Array){
        loaded.words.forEach((word, index)=>{
          if (form.wordList){
            form.wordList.options[index] = new Option(word, word);
          }
        });
      }
    }); 

    form.onsubmit = function(e) {
      e.preventDefault();
      if (form.wordList !== undefined){
        let options = form.wordList.options;
        let words = Array.apply(null, options).map((option) => {return option.value;});
        chrome.runtime.getBackgroundPage(function(background) {
          chrome.storage.sync.set({"words" : words}, function(){
            background.createContextMenus();
            window.close(); // Close dialog
          });
        });
      }
    };

    if (form.btnRemove){
      form.btnRemove.addEventListener("click", function(e){
        if (form.wordList !== undefined){
          let options = form.wordList.options;
          for(let i = options.length; i > -1; --i){    
            if (options[i] !== undefined && options[i].selected){
              form.wordList.remove(i);
            }
          }  
        }
      });  
    }
    
    if (form.btnAdd){
      form.btnAdd.addEventListener("click", function(e){
        let input = form.newValue
        let value = input.value;
        if (value !== undefined && value.length > 0){
          form.wordList.add(new Option(value, value));
          input.value = "";
        }
      });
    }
    
    if(form.btnCancel){
      form.btnCancel.addEventListener("click", function(e){
        window.close();
      });  
    }
  
  }
  
}


