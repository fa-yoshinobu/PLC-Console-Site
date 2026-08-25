(function(){
  var form=document.getElementById("site-search-form");
  var input=document.getElementById("site-search-input");
  var status=document.getElementById("search-status");
  var results=document.getElementById("search-results");
  var index=window.PLC_CONSOLE_SEARCH_INDEX;
  if(!form||!input||!status||!results||!Array.isArray(index))return;

  function normalize(value){
    return String(value||"").normalize("NFKC").toLocaleLowerCase("ja");
  }

  function score(item,query,tokens){
    var title=normalize(item.title);
    var description=normalize(item.description);
    var headings=normalize(item.headings.join(" "));
    var body=normalize(item.text);
    var searchable=[title,description,headings,body].join(" ");
    if(!tokens.every(function(token){return searchable.includes(token);}))return 0;
    var total=title.includes(query)?80:0;
    tokens.forEach(function(token){
      if(title.includes(token))total+=30;
      if(headings.includes(token))total+=15;
      if(description.includes(token))total+=8;
      if(body.includes(token))total+=2;
    });
    return total;
  }

  function resultCard(item){
    var article=document.createElement("article");
    article.className="search-result";
    var heading=document.createElement("h2");
    var link=document.createElement("a");
    link.href=item.url;
    link.textContent=item.title;
    heading.appendChild(link);
    var description=document.createElement("p");
    description.textContent=item.description;
    var path=document.createElement("small");
    path.textContent=item.url;
    article.appendChild(heading);
    article.appendChild(description);
    article.appendChild(path);
    return article;
  }

  function render(){
    var raw=input.value.trim();
    results.replaceChildren();
    if(!raw){
      status.textContent="検索する言葉を入力してください。";
      return;
    }
    var query=normalize(raw);
    var tokens=query.split(/\s+/).filter(Boolean);
    var matches=index.map(function(item){
      return {item:item,score:score(item,query,tokens)};
    }).filter(function(entry){
      return entry.score>0;
    }).sort(function(a,b){
      return b.score-a.score||a.item.title.localeCompare(b.item.title,"ja");
    }).slice(0,50);
    status.textContent=matches.length+"件見つかりました。";
    matches.forEach(function(entry){results.appendChild(resultCard(entry.item));});
  }

  form.addEventListener("submit",function(event){
    event.preventDefault();
    render();
  });
  input.addEventListener("input",render);
  var initial=new URLSearchParams(window.location.search).get("q");
  if(initial){input.value=initial;render();}
})();
