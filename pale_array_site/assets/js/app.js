
(function(){
  // Theme toggle
  const root = document.documentElement;
  const key = "pale-theme";
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem(key);
  if(saved) root.setAttribute("data-theme", saved);
  btn?.addEventListener("click", ()=>{
    const next = root.getAttribute("data-theme")==="dark" ? "light":"dark";
    root.setAttribute("data-theme", next); localStorage.setItem(key, next);
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
        const card = el(`<article class="card">
          <div class="pad">
            <h3>${r.name} <span class="badge">${r.threatLevel}</span></h3>
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
