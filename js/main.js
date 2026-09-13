(function(){
  const cfg=window.VIKFLOW_CONFIG||{};
  const helpModal=document.getElementById('helpModal');
  document.querySelectorAll('[data-help]').forEach(b=>b.addEventListener('click',()=>helpModal&&helpModal.classList.add('show')));
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('.modal-backdrop').classList.remove('show')));
  if(helpModal) helpModal.addEventListener('click',e=>{if(e.target===helpModal)helpModal.classList.remove('show')});
  const menu=document.getElementById('menuToggle'), mobile=document.getElementById('mobileNav');
  if(menu) menu.addEventListener('click',()=>mobile.classList.toggle('open'));
  const header=document.getElementById('siteHeader');
  window.addEventListener('scroll',()=>header&&header.classList.toggle('scrolled',scrollY>10),{passive:true});
  const helpForm=document.getElementById('helpForm');
  helpForm&&helpForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const status=document.getElementById('helpStatus');
    if(!cfg.contactEndpoint){status.textContent='Form is ready. Add your contact endpoint in js/config.js to send it.';return;}
    await submitForm(helpForm,cfg.contactEndpoint,status);
  });
  async function submitForm(form,url,status){
    status.textContent='Sending…';
    try{
      const fd=new FormData(form);
      const r=await fetch(url,{method:'POST',headers:{'Accept':'application/json'},body:fd});
      if(!r.ok) throw new Error('Request failed');
      status.textContent='Thanks — received.';
      form.reset();
    }catch(err){status.textContent='Could not send right now. Please try again later.';}
  }
})();
