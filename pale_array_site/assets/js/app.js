
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

  function el(html){ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; }

  function loadIntel(){
    fetch("data/factions.json").then(r=>r.json()).then(rows=>{
      const grid = document.getElementById("intelGrid"); grid.textContent="";
      rows.forEach(r=>{
        const badgeClass = r.threatLevel === "High" ? "badge high-badge" : "badge";
        const card = el(`<article class="card">
          <div class="pad">
            <h3>${r.name} <span class="${badgeClass}">${r.threatLevel}</span></h3>
            <p>${r.summary}</p>
            <div class="kv">
              <strong>Leader</strong><div>${r.leader}</div>
              <strong>Posture</strong><div>${r.posture}</div>
              <strong>Known Ops</strong><div>${(r.knownOps||[]).join(", ")}</div>
              <strong>Symbol</strong><div>${r.symbol}</div>
            </div>
          </div>
        </article>`);
        grid.appendChild(card);
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
        const card = el(`<article class="card"><div class="pad">
           <h3>${r.name}</h3>
           <p><em>${r.role}</em> — ${r.division} • <span class="badge">${r.callsign}</span></p>
           <p>${r.bio}</p>
           <blockquote>“${r.quote}”</blockquote>
        </div></article>`);
        list.appendChild(card);
      });
    });
  }

  function loadFleets(){
    fetch("data/fleets.json").then(r=>r.json()).then(rows=>{
      const list = document.getElementById("fleets"); list.textContent="";
      rows.forEach(r=>{
        const assets = (r.assets||[]).map(a=>`${a.hull} — ${a.class}`).join("<br>");
        const card = el(`<article class="card"><div class="pad">
          <h3>${r.unit}</h3>
          <p><em>${r.type}</em></p>
          <div class="kv">
            <strong>Commander</strong><div>${r.commander}</div>
            <strong>Adjunct AI</strong><div>${r.adjunct_ai}</div>
            <strong>Mandate</strong><div>${r.mandate}</div>
            <strong>Assets</strong><div>${assets}</div>
          </div>
        </div></article>`);
        list.appendChild(card);
      });
    });
  }
})();
