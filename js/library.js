(function(){
  const files = {
    Project: ['content/projects/project-1.json'],
    'Case Study': ['content/case-studies/case-study-1.json'],
    Insight: ['content/insights/insight-1.json'],
    Resource: ['content/resources/resource-1.json']
  };
  const state = {items:[], filter:'all', q:''};
  const grid = document.getElementById('libraryGrid');
  const search = document.getElementById('search');
  const escape = (s='') => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const media = item => item.heroImage ? `<div class="card-media"><img src="${escape(item.heroImage)}" alt="${escape(item.heroAlt||item.title)}" loading="lazy"></div>` : '';
  function card(item){
    const tags = (item.tags||[]).map(t=>`<span class="tag">${escape(t)}</span>`).join('');
    const params = new URLSearchParams({type:item.type,slug:item.slug});
    const cta = item.type==='Resource' ? 'Get resource →' : 'Read →';
    return `<a class="card" href="item.html?${params.toString()}">${media(item)}<div class="card-top"><span class="type">${escape(item.type)}</span><span class="date">${escape(item.date||'')}</span></div><h2>${escape(item.title)}</h2><p>${escape(item.excerpt||'')}</p><div class="tags">${tags}</div><div class="card-cta">${cta}</div></a>`;
  }
  function render(){
    const filtered = state.items.filter(i => (state.filter==='all'||i.type===state.filter) && `${i.title} ${i.excerpt||''} ${(i.tags||[]).join(' ')}`.toLowerCase().includes(state.q));
    if(!filtered.length){grid.innerHTML='<div class="empty">Nothing matches that filter.</div>';return}
    grid.innerHTML=filtered.sort((a,b)=>(a.order||99)-(b.order||99)).map(card).join('');
  }
  async function load(){
    const all=[];
    for(const [type, urls] of Object.entries(files)){
      for(const url of urls){
        try{const r=await fetch(url);if(!r.ok)throw new Error('HTTP '+r.status);const data=await r.json();data.type=data.type||type;all.push(data);}
        catch(e){console.warn('Could not load',url,e);}
      }
    }
    state.items=all;render();
  }
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.filter=b.dataset.filter;render();}));
  search.addEventListener('input',()=>{state.q=search.value.trim().toLowerCase();render();});
  load();
  window.VikFlowLibrary={items:()=>state.items};
})();
