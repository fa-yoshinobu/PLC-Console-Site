(function(){
  var t=document.getElementById("nav-toggle");
  var n=document.querySelector(".top-nav");
  if(!t||!n)return;

  var groups=Array.prototype.slice.call(n.querySelectorAll(".nav-group"));

  function closeGroups(except){
    groups.forEach(function(g){
      if(g!==except)g.removeAttribute("open");
    });
  }

  groups.forEach(function(g){
    g.addEventListener("toggle",function(){
      if(g.open)closeGroups(g);
    });
  });

  t.addEventListener("click",function(){
    var o=n.classList.toggle("is-open");
    t.setAttribute("aria-expanded",String(o));
    if(!o)closeGroups();
  });

  n.addEventListener("click",function(e){
    if(e.target&&e.target.tagName==="A"){
      n.classList.remove("is-open");
      t.setAttribute("aria-expanded","false");
      closeGroups();
    }
  });

  document.addEventListener("click",function(e){
    if(!t.contains(e.target)&&!n.contains(e.target)){
      n.classList.remove("is-open");
      t.setAttribute("aria-expanded","false");
      closeGroups();
    }
  });
})();

(function(){
  var screenshotImages=Array.prototype.slice.call(document.querySelectorAll(
    ".hero-shot > img, "+
    ".inline-shot:not(.projectbuilder-logo) > img, "+
    ".image-grid figure > img, "+
    ".plc-screenshot-grid figure > img"
  ));

  screenshotImages.forEach(function(source){
    var trigger=document.createElement("button");
    trigger.type="button";
    trigger.className="image-zoom-trigger";
    trigger.setAttribute("data-image-zoom","");
    trigger.setAttribute("aria-label",(source.alt||"画像")+"を拡大表示");

    var label=document.createElement("span");
    label.className="image-zoom-label";
    label.setAttribute("aria-hidden","true");
    label.textContent="拡大";

    source.parentNode.insertBefore(trigger,source);
    trigger.appendChild(source);
    trigger.appendChild(label);
  });

  var triggers=Array.prototype.slice.call(document.querySelectorAll("[data-image-zoom]"));
  if(!triggers.length)return;

  var dialog=document.createElement("dialog");
  dialog.className="image-lightbox";
  dialog.setAttribute("aria-label","画像の拡大表示");

  var closeButton=document.createElement("button");
  closeButton.type="button";
  closeButton.className="image-lightbox-close";
  closeButton.textContent="閉じる";

  var image=document.createElement("img");
  image.className="image-lightbox-image";

  dialog.appendChild(closeButton);
  dialog.appendChild(image);
  document.body.appendChild(dialog);

  var lastTrigger=null;

  function finishClose(){
    document.documentElement.classList.remove("lightbox-open");
    image.removeAttribute("src");
    image.alt="";
    if(lastTrigger)lastTrigger.focus();
    lastTrigger=null;
  }

  function closeLightbox(){
    if(typeof dialog.close==="function"&&dialog.open){
      dialog.close();
    }else{
      dialog.removeAttribute("open");
      finishClose();
    }
  }

  triggers.forEach(function(trigger){
    trigger.addEventListener("click",function(event){
      event.preventDefault();
      var source=trigger.querySelector("img");
      lastTrigger=trigger;
      image.src=source.currentSrc||source.src;
      image.alt=source?source.alt:"";
      document.documentElement.classList.add("lightbox-open");
      if(typeof dialog.showModal==="function"){
        dialog.showModal();
      }else{
        dialog.setAttribute("open","");
      }
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click",closeLightbox);
  image.addEventListener("click",closeLightbox);
  dialog.addEventListener("click",function(event){
    if(event.target===dialog)closeLightbox();
  });
  dialog.addEventListener("close",finishClose);
  dialog.addEventListener("cancel",function(event){
    event.preventDefault();
    closeLightbox();
  });
  document.addEventListener("keydown",function(event){
    if(event.key==="Escape"&&dialog.hasAttribute("open")&&typeof dialog.close!=="function"){
      closeLightbox();
    }
  });
})();
