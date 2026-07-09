/* ─── NAVIGATION ──────────────────────────────────── */
const pages = ['home','chat','crops','diseases','market','weather','schemes','about','contact'];

function showPage(name){
  pages.forEach(p=>{
    document.getElementById('page-'+p).classList.toggle('active', p===name);
    const nav = document.getElementById('nav-'+p);
    if(nav) nav.classList.toggle('active', p===name);
  });
  window.scrollTo(0,0);
  if(name==='crops') renderCrops();
}

function toggleMobile(){
  document.getElementById('mobileMenu').classList.toggle('open');
}

window.addEventListener('scroll',()=>{
  document.getElementById('topnav').classList.toggle('scrolled', window.scrollY>10);
});

/* ─── FAQ ─────────────────────────────────────────── */
function toggleFaq(el){el.classList.toggle('open');}

/* ─── CROP DATA ───────────────────────────────────── */
const crops = [
  {name:'Wheat',emoji:'🌾',season:'rabi',desc:'India\'s most important rabi cereal crop',tags:['Rabi','Oct–Nov sowing']},
  {name:'Paddy (Rice)',emoji:'🌾',season:'kharif',desc:'Staple food crop, needs flooded fields',tags:['Kharif','Jun–Jul sowing']},
  {name:'Maize',emoji:'🌽',season:'kharif',desc:'Versatile cereal for food, feed & starch',tags:['Kharif','Jun–Jul sowing']},
  {name:'Soybean',emoji:'🫘',season:'kharif',desc:'High-protein oilseed, grows in black soil',tags:['Kharif','Jun–Jul sowing']},
  {name:'Cotton',emoji:'🌿',season:'kharif',desc:'Cash crop, major fiber and oilseed',tags:['Kharif','May–Jun sowing']},
  {name:'Sugarcane',emoji:'🎋',season:'perennial',desc:'Major cash crop for sugar and jaggery',tags:['Perennial','Feb–Mar sowing']},
  {name:'Mustard',emoji:'🌼',season:'rabi',desc:'Major oilseed crop of North India',tags:['Rabi','Oct–Nov sowing']},
  {name:'Chickpea',emoji:'🫘',season:'rabi',desc:'Most important pulse in India (Bengal gram)',tags:['Rabi','Oct–Nov sowing']},
  {name:'Tomato',emoji:'🍅',season:'vegetable',desc:'High-value vegetable, grown year round',tags:['Vegetable','All seasons']},
  {name:'Onion',emoji:'🧅',season:'vegetable',desc:'Essential kitchen crop & major export',tags:['Vegetable','Oct–Nov sowing']},
  {name:'Potato',emoji:'🥔',season:'vegetable',desc:'Leading vegetable crop by volume in India',tags:['Vegetable','Oct–Nov sowing']},
  {name:'Groundnut',emoji:'🥜',season:'kharif',desc:'Premier oilseed & protein crop',tags:['Kharif','Jun–Jul sowing']},
  {name:'Mango',emoji:'🥭',season:'fruit',desc:'King of fruits — largest fruit crop in India',tags:['Fruit','Perennial']},
  {name:'Banana',emoji:'🍌',season:'fruit',desc:'Leading fruit crop by production',tags:['Fruit','Year-round']},
  {name:'Turmeric',emoji:'🟡',season:'kharif',desc:'Spice crop with high export demand',tags:['Kharif','May–Jun sowing']},
  {name:'Chilli',emoji:'🌶️',season:'vegetable',desc:'Major spice and vegetable crop',tags:['Vegetable','Jul–Aug sowing']},
];

function filterCrops(season, btn){
  document.querySelectorAll('.cf-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderCrops(season);
}

function renderCrops(filter='all'){
  const grid = document.getElementById('cropsGrid');
  const filtered = filter==='all' ? crops : crops.filter(c=>c.season===filter);
  grid.innerHTML = filtered.map(c=>`
    <div class="crop-card">
      <div class="crop-thumb">${c.emoji}</div>
      <div class="crop-info">
        <h4>${c.name}</h4>
        <p>${c.desc}</p>
        <div class="crop-tags">${c.tags.map(t=>`<span class="crop-tag ${c.season}">${t}</span>`).join('')}</div>
      </div>
      <button class="ask-crop-btn" onclick="askAboutCrop('${c.name}')">Ask AI about ${c.name} →</button>
    </div>
  `).join('');
}

function askAboutCrop(name){
  showPage('chat');
  setTimeout(()=>{
    document.getElementById('mainInput').value = `Tell me everything about growing ${name} — varieties, fertilizers, common diseases, and best practices.`;
    sendChat();
  }, 300);
}
function askAboutDisease(q){
  showPage('chat');
  setTimeout(()=>{ document.getElementById('mainInput').value=q; sendChat(); },300);
}
function askAboutScheme(q){
  showPage('chat');
  setTimeout(()=>{ document.getElementById('mainInput').value=q; sendChat(); },300);
}
function askTopic(q){
  document.getElementById('mainInput').value=q;
  sendChat();
}

/* ─── CONTACT FORM ────────────────────────────────── */
function submitForm(){
  document.getElementById('contactFormInner').style.display='none';
  document.getElementById('formSuccess').style.display='block';
}
function hideSuccess(){
  document.getElementById('contactFormInner').style.display='block';
  document.getElementById('formSuccess').style.display='none';
}

/* ─── AI CHAT ─────────────────────────────────────── */
const SYSTEM = `You are KisanAI, a highly knowledgeable and friendly AI agricultural advisor for Indian farmers. You have deep expertise in:
- Indian crop varieties, sowing seasons, and agronomic practices
- Plant diseases (fungal, bacterial, viral) and pest identification with accurate diagnosis
- Fertilizer recommendations (NPK, micronutrients) by crop and soil type
- Irrigation methods — drip, flood, sprinkler — scheduling and water requirements
- Organic farming, biofertilizers, and integrated pest management (IPM)
- Government schemes: PM-KISAN, PMFBY, KCC, Soil Health Card, PMKSY, eNAM
- Market prices, MSP, mandi rates, and selling strategies
- Post-harvest storage, value addition, and agro-processing
- Weather-based farm advisory

COMMUNICATION STYLE:
- Warm, respectful, and practical — like a knowledgeable friend, not a textbook
- Give specific product names, dosages, timing, and quantities when relevant
- Use emojis sparingly to make answers clear and friendly
- When uncertain, say so and suggest consulting a local agricultural officer or KVK
- Support Hindi/regional language questions naturally
- Keep answers focused and actionable — avoid unnecessary theory`;

let history = [];

function getTime(){
  return new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
}

function appendMsg(role, html, time){
  const win = document.getElementById('chatWindow');
  const isUser = role==='user';
  const row = document.createElement('div');
  row.className = 'msg-row' + (isUser?' user-row':'');
  row.innerHTML = `
    <div class="msg-avatar ${isUser?'user-avatar':'ai-avatar'}">${isUser?'👤':'🌾'}</div>
    <div>
      <div class="msg-bubble ${isUser?'user-bubble':'ai-bubble'}">
        ${isUser?'':' <span class="ai-badge">KisanAI</span>'}${html}
      </div>
      <div class="msg-meta">${time}</div>
    </div>`;
  win.appendChild(row);
  win.scrollTop = win.scrollHeight;
  return row;
}

function appendThinking(){
  const win = document.getElementById('chatWindow');
  const row = document.createElement('div');
  row.className='msg-row';
  row.id='thinking-row';
  row.innerHTML=`
    <div class="msg-avatar ai-avatar">🌾</div>
    <div><div class="msg-bubble ai-bubble" style="padding:14px 18px;">
      <span class="ai-badge">KisanAI</span>
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div></div>`;
  win.appendChild(row);
  win.scrollTop=win.scrollHeight;
}

function removeThinking(){
  const el=document.getElementById('thinking-row');
  if(el)el.remove();
}

function escHtml(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>');}

async function sendChat(){
  const input=document.getElementById('mainInput');
  const btn=document.getElementById('mainSend');
  const text=input.value.trim();
  if(!text||btn.disabled) return;

  input.value='';
  btn.disabled=true;

  const time=getTime();
  appendMsg('user', escHtml(text), time);
  appendThinking();

  try{
    const messages = history.map(m=>({role:m.role,content:m.content}));
    messages.push({role:'user',content:text});

    const res = await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-6',
        max_tokens:1000,
        system:SYSTEM,
        messages
      })
    });
    const data=await res.json();
    if(data.error) throw new Error(data.error.message);

    const reply=data.content[0].text;
    removeThinking();
    appendMsg('assistant',escHtml(reply),getTime());
    history.push({role:'user',content:text});
    history.push({role:'assistant',content:reply});
  }catch(e){
    removeThinking();
    appendMsg('assistant','Sorry, I had trouble connecting right now. Please check your internet connection and try again. 🙏',getTime());
  }

  btn.disabled=false;
  input.focus();
}

function clearChat(){
  history=[];
  const win=document.getElementById('chatWindow');
  win.innerHTML='';
  appendMsg('assistant','Chat cleared. How can I help you with your farm today? 🌾',getTime());
}

// Init crops on load
renderCrops();
