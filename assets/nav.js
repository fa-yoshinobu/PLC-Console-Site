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
