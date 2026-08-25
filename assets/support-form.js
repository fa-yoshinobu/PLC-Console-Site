(function(){
  var form=document.getElementById("support-form");
  if(!form)return;

  var button=form.querySelector("button[type='submit']");
  var status=document.getElementById("form-status");
  var defaultLabel=button?button.textContent:"";

  function resetSubmitState(){
    if(button){
      button.disabled=false;
      button.textContent=defaultLabel;
    }
    if(status)status.hidden=true;
  }

  form.addEventListener("submit",function(){
    if(button){
      button.disabled=true;
      button.textContent="送信中…";
    }
    if(status)status.hidden=false;
  });

  window.addEventListener("pageshow",resetSubmitState);
})();
