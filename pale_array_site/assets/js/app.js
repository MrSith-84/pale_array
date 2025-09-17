(function(){
  // Enhanced theme cycling: dark → light → void → ember
  const root = document.documentElement;
  const key = "pale-theme";
  const btn = document.getElementById("themeToggle");
  const themes = ["dark", "light", "void", "ember"];
  const themeSymbols = {
    dark: "◐",
    light: "☀",
    void: "●", 
    ember: "🔥"
  };
  
  // Defensive checks and initialization
  const saved = localStorage.getItem(key);
  const currentTheme = saved && themes.includes(saved) ? saved : "dark";
  root.setAttribute("data-theme", currentTheme);
  
  // Update button symbol and aria-current
  function updateThemeButton(theme) {
    if (btn) {
      btn.textContent = themeSymbols[theme] || "◐";
      btn.setAttribute("aria-current", theme);
      btn.setAttribute("aria-label", `Current theme: ${theme}. Click to cycle themes.`);
    }
  }
  
  updateThemeButton(currentTheme);
  
  btn?.addEventListener("click", ()=>{
    const current = root.getAttribute("data-theme") || "dark";
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem(key, nextTheme);
    updateThemeButton(nextTheme);
  });

  // Simple per-page loaders
  const path = location.pathname.split("/").pop();
  if(path==="intel.html") loadIntel();
  if(path==="concord.html") loadConcord();
  if(path==="leadership.html") loadLeaders();
  if(path==="fleets.html") loadFleets();

  function createCard(className) {
    const article = document.createElement('article');
    article.className = className;
    const div = document.createElement('div');
    div.className = 'pad';
    article.appendChild(div);
    return { article, content: div };
  }

  function createBadge(className, text) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = text;
    return span;
  }

  function createKVPair(key, value) {
    const strong = document.createElement('strong');
    strong.textContent = key;
    const div = document.createElement('div');
    div.textContent = value;
    return { key: strong, value: div };
  }

  function loadIntel(){
    fetch("data/factions.json").then(r=>r.json()).then(rows=>{
      const grid = document.getElementById("intelGrid"); grid.textContent="";
      rows.forEach(r=>{
        const badgeClass = r.threatLevel === "High" ? "badge high-badge" : "badge";
        const {article, content} = createCard("card");
        
        const h3 = document.createElement('h3');
        h3.textContent = r.name + ' ';
        h3.appendChild(createBadge(badgeClass, r.threatLevel));
        
        const summary = document.createElement('p');
        summary.textContent = r.summary;
        
        const kv = document.createElement('div');
        kv.className = 'kv';
        
        const leaderKV = createKVPair('Leader', r.leader);
        const postureKV = createKVPair('Posture', r.posture);
        const opsKV = createKVPair('Known Ops', (r.knownOps||[]).join(", "));
        const symbolKV = createKVPair('Symbol', r.symbol);
        
        kv.appendChild(leaderKV.key);
        kv.appendChild(leaderKV.value);
        kv.appendChild(postureKV.key);
        kv.appendChild(postureKV.value);
        kv.appendChild(opsKV.key);
        kv.appendChild(opsKV.value);
        kv.appendChild(symbolKV.key);
        kv.appendChild(symbolKV.value);
        
        content.appendChild(h3);
        content.appendChild(summary);
        content.appendChild(kv);
        grid.appendChild(article);
      });
    }).catch(()=>{
      document.getElementById("intelGrid").textContent="Failed to load.";
    });
  }

  function loadConcord(){
    Promise.all([fetch("data/concord_ops.json").then(r=>r.json())]).then(([d])=>{
      const p = document.getElementById("pillars");
      const o = document.getElementById("ops");
      (d.pillars||[]).forEach(x=>{
        const li = document.createElement("li"); li.textContent = `${x.name}: ${x.focus}`; p.appendChild(li);
      });
      (d.operations||[]).forEach(x=>{
        const li = document.createElement("li"); li.textContent = `${x.codename} — ${x.summary}`; o.appendChild(li);
      });
    }).catch(()=>{});
  }

  function loadLeaders(){
    fetch("data/leadership.json").then(r=>r.json()).then(rows=>{
      const list = document.getElementById("leaders"); list.textContent="";
      rows.forEach(r=>{
        const {article, content} = createCard("card");
        
        const h3 = document.createElement('h3');
        h3.textContent = r.name;
        
        const roleP = document.createElement('p');
        const em = document.createElement('em');
        em.textContent = r.role;
        roleP.appendChild(em);
        roleP.appendChild(document.createTextNode(' — ' + r.division + ' • '));
        roleP.appendChild(createBadge('badge', r.callsign));
        
        const bioP = document.createElement('p');
        bioP.textContent = r.bio;
        
        const quote = document.createElement('blockquote');
        quote.textContent = '"' + r.quote + '"';
        
        content.appendChild(h3);
        content.appendChild(roleP);
        content.appendChild(bioP);
        content.appendChild(quote);
        list.appendChild(article);
      });
    });
  }

  function loadFleets(){
    fetch("data/fleets.json").then(r=>r.json()).then(rows=>{
      const list = document.getElementById("fleets"); list.textContent="";
      rows.forEach(r=>{
        const {article, content} = createCard("card");
        
        const h3 = document.createElement('h3');
        h3.textContent = r.unit;
        
        const typeP = document.createElement('p');
        const em = document.createElement('em');
        em.textContent = r.type;
        typeP.appendChild(em);
        
        const kv = document.createElement('div');
        kv.className = 'kv';
        
        const commanderKV = createKVPair('Commander', r.commander);
        const aiKV = createKVPair('Adjunct AI', r.adjunct_ai);
        const mandateKV = createKVPair('Mandate', r.mandate);
        
        // Create assets list safely
        const assetsKey = document.createElement('strong');
        assetsKey.textContent = 'Assets';
        const assetsValue = document.createElement('div');
        (r.assets||[]).forEach((asset, index) => {
          if (index > 0) assetsValue.appendChild(document.createElement('br'));
          assetsValue.appendChild(document.createTextNode(`${asset.hull} — ${asset.class}`));
        });
        
        kv.appendChild(commanderKV.key);
        kv.appendChild(commanderKV.value);
        kv.appendChild(aiKV.key);
        kv.appendChild(aiKV.value);
        kv.appendChild(mandateKV.key);
        kv.appendChild(mandateKV.value);
        kv.appendChild(assetsKey);
        kv.appendChild(assetsValue);
        
        content.appendChild(h3);
        content.appendChild(typeP);
        content.appendChild(kv);
        list.appendChild(article);
      });
    });
  }
})();