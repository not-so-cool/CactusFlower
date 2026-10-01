/* ============ ENGINE ============ */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const HOVER=matchMedia('(hover:hover) and (pointer:fine)').matches;
const NS='http://www.w3.org/2000/svg', TONES=['#c7ccb5','#dbd0bc','#b4bea4','#dcc6c0','#cfc6b0','#a9b39a'];
function mkPh(k,alt){
  const n=[...k].reduce((a,c)=>a+c.charCodeAt(0),0), s=document.createElementNS(NS,'svg');
  s.setAttribute('viewBox','0 0 400 500');s.setAttribute('preserveAspectRatio','xMidYMid slice');s.setAttribute('role','img');s.setAttribute('aria-label',alt);
  s.innerHTML=`<rect width="400" height="500" fill="${TONES[n%6]}"/><path d="M0 500V390Q120 335 200 392T400 355V500Z" fill="#000" opacity=".06"/><text x="200" y="254" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="15" fill="#1E211E" opacity=".55">${PHOTOS[k].split('/').pop()}</text>`;
  return s;
}
function fill(m){const k=m.dataset.photo,alt=m.dataset.alt||'';
  if(/\.(mp4|webm)$/i.test(PHOTOS[k])){
    const v=document.createElement('video');
    v.muted=true;v.loop=true;v.playsInline=true;v.autoplay=true;v.preload='metadata';
    v.setAttribute('aria-label',alt);
    v.onerror=()=>v.replaceWith(mkPh(k,alt));
    v.src=PHOTOS[k];m.appendChild(v);return}
  const i=new Image();i.alt=alt;i.loading='lazy';i.decoding='async';
  i.onerror=()=>i.replaceWith(mkPh(k,alt));i.src=PHOTOS[k];m.appendChild(i)}
const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const ANIM=!RM&&!!(window.gsap&&window.ScrollTrigger);
if(ANIM)document.documentElement.classList.add('live');

/* build from config */
$('#stmts').innerHTML=THINGS_SPECIAL.map((t,i)=>`<div class="stmt"><span class="lab">THING ${String(i+1).padStart(2,'0')}</span><h2>${esc(t.title)}</h2><p>${esc(t.note)}</p></div>`).join('');
$('#rlist').innerHTML=THINGS_I_LIKE.map((t,i)=>`<div class="lk"><span class="lab">${String(i+1).padStart(2,'0')}</span><p class="big">${t.crossed?`<span class="old"><span class="ot">${esc(t.crossed)}</span><i class="x"></i></span><br>`:''}<span class="nw">${esc(t.label)}</span></p><p class="nt">${esc(t.note)}</p></div>`).join('');
const cardHTML=(m,tag,cls,st)=>`<${tag} class="card ${cls}" style="${st}" ${tag==='button'?'type="button" aria-expanded="false"':''} data-view><span class="in"><span class="media" data-photo="${m.p}" data-alt="${esc(m.caption)}"></span><span class="cap">${esc(m.caption)}</span></span></${tag}>`;
$('#collage').innerHTML=MEMORIES.collage.map(m=>cardHTML(m,'button',m.pol?'pol':'',`--x:${m.x};--y:${m.y};--w:${m.w}`)).join('');
$('#track').innerHTML=`<p class="jh serif">${esc(MEMORIES.journeyHead)}</p>`+MEMORIES.journey.map(m=>cardHTML(m,'figure','jc pol',`--w:${m.w}vw;--dy:${m.dy};--r:${m.rot}deg`)).join('');
$('#fline').textContent=FULL_MEMORY.line;
$('#mt').textContent=CACTUS.title;
$('#ml').innerHTML=CACTUS.lines.map(l=>`<p class="mline">${esc(l)}</p>`).join('');
$('#hopes').innerHTML=HOPE.map(t=>`<p>${esc(t)}</p>`).join('');
$('#ltr').innerHTML=`<p>${esc(LETTER.to)}</p>`+LETTER.paras.map(p=>`<p>${esc(p)}</p>`).join('')+`<p class="sg">${esc(LETTER.sign)}</p>`;
$('#ia').textContent=INTERLUDE.a;
$('#ib').innerHTML=INTERLUDE.b.split(' ').map(w=>`<span class="w2">${esc(w)}</span>`).join(' ');
$('#bt').innerHTML=BIRTHDAY.title.map(t=>`<span class="ln"><span>${esc(t)}</span></span>`).join('');
$('#bl').textContent=BIRTHDAY.line;
$('#fa').textContent=FINAL_LINE;
$('#lastbtn').textContent=FINAL_BUTTON;
$('#fmsgs').innerHTML=FINAL_MESSAGES.map(m=>`<p class="fm">${esc(m)}</p>`).join('');
const SC=['#B79B5E','#C79A94','#7C8B6F','#E9CF8A'],NS_=matchMedia('(max-width:760px)').matches?14:26;
$('#sparks').innerHTML=Array.from({length:NS_},(_,i)=>{const k=['st','dot','pp'][i%3],z=k==='dot'?3+Math.random()*4:6+Math.random()*9;return `<i class="sp ${k}" style="--x:${(Math.random()*96).toFixed(1)}%;--y:${(Math.random()*90).toFixed(1)}%;--s:${z.toFixed(1)}px;--c:${SC[i%4]}"></i>`}).join('');
$$('.hero-photo .media,.cover .media,.full .media').forEach(m=>m.classList.add('vd'));
$('#notes').innerHTML=LITTLE_THINGS.map(t=>`<button class="note-b" type="button" aria-expanded="false" style="--x:${t.x};--y:${t.y};--d:${t.d}" data-tone="${t.tone}"><span class="s">${esc(t.short)}</span><span class="m"><span>${esc(t.more)}</span></span></button>`).join('');
$$('[data-photo]').forEach(fill);

/* smooth scroll */
let lenis;
if(!RM){
  gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
  if(window.Lenis){lenis=new Lenis({lerp:.09});
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);}
  // velocity: subtle type stretch + image drift, capped
  const vs={v:0,on:false},vq=gsap.quickTo(vs,'v',{duration:.6,ease:'power3'}),VEL=$$('.hero h1,.gal>h2,.like h2,.little h2,.meta .mt');
  gsap.set(VEL,{transformOrigin:'50% 0'});
  if(lenis)lenis.on('scroll',e=>vq(gsap.utils.clamp(-1,1,e.velocity/45)));
  gsap.ticker.add(()=>{const a=Math.abs(vs.v);if(a<.004&&!vs.on)return;vs.on=a>=.004;gsap.set(VEL,{scaleY:1+a*.03});gsap.set($$('.vd img,.vd svg'),{y:vs.v*-14})});
}

/* cursor */
if(HOVER){
  const c=$('.cur'),mx=gsap.quickTo(c,'x',{duration:.35,ease:'power3'}),my=gsap.quickTo(c,'y',{duration:.35,ease:'power3'});
  addEventListener('mousemove',e=>{mx(e.clientX);my(e.clientY)});
  document.addEventListener('mouseover',e=>c.classList.toggle('view',!!e.target.closest('[data-view]')));
}

/* 06 collage interactions: hover on desktop, tap/Enter toggles everywhere */
const cards=$$('.collage .card');
cards.forEach(c=>gsap.set(c,{rotation:MEMORIES.collage[cards.indexOf(c)].rot}));
function setOpen(c,on){
  c.classList.toggle('open',on);c.setAttribute('aria-expanded',on);$('#collage').classList.toggle('has-open',on);
  const r=c.getBoundingClientRect(),cx=r.left+r.width/2;
  cards.forEach(o=>{if(o===c)return;const q=o.getBoundingClientRect(),d=q.left+q.width/2>cx?1:-1;
    gsap.to(o,{x:on&&HOVER?d*28:0,opacity:on?.35:1,duration:RM?0:.6,ease:'power2.out'})});
}
cards.forEach(c=>{
  if(HOVER){c.addEventListener('mouseenter',()=>setOpen(c,true));c.addEventListener('mouseleave',()=>setOpen(c,false))}
  c.addEventListener('click',e=>{if(HOVER&&e.detail>0)return;const on=!c.classList.contains('open');cards.forEach(o=>o!==c&&o.classList.contains('open')&&setOpen(o,false));setOpen(c,on)});
});

/* 08 notes */
const nb=$$('.note-b');
nb.forEach(b=>b.addEventListener('click',()=>{
  const on=!b.classList.contains('open');
  nb.forEach(o=>{o.classList.remove('open');o.setAttribute('aria-expanded','false')});
  b.classList.toggle('open',on);b.setAttribute('aria-expanded',on);
  $('#notes').classList.toggle('has-open',on);
  $('.little').style.backgroundColor=on?b.dataset.tone:'';
}));

/* ============ MOTION ============ */
if(!RM){
  const ST=(tl,trig,per)=>ScrollTrigger.create({animation:tl,trigger:trig,start:'top top',end:'+='+(tl.duration()*per)+'%',pin:true,anticipatePin:1,scrub:.5});

  // 01 hero
  gsap.set('.hero-photo .media',{scale:1.15});
  gsap.timeline({delay:.25})
    .from('.hero h1 .ln>span',{yPercent:110,opacity:0,filter:'blur(14px)',duration:1.6,ease:'expo.out',stagger:.14})
    .from('.hero .sub',{opacity:0,y:14,duration:1.1},'-=.9')
    .fromTo('.hero-photo',{clipPath:'inset(100% 0% 0% 0% round 999px 999px 0 0)'},{clipPath:'inset(0% 0% 0% 0% round 999px 999px 0 0)',duration:1.9,ease:'power3.inOut'},'-=1.5')
    .from('.scrollcue',{opacity:0,duration:1},'-=.3');
  gsap.to('.hero-photo .media',{yPercent:-7,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

  // 02 intro: words settle in as you read (quiet, no pin)
  $$('.intro p').forEach(p=>{p.innerHTML=p.textContent.split(' ').map(w=>`<span class="w">${w}</span>`).join(' ')});
  gsap.fromTo('.intro .w',{opacity:.14},{opacity:1,stagger:.12,ease:'none',scrollTrigger:{trigger:'.intro',start:'top 65%',end:'bottom 75%',scrub:true}});

  // 03 cover: small centred photo expands to full bleed
  gsap.timeline({scrollTrigger:{trigger:'.cover',start:'top top',end:'+=140%',pin:true,anticipatePin:1,scrub:.6}})
    .fromTo('.cover .frame',{clipPath:'inset(27% 34% 27% 34% round 26px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'power2.inOut',duration:1},0)
    .fromTo('.cover .media',{scale:1},{scale:1.14,ease:'none',duration:1.7},0)
    .fromTo('.cover .note',{opacity:0,rotation:-12,y:20},{opacity:1,rotation:-4,y:0,duration:.5},1.1);

  // stepped sections: state is derived from scroll position, so fast scrolling or jumps can never leave items stacked
  function stepper(trig,items,per,inFn,outFn,reset){
    let cur=-1;const idx=p=>Math.min(items.length-1,Math.floor(p*items.length));
    const hide=()=>items.forEach(el=>{gsap.killTweensOf(el);gsap.set(el,{opacity:0})});
    const go=i=>{if(i===cur)return;const prev=items[cur];cur=i;
      items.forEach(el=>{if(el!==items[i]&&el!==prev){gsap.killTweensOf(el);gsap.set(el,{opacity:0})}});
      if(prev)outFn(prev);inFn(items[i],i)};
    hide();
    ScrollTrigger.create({trigger:trig,start:'top top',end:'+='+(items.length*per)+'%',pin:true,anticipatePin:1,
      onToggle:s=>{if(s.isActive)go(idx(s.progress))},onUpdate:s=>go(idx(s.progress)),
      onLeaveBack:()=>{cur=-1;hide();reset&&reset()}});
  }
  // 04 things: one statement at a time, the last steps back
  stepper('.things',$$('.stmt'),80,
    el=>gsap.fromTo(el,{opacity:0,y:70,scale:1,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',duration:1,ease:'power2.out'}),
    el=>gsap.to(el,{opacity:.0,scale:.93,y:-30,duration:.7,ease:'power2.in'}));

  // 05 like: written, struck out, replaced
  stepper('.like',$$('.lk'),100,el=>{
    const nw=$('.nw',el),cr=$('.ot',el),nt=$('.nt',el),wr={clipPath:'inset(0 0% 0 0)',duration:.9,ease:'steps(14)'},hid={clipPath:'inset(0 100% 0 0)'},t=gsap.timeline();
    t.fromTo(el,{opacity:0},{opacity:1,duration:.3});
    if(cr)t.fromTo(cr,hid,wr,.2).fromTo($('.x',el),{scaleX:0},{scaleX:1,duration:.45,ease:'power2.inOut'},1.5).fromTo(nw,hid,wr,2.2);else t.fromTo(nw,hid,wr,.2);
    t.fromTo(nt,{opacity:0},{opacity:.72,duration:.5},cr?2.8:1.2)},
    el=>gsap.to(el,{opacity:0,duration:.4}));

  // 06 collage: clip reveals + drifting speeds; journey scrolls sideways
  cards.forEach((c,i)=>{
    gsap.fromTo($('.media',c),{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:1.3,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%'}});
    gsap.to(c,{y:MEMORIES.collage[i].speed*140,ease:'none',scrollTrigger:{trigger:'.collage',start:'top bottom',end:'bottom top',scrub:true}});
  });
  const tr=$('#track');
  gsap.to(tr,{x:()=>-(tr.scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'#journey',start:'top top',end:()=>'+='+(tr.scrollWidth-innerWidth),pin:true,anticipatePin:1,scrub:.6,invalidateOnRefresh:true}});

  // 07 full-screen: almost still
  gsap.fromTo('.full .media',{scale:1.1},{scale:1,ease:'none',scrollTrigger:{trigger:'.full',start:'top bottom',end:'bottom top',scrub:true}});
  gsap.from('#fline',{opacity:0,duration:2.4,ease:'power1.out',scrollTrigger:{trigger:'.full',start:'top 40%'}});

  // 08 little things fade in; closing line draws
  gsap.from('.note-b',{opacity:0,y:20,duration:1.2,stagger:.2,clearProps:'opacity',scrollTrigger:{trigger:'.notes',start:'top 75%'}});
  gsap.from('.next i',{scaleY:0,transformOrigin:'top',duration:1.4,scrollTrigger:{trigger:'.next',start:'top 95%'}});

  // 09 name: one line at a time; the only line drawing in the site
  gsap.fromTo('.cs path',{strokeDashoffset:1},{strokeDashoffset:0,duration:1.6,ease:'power1.inOut',scrollTrigger:{trigger:'.meta',start:'top 60%'}});
  stepper('.meta',$$('.mline'),70,
    el=>{gsap.to('.mt',{opacity:.14,duration:.8});gsap.fromTo(el,{opacity:0,y:40},{opacity:1,y:0,duration:.9,ease:'power2.out'})},
    el=>gsap.to(el,{opacity:0,y:-30,duration:.6}),()=>gsap.set('.mt',{opacity:1}));

  // 10 hope: barely moving, long holds
  stepper('.hope',$$('.hope p'),110,
    el=>gsap.fromTo(el,{opacity:0,y:14},{opacity:1,y:0,duration:1.6,ease:'power1.out'}),
    el=>gsap.to(el,{opacity:0,duration:1.2,ease:'power1.in'}));

  // 11 letter: paragraphs rise in
  $$('.paper p').forEach(p=>gsap.from(p,{opacity:0,y:36,duration:1.1,ease:'power2.out',scrollTrigger:{trigger:p,start:'top 88%'}}));

  // 12 interlude: photo settles, then a small comic drop
  gsap.from('.ifig .media',{clipPath:'inset(100% 0 0 0)',duration:1.4,ease:'power3.out',scrollTrigger:{trigger:'.ifig',start:'top 80%'}});
  gsap.from('.ifig',{rotation:-5,duration:1.6,ease:'power2.out',scrollTrigger:{trigger:'.ifig',start:'top 80%'}});
  gsap.from('.ia',{opacity:0,y:16,duration:1.2,scrollTrigger:{trigger:'.ia',start:'top 88%'}});
  gsap.timeline({scrollTrigger:{trigger:'.ib',start:'top 85%'}})
    .from('.w2',{y:-70,opacity:0,rotation:'random(-12,12)',duration:1,ease:'bounce.out',stagger:.14})
    .fromTo('.scr path',{strokeDashoffset:1},{strokeDashoffset:0,duration:.8,ease:'power2.out'},'-=.3');

  // 13 birthday: the page brightens; light specks float only while visible
  gsap.fromTo('.bday',{backgroundColor:'#E4DAC7'},{backgroundColor:'#FFF4D6',ease:'none',scrollTrigger:{trigger:'.bday',start:'top 80%',end:'center center',scrub:true}});
  gsap.from('.bday h2 .ln>span',{yPercent:110,filter:'blur(10px)',opacity:0,duration:1.5,ease:'expo.out',stagger:.15,scrollTrigger:{trigger:'.bday',start:'top 45%'}});
  gsap.from('.bl',{opacity:0,y:16,duration:1.4,delay:.5,scrollTrigger:{trigger:'.bday',start:'top 35%'}});
  const spk=$$('.sp'),fl=gsap.timeline({paused:true});
  spk.forEach(e=>{gsap.set(e,{rotation:Math.random()*90});fl.to(e,{y:'random(-50,-18)',x:'random(-16,16)',rotation:'+=40',opacity:'random(.3,.9)',duration:'random(4,8)',repeat:-1,yoyo:true,ease:'sine.inOut'},Math.random()*2)});
  ScrollTrigger.create({trigger:'.bday',start:'top bottom',end:'bottom top',onToggle:t=>t.isActive?fl.play():fl.pause()});

  // 14 final photo: slow zoom, lines arrive late
  const t14=gsap.timeline();
  t14.fromTo('.final .media',{scale:1.02},{scale:1.2,ease:'none',duration:5},0)
     .fromTo('.final h2',{opacity:0,y:20},{opacity:1,y:0,duration:1.4},.8)
     .fromTo('.hb',{opacity:0},{opacity:.85,duration:1},2.6).to({},{duration:1});
  ST(t14,'.final',50);

  // refresh once fonts and layout settle
  const rf=()=>ScrollTrigger.refresh();addEventListener('load',rf);document.fonts&&document.fonts.ready.then(rf);
}

/* 12 photo tilt (static too) */
gsap.set('.ifig',{rotation:1.5});
/* 15 final interaction */
$('#lastbtn').addEventListener('click',e=>{const b=e.currentTarget,f=$('#fmsgs');b.disabled=true;f.hidden=false;
  if(RM){b.hidden=true;gsap.set('.fm',{opacity:1});return}
  gsap.to(b,{opacity:0,duration:.6,onComplete:()=>{b.hidden=true}});
  gsap.fromTo('.fm',{opacity:0,filter:'blur(10px)',y:12},{opacity:1,filter:'blur(0px)',y:0,duration:2,stagger:1.2,delay:.6});});
/* music: hidden unless the file loads; never autoplays */
if(MUSIC){const a=new Audio(),b=$('#mus');a.preload='metadata';a.loop=true;
  a.addEventListener('loadedmetadata',()=>{b.hidden=false});a.addEventListener('error',()=>{b.hidden=true});a.src=MUSIC;
  b.addEventListener('click',()=>{if(a.paused){a.play().then(()=>b.setAttribute('aria-pressed','true')).catch(()=>{})}else{a.pause();b.setAttribute('aria-pressed','false')}})}
