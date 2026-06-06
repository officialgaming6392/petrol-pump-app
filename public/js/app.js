
async function uploadPhoto(file) {
  const formData = new FormData();
  formData.append('photo', file);
  const res = await fetch('/api/upload', { method: 'POST', body: formData });
  const data = await res.json();
  return data.url;
}

const DB_KEY='dfs_app_v2';

/* ── TOAST SYSTEM ── */
function showToast(msg,type='info',duration=3200){
  const icons={info:'ti-info-circle',success:'ti-circle-check',warn:'ti-alert-circle',error:'ti-alert-triangle'};
  const el=document.createElement('div');
  el.className=`toast toast-${type}`;
  el.innerHTML=`<i class="ti ${icons[type]||icons.info} toast-icon" aria-hidden="true"></i><span style="flex:1">${msg}</span><span class="toast-close" onclick="this.parentElement.remove()">✕</span>`;
  const container=document.getElementById('toast-container');
  container.appendChild(el);
  setTimeout(()=>{el.classList.add('removing');setTimeout(()=>el.remove(),260);},duration);
}

/* ── CUSTOM CONFIRM ── */
let _confirmResolve=null;
function appConfirm(msg,title='Confirm',danger=false){
  return new Promise(resolve=>{
    _confirmResolve=resolve;
    document.getElementById('confirm-title').textContent=title;
    document.getElementById('confirm-msg').textContent=msg;
    document.getElementById('confirm-ok').className=danger?'danger-ok':'';
    document.getElementById('confirm-icon').textContent=danger?'🗑️':'⚠️';
    document.getElementById('confirm-overlay').classList.add('open');
  });
}
function confirmResolve(val){
  document.getElementById('confirm-overlay').classList.remove('open');
  if(_confirmResolve){_confirmResolve(val);_confirmResolve=null;}
}
const defaultDB={
settings:{petrolRate:102.83,dieselRate:96.18,lowStockThreshold:2000,adminPIN:'1234'},
// Machine meter readings: last closing reading per machine per fuel type
machineReadings:{
  '1':{petrol:125430.550,diesel:98210.320},
  '2':{petrol:87654.120,diesel:65432.780}
},
inventory:{
  petrol:{openingStock:12500,receivedStock:10000,soldStock:4850,closingStock:17650,capacity:16000},
  diesel:{openingStock:14000,receivedStock:12000,soldStock:6200,closingStock:19800,capacity:35000}
},
employees:[
  {id:'emp_01',name:'Rahul Kumar',mobile:'9876543210',salary:15000,joiningDate:'2025-01-15',shortageBalance:250,advanceBalance:0,advanceHistory:[],attendance:{'2026-06-01':'present','2026-06-02':'present','2026-06-03':'present','2026-06-04':'present','2026-06-05':'present'}},
  {id:'emp_02',name:'Amit Singh',mobile:'9988776655',salary:16000,joiningDate:'2025-03-10',shortageBalance:0,advanceBalance:1500,advanceHistory:[{id:'adv_01',date:'2026-06-01',type:'advance',amount:2000,note:'Festival advance',balanceAfter:2000},{id:'adv_02',date:'2026-06-03',type:'payment',amount:500,note:'Partial deduction',balanceAfter:1500}],attendance:{'2026-06-01':'present','2026-06-02':'present','2026-06-03':'absent','2026-06-04':'present','2026-06-05':'present'}},
  {id:'emp_03',name:'Vikram Patel',mobile:'8877665544',salary:14500,joiningDate:'2025-05-20',shortageBalance:500,advanceBalance:0,advanceHistory:[],attendance:{'2026-06-01':'present','2026-06-02':'present','2026-06-03':'present','2026-06-04':'present','2026-06-05':'absent'}}
],
customers:[
  {id:'cust_01',name:'Ramesh Yadav (Yadav Travels)',mobile:'9450123456',vehicle:'UP80-AT-1234',balance:4500,transactions:[
    {id:'tx_01',dateTime:'2026-06-01T09:30:00',type:'credit',amount:3000,fuelType:'Diesel',liters:33.6,attendant:'Rahul Kumar',balanceAfter:3000,approved:true,status:'Approved'},
    {id:'tx_02',dateTime:'2026-06-03T11:15:00',type:'credit',amount:2500,fuelType:'Diesel',liters:28.0,attendant:'Amit Singh',balanceAfter:5500,approved:true,status:'Approved'},
    {id:'tx_03',dateTime:'2026-06-04T18:00:00',type:'recovery',amount:1000,fuelType:'N/A',liters:0,attendant:'Vikram Patel',balanceAfter:4500,approved:true,status:'Approved'}
  ]},
  {id:'cust_02',name:'Gaurav Transport Co.',mobile:'9140987654',vehicle:'UP80-BK-5678',balance:8900,transactions:[
    {id:'tx_04',dateTime:'2026-06-02T08:45:00',type:'credit',amount:5000,fuelType:'Diesel',liters:56.0,attendant:'Amit Singh',balanceAfter:5000,approved:true,status:'Approved'},
    {id:'tx_05',dateTime:'2026-06-03T17:30:00',type:'credit',amount:4900,fuelType:'Petrol',liters:50.7,attendant:'Vikram Patel',balanceAfter:9900,approved:true,status:'Approved'},
    {id:'tx_06',dateTime:'2026-06-05T10:00:00',type:'recovery',amount:1000,fuelType:'N/A',liters:0,attendant:'Rahul Kumar',balanceAfter:8900,approved:true,status:'Approved'}
  ]},
  {id:'cust_03',name:'Verma Ji (Personal)',mobile:'9335112233',vehicle:'UP80-CH-9012',balance:1200,transactions:[
    {id:'tx_07',dateTime:'2026-06-01T19:00:00',type:'credit',amount:1200,fuelType:'Petrol',liters:12.4,attendant:'Rahul Kumar',balanceAfter:1200,approved:true,status:'Approved'}
  ]}
],
shifts:[
  {id:'shift_01',date:'2026-06-01',shiftType:'Day',machine:'1',attendantId:'emp_01',attendantName:'Rahul Kumar',openPetrolMeter:124980.550,closePetrolMeter:125430.550,openDieselMeter:97610.320,closeDieselMeter:98210.320,petrolSoldQty:450,petrolSoldAmount:43425,dieselSoldQty:600,dieselSoldAmount:53520,totalFuelSale:96945,onlineCollection:45000,expectedCash:51945,cashCollected:51695,cashDifference:-250,udhaarGiven:4200,udhaarRecovered:0,netCollection:47495,status:'Closed'},
  {id:'shift_02',date:'2026-06-02',shiftType:'Day',machine:'2',attendantId:'emp_02',attendantName:'Amit Singh',openPetrolMeter:87154.120,closePetrolMeter:87654.120,openDieselMeter:64732.780,closeDieselMeter:65432.780,petrolSoldQty:500,petrolSoldAmount:48250,dieselSoldQty:700,dieselSoldAmount:62440,totalFuelSale:110690,onlineCollection:60000,expectedCash:50690,cashCollected:50690,cashDifference:0,udhaarGiven:5000,udhaarRecovered:0,netCollection:45690,status:'Closed'},
  {id:'shift_03',date:'2026-06-03',shiftType:'Day',machine:'1',attendantId:'emp_03',attendantName:'Vikram Patel',openPetrolMeter:125430.550,closePetrolMeter:125830.550,openDieselMeter:98210.320,closeDieselMeter:98760.320,petrolSoldQty:400,petrolSoldAmount:38600,dieselSoldQty:550,dieselSoldAmount:49060,totalFuelSale:87660,onlineCollection:40000,expectedCash:47660,cashCollected:47160,cashDifference:-500,udhaarGiven:4900,udhaarRecovered:0,netCollection:42260,status:'Closed'},
  {id:'shift_04',date:'2026-06-04',shiftType:'Day',machine:'1',attendantId:'emp_01',attendantName:'Rahul Kumar',openPetrolMeter:125830.550,closePetrolMeter:126310.550,openDieselMeter:98760.320,closeDieselMeter:99410.320,petrolSoldQty:480,petrolSoldAmount:46320,dieselSoldQty:650,dieselSoldAmount:57980,totalFuelSale:104300,onlineCollection:55000,expectedCash:49300,cashCollected:49300,cashDifference:0,udhaarGiven:0,udhaarRecovered:1000,netCollection:50300,status:'Closed'},
  {id:'shift_05',date:'2026-06-05',shiftType:'Day',machine:'2',attendantId:'emp_02',attendantName:'Amit Singh',openPetrolMeter:87654.120,closePetrolMeter:88174.120,openDieselMeter:65432.780,closeDieselMeter:66232.780,petrolSoldQty:520,petrolSoldAmount:50180,dieselSoldQty:800,dieselSoldAmount:71360,totalFuelSale:121540,onlineCollection:70000,expectedCash:51540,cashCollected:51540,cashDifference:0,udhaarGiven:0,udhaarRecovered:1000,netCollection:52540,status:'Closed'}
],
notifications:[
  {id:'n1',dateTime:'2026-06-05T19:00:00',type:'info',message:'Daily shift closure completed by Amit Singh.',read:false},
  {id:'n2',dateTime:'2026-06-05T10:00:00',type:'success',message:'Recovery of ₹1,000 received from Gaurav Transport Co.',read:false},
  {id:'n3',dateTime:'2026-06-03T11:15:00',type:'warning',message:'Large Udhaar of ₹2,500 recorded for Ramesh Yadav.',read:true}
],
inventoryHistory:[
  {date:'2026-06-01',fuelType:'petrol',type:'sale',amount:450},{date:'2026-06-01',fuelType:'diesel',type:'sale',amount:600},
  {date:'2026-06-02',fuelType:'petrol',type:'sale',amount:500},{date:'2026-06-02',fuelType:'diesel',type:'sale',amount:700},
  {date:'2026-06-03',fuelType:'petrol',type:'sale',amount:400},{date:'2026-06-03',fuelType:'diesel',type:'sale',amount:550},
  {date:'2026-06-04',fuelType:'petrol',type:'sale',amount:480},{date:'2026-06-04',fuelType:'diesel',type:'sale',amount:650},
  {date:'2026-06-05',fuelType:'petrol',type:'sale',amount:520},{date:'2026-06-05',fuelType:'diesel',type:'sale',amount:800}
]};

let db,isAdmin=false,currentView='dashboard',activeLedgerCustId=null;


async function loadDB() {
  try {
    const res = await fetch('/api/db');
    const data = await res.json();
    if (!data.empty) {
      db = { ...defaultDB, ...data };
    } else {
      db = JSON.parse(JSON.stringify(defaultDB));
      await saveDB();
    }
  } catch(e) {
    db = JSON.parse(JSON.stringify(defaultDB));
  }
  window._shiftExpenses=[];
  renderDashboard();
}


async function saveDB() {
  try {
    await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(db)
    });
  } catch(e) {
    console.error(e);
  }
}

function fmt(n){return '₹'+Number(n||0).toLocaleString('en-IN');}
function fmtDate(d){if(!d)return '';const p=d.split('-');return `${p[2]}/${p[1]}/${p[0]}`;}
function fmtDT(s){const d=new Date(s);return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;}

function switchView(v){
  document.querySelectorAll('.view').forEach(el=>el.classList.remove('active'));
  document.getElementById('v-'+v).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el=>{if(el.getAttribute('onclick')&&el.getAttribute('onclick').includes("'"+v+"'"))el.classList.add('active');});
  // Reset detail panes
  const slp=document.getElementById('shifts-list-pane');const sdp=document.getElementById('shifts-detail-pane');
  if(slp)slp.style.display='block';if(sdp)sdp.style.display='none';
  const elp=document.getElementById('emp-list-pane');const edp=document.getElementById('emp-detail-pane');
  if(elp)elp.style.display='block';if(edp)edp.style.display='none';
  currentView=v;
  if(v==='dashboard')renderDashboard();
  else if(v==='shifts')renderShifts();
  else if(v==='udhaar'){showUdhaarTab('list');}
  else if(v==='inventory')renderInventory();
  else if(v==='employees')renderEmployees();
  else if(v==='reports')initReports();
}

function showUdhaarTab(tab){
  ['list','add-customer','record-tx','ledger'].forEach(t=>{
    const el=document.getElementById('utab-'+t);if(el)el.style.display='none';
  });
  ['tab-list','tab-add-customer','tab-record-tx'].forEach(t=>{
    const el=document.getElementById(t);if(el)el.classList.remove('active');
  });
  document.getElementById('utab-'+tab).style.display='block';
  if(tab!=='ledger'){
    const tEl=document.getElementById('tab-'+tab);if(tEl)tEl.classList.add('active');
  }
  if(tab==='list'){renderCustomerList();}
  if(tab==='record-tx'){populateDropdowns();}
}

function openModal(id){
  if(id==='modal-fuel'&&!isAdmin){showToast('Admin access required to record fuel deliveries.','error');return;}
  populateDropdowns();
  if(id==='modal-shift'){
    document.getElementById('sDate').value=new Date().toISOString().split('T')[0];
    document.getElementById('sMachine').value='1';
    document.getElementById('sOnline').value='0';
    document.getElementById('sClosePetrol').value='';
    document.getElementById('sCloseDiesel').value='';
    // Reset expenses
    window._shiftExpenses=[];
    renderExpensesList();
    // Reset notes
    initNoteCounter();
    // Auto-fetch udhaar and meter readings after dropdowns populated
    onShiftDateOrAttendantChange();
    calcShift();
  }
  if(id==='modal-attend'){document.getElementById('attDate').value=new Date().toISOString().split('T')[0];renderAttendanceList();}
  if(id==='modal-notifs')renderNotifs();
  document.getElementById(id).classList.add('open');
}
function closeModal(id){document.getElementById(id).classList.remove('open');}

function openUdhaarModal(){switchView('udhaar');showUdhaarTab('record-tx');}
function openUdhaarModalForCustomer(){
  if(!activeLedgerCustId)return;
  populateDropdowns();
  document.getElementById('uCustomer').value=activeLedgerCustId;
  showUdhaarTab('record-tx');
}

function populateDropdowns(){
  ['sAttendant','uAttendant'].forEach(id=>{
    const el=document.getElementById(id);if(!el)return;
    el.innerHTML=db.employees.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
  });
  const uc=document.getElementById('uCustomer');
  if(uc)uc.innerHTML=db.customers.map(c=>`<option value="${c.id}">${c.name} — ${c.vehicle} (Bal: ${fmt(c.balance)})</option>`).join('');
}


function toggleAdmin(){
  if(isAdmin){isAdmin=false;updateAdminUI();return;}
  document.getElementById('adminPinInput').value = '';
  document.getElementById('modal-admin-pin').classList.add('open');
  setTimeout(() => {
    document.getElementById('adminPinInput').focus();
    const box = document.getElementById('admin-modal-box');
    if(box) { box.style.transform = 'scale(1)'; box.style.opacity = '1'; }
  }, 10);
}

function closeAdminModal(){
  const box = document.getElementById('admin-modal-box');
  if(box) { box.style.transform = 'scale(0.9)'; box.style.opacity = '0'; }
  setTimeout(() => {
    document.getElementById('modal-admin-pin').classList.remove('open');
  }, 300);
}

function verifyAdminPin(){
  const pin = document.getElementById('adminPinInput').value;
  if(pin===db.settings.adminPIN){
    isAdmin=true;
    updateAdminUI();
    showToast('Admin mode activated!','success');
    closeAdminModal();
  } else {
    showToast('Incorrect PIN.','error');
  }
}

  
function updateAdminUI(){
  const els=document.querySelectorAll('.admin-gate');
  els.forEach(el=>el.style.display=isAdmin?'flex':'none');
  const pill=document.getElementById('adminPill');
  const setBtn=document.getElementById('settingsBtn');
  if(isAdmin){
    pill.textContent='Admin Active';
    pill.style.background='rgba(46, 204, 138, 0.15)';
    pill.style.color='var(--success)';
    pill.style.borderColor='rgba(46, 204, 138, 0.3)';
    if(setBtn) setBtn.style.display = 'flex';
  } else {
    pill.textContent='Staff Mode';
    pill.style.background='rgba(245, 197, 66, 0.15)';
    pill.style.color='var(--accent)';
    pill.style.borderColor='rgba(245, 197, 66, 0.3)';
    if(setBtn) setBtn.style.display = 'none';
  }
  if(currentView==='udhaar')renderCustomerList();
  if(currentView==='employees')renderEmployees();
}


function showNotifs(){openModal('modal-notifs');db.notifications.forEach(n=>n.read=true);saveDB();document.getElementById('notifDot').style.display='none';}
function renderNotifs(){
  const el=document.getElementById('notifsList');
  if(!db.notifications.length){el.innerHTML='<div class="empty-state"><i class="ti ti-bell-off" aria-hidden="true"></i><p>No notifications</p></div>';return;}
  el.innerHTML=db.notifications.slice(0,10).map(n=>`<div class="alert-item ${n.type}"><i class="ti ${n.type==='success'?'ti-circle-check':n.type==='warning'?'ti-alert-circle':n.type==='danger'?'ti-alert-triangle':'ti-info-circle'} alert-icon" aria-hidden="true"></i><div><div>${n.message}</div><div class="alert-time">${fmtDT(n.dateTime)}</div></div></div>`).join('');
}

function renderDashboard(){
  const today=new Date().toISOString().split('T')[0];
  const todayShifts=db.shifts.filter(s=>s.date===today);
  const totalSales=todayShifts.reduce((s,x)=>s+x.totalFuelSale,0);
  const totalL=todayShifts.reduce((s,x)=>s+x.petrolSoldQty+x.dieselSoldQty,0);
  const online=todayShifts.reduce((s,x)=>s+x.onlineCollection,0);
  const cash=todayShifts.reduce((s,x)=>s+x.cashCollected,0);
  const expCash=todayShifts.reduce((s,x)=>s+x.expectedCash,0);
  const diff=cash-expCash;
  const totalUdhaar=db.customers.reduce((s,c)=>s+c.balance,0);
  const activeDebtors=db.customers.filter(c=>c.balance>0).length;
  const d=new Date();
  document.getElementById('dashDate').textContent=d.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  document.getElementById('kpiSales').textContent=fmt(totalSales);
  document.getElementById('kpiLiters').textContent=totalL.toFixed(0)+' L sold today';
  document.getElementById('kpiOnline').textContent=fmt(online);
  document.getElementById('kpiOnlinePct').textContent=(totalSales>0?Math.round(online/totalSales*100):0)+'% of sales';
  document.getElementById('kpiCash').textContent=fmt(cash);
  const cs=document.getElementById('kpiCashStatus');
  if(diff<0){cs.textContent='Short: '+fmt(-diff);cs.className='sub warn';}
  else if(diff>0){cs.textContent='Excess: '+fmt(diff);cs.className='sub ok';}
  else{cs.textContent='Balanced';cs.className='sub ok';}
  document.getElementById('dashStatus').textContent=diff<0?'Shortage':'Balanced';
  document.getElementById('dashStatus').className='badge '+(diff<0?'warn':'ok');
  document.getElementById('kpiUdhaar').textContent=fmt(totalUdhaar);
  document.getElementById('kpiUdhaarCount').textContent=activeDebtors+' active accounts';
  const {petrol,diesel}=db.inventory;
  const pp=Math.round(petrol.closingStock/petrol.capacity*100);
  const dp=Math.round(diesel.closingStock/diesel.capacity*100);
  document.getElementById('gaugePetrol').style.width=pp+'%';
  document.getElementById('gaugeDiesel').style.width=dp+'%';
  document.getElementById('gaugePetrolVal').textContent=(petrol.closingStock/1000).toFixed(1)+'K L';
  document.getElementById('gaugeDieselVal').textContent=(diesel.closingStock/1000).toFixed(1)+'K L';
  const dateSales={};
  [...db.shifts].sort((a,b)=>a.date>b.date?1:-1).forEach(s=>{if(!dateSales[s.date])dateSales[s.date]={p:0,d:0};dateSales[s.date].p+=s.petrolSoldAmount;dateSales[s.date].d+=s.dieselSoldAmount;});
  const labels=Object.keys(dateSales).slice(-5);
  const maxVal=Math.max(...labels.map(l=>dateSales[l].p+dateSales[l].d),1);
  document.getElementById('salesChart').innerHTML=labels.map(l=>{const ph=Math.round((dateSales[l].p/maxVal)*88);const dh=Math.round((dateSales[l].d/maxVal)*88);return `<div class="chart-bar-group"><div class="chart-bar" style="height:${ph}px;background:var(--accent)"></div><div class="chart-bar" style="height:${dh}px;background:var(--accent2)"></div></div>`;}).join('');
  document.getElementById('salesLabels').innerHTML=labels.map(l=>{const p=l.split('-');return `<div class="chart-xlabel">${p[2]}/${p[1]}</div>`;}).join('');
  const al=document.getElementById('alertsList');
  if(!db.notifications.length){al.innerHTML='<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">No recent alerts</div>';return;}
  al.innerHTML=db.notifications.slice(0,4).map(n=>`<div class="alert-item ${n.type}"><i class="ti ${n.type==='success'?'ti-circle-check':n.type==='warning'?'ti-alert-circle':'ti-info-circle'} alert-icon" aria-hidden="true"></i><div style="font-size:12px">${n.message}</div></div>`).join('');
  const unread=db.notifications.filter(n=>!n.read).length;
  document.getElementById('notifDot').style.display=unread>0?'block':'none';
}

function renderShifts(){
  const el=document.getElementById('shiftsList');
  const shifts=[...db.shifts].sort((a,b)=>b.date>a.date?1:-1);
  if(!shifts.length){el.innerHTML='<div class="empty-state"><i class="ti ti-calendar-off" aria-hidden="true"></i><p>No shifts recorded yet.</p></div>';return;}
  el.innerHTML=shifts.map(s=>{
    const badge=s.cashDifference<0?`<span class="badge warn"><i class="ti ti-alert-triangle" aria-hidden="true"></i>${fmt(-s.cashDifference)} short</span>`:s.cashDifference>0?`<span class="badge ok">+${fmt(s.cashDifference)}</span>`:`<span class="badge ok">Balanced</span>`;
    const expInfo=s.totalExpenses>0?` · Exp: ${fmt(s.totalExpenses)}`:'';
    return `<div class="shift-row" style="cursor:pointer" onclick="openShiftDetail('${s.id}')">
      <div class="shift-left">
        <div class="shift-date">${fmtDate(s.date)} · ${s.shiftType}</div>
        <div class="shift-name">${s.attendantName}</div>
        <div class="shift-detail">${s.petrolSoldQty+s.dieselSoldQty}L · Machine ${s.machine||'—'} · Online: ${fmt(s.onlineCollection)}${expInfo}</div>
      </div>
      <div class="shift-right">
        <div class="shift-amt accent-val">${fmt(s.totalFuelSale)}</div>
        ${badge}
        <div style="font-size:10px;color:var(--text3);margin-top:2px">Tap for details →</div>
      </div>
    </div>`;
  }).join('');
}

function openShiftDetail(shiftId){
  const s=db.shifts.find(x=>x.id===shiftId);if(!s)return;
  document.getElementById('shifts-list-pane').style.display='none';
  document.getElementById('shifts-detail-pane').style.display='block';
  const emp=db.employees.find(e=>e.id===s.attendantId);
  const empPhoto=emp&&emp.photo?`<img src="${emp.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:
    `<span style="font-size:18px;font-weight:800">${(s.attendantName||'?').split(' ').map(w=>w[0]).join('')}</span>`;
  const colors=['#F5C542','#3D8EF0','#2ECC8A','#B07FFF'];
  const ci=emp?db.employees.indexOf(emp)%colors.length:0;
  const badgeHtml=s.cashDifference<0
    ?`<span class="badge warn" style="font-size:12px;padding:5px 12px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Short ${fmt(-s.cashDifference)}</span>`
    :s.cashDifference>0
    ?`<span class="badge ok" style="font-size:12px;padding:5px 12px">Excess ${fmt(s.cashDifference)}</span>`
    :`<span class="badge ok" style="font-size:12px;padding:5px 12px"><i class="ti ti-check" aria-hidden="true"></i> Balanced</span>`;

  let expHtml='<div style="color:var(--text3);font-size:12px">None recorded</div>';
  if(s.expenses&&s.expenses.length){
    expHtml=s.expenses.map(e=>`<div class="shift-detail-row"><span style="color:var(--text2)">${e.desc}</span><span class="blue-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">${fmt(e.amount)}</span></div>`).join('');
  }

  document.getElementById('shiftDetailContent').innerHTML=`
    <div class="card" style="border-color:rgba(245,197,66,0.2)">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
        <div style="width:56px;height:56px;border-radius:50%;background:${colors[ci]}22;border:2px solid ${colors[ci]}44;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0">${empPhoto}</div>
        <div style="flex:1">
          <div style="font-size:17px;font-weight:800">${s.attendantName}</div>
          <div style="font-size:11px;color:var(--text3);font-family:'JetBrains Mono',monospace">${fmtDate(s.date)} · ${s.shiftType} Shift · Machine ${s.machine||'—'}</div>
          <div style="margin-top:6px">${badgeHtml}</div>
        </div>
      </div>
      <!-- Sales Breakdown -->
      <div class="shift-detail-section">
        <div class="sdlbl">📟 Meter Readings (Machine ${s.machine||'—'})</div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Petrol Opening</span><span style="font-weight:700;font-family:'JetBrains Mono',monospace">${s.openPetrolMeter!=null?s.openPetrolMeter.toFixed(3):'—'}</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Petrol Closing</span><span class="accent-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">${s.closePetrolMeter!=null?s.closePetrolMeter.toFixed(3):'—'}</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Diesel Opening</span><span style="font-weight:700;font-family:'JetBrains Mono',monospace">${s.openDieselMeter!=null?s.openDieselMeter.toFixed(3):'—'}</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Diesel Closing</span><span class="blue-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">${s.closeDieselMeter!=null?s.closeDieselMeter.toFixed(3):'—'}</span></div>
      </div>
      <!-- Sales Breakdown -->
      <div class="shift-detail-section">
        <div class="sdlbl">⛽ Fuel Sales</div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Petrol Sold</span><span style="font-weight:700;font-family:'JetBrains Mono',monospace">${s.petrolSoldQty} L</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Petrol Amount</span><span class="accent-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">${fmt(s.petrolSoldAmount)}</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Diesel Sold</span><span style="font-weight:700;font-family:'JetBrains Mono',monospace">${s.dieselSoldQty} L</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Diesel Amount</span><span class="blue-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">${fmt(s.dieselSoldAmount)}</span></div>
        <div class="shift-detail-row" style="padding-top:8px;margin-top:4px;border-top:1px solid var(--border)"><span style="font-weight:800">Total Fuel Sale</span><span class="accent-val" style="font-size:16px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(s.totalFuelSale)}</span></div>
      </div>
      <!-- Collection Breakdown -->
      <div class="shift-detail-section">
        <div class="sdlbl">💳 Collection Breakdown</div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Online / UPI</span><span class="blue-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">${fmt(s.onlineCollection)}</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Udhaar Given</span><span class="red-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">${fmt(s.udhaarGiven)}</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Expenses Paid</span><span class="blue-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">${fmt(s.totalExpenses||0)}</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Expected Cash</span><span style="font-weight:700;font-family:'JetBrains Mono',monospace">${fmt(s.expectedCash)}</span></div>
        <div class="shift-detail-row"><span style="color:var(--text2)">Cash Collected</span><span class="green-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">${fmt(s.cashCollected)}</span></div>
        <div class="shift-detail-row" style="padding-top:8px;margin-top:4px;border-top:1px solid var(--border)">
          <span style="font-weight:800">Difference</span>
          <span class="${s.cashDifference<0?'red-val':s.cashDifference>0?'green-val':''}" style="font-size:15px;font-weight:800;font-family:'JetBrains Mono',monospace">
            ${s.cashDifference===0?'₹0 (Balanced)':s.cashDifference<0?'-'+fmt(-s.cashDifference)+' (Shortage)':'+'+fmt(s.cashDifference)+' (Excess)'}
          </span>
        </div>
        <div class="shift-detail-row"><span style="font-weight:800">Net Collection</span><span class="accent-val" style="font-size:16px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(s.netCollection)}</span></div>
      </div>
      <!-- Expenses List -->
      <div class="shift-detail-section">
        <div class="sdlbl">🧾 Other Expenses</div>
        ${expHtml}
        ${s.totalExpenses>0?`<div class="shift-detail-row" style="padding-top:8px;border-top:1px solid var(--border);margin-top:4px"><span style="font-weight:800">Total</span><span class="blue-val" style="font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(s.totalExpenses)}</span></div>`:''}
      </div>
    </div>
    ${isAdmin?`<button class="btn btn-danger full-btn" style="margin-bottom:20px" onclick="deleteShiftConfirm('${s.id}')"><i class="ti ti-trash" aria-hidden="true"></i>Delete This Record</button>`:''}
  `;
}

function closeShiftDetail(){
  document.getElementById('shifts-list-pane').style.display='block';
  document.getElementById('shifts-detail-pane').style.display='none';
}

async function deleteShiftConfirm(shiftId){
  if(!await appConfirm('Delete this shift record permanently?','Delete Shift',true))return;
  db.shifts=db.shifts.filter(s=>s.id!==shiftId);
  saveDB();closeShiftDetail();renderShifts();
}

function renderCustomerList(){
  const q=(document.getElementById('custSearch')||{}).value||'';
  const panel=document.getElementById('adminClearancePanel');
  panel.style.display=isAdmin?'block':'none';
  if(isAdmin)renderPendingClearances();
  const el=document.getElementById('customersList');
  let list=[...db.customers];
  if(q)list=list.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())||c.vehicle.toLowerCase().includes(q.toLowerCase()));
  if(!list.length){el.innerHTML='<div class="empty-state"><i class="ti ti-user-off" aria-hidden="true"></i><p>No customers found.</p></div>';return;}
  el.innerHTML=list.map(c=>{
    const initials=c.name.split(' ').map(w=>w[0]).slice(0,2).join('');
    const totalCredit=c.transactions.filter(t=>t.type==='credit'&&t.status!=='Rejected').reduce((s,t)=>s+t.amount,0);
    const totalRec=c.transactions.filter(t=>t.type==='recovery'&&t.approved).reduce((s,t)=>s+t.amount,0);
    const avatarHtml=c.photo?`<img src="${c.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:`<span>${initials}</span>`;
    return `<div class="cust-row" onclick="openCustomerLedger('${c.id}')">
      <div class="cust-avatar" style="overflow:hidden">${avatarHtml}</div>
      <div class="cust-info">
        <div class="cust-name">${c.name}</div>
        <div class="cust-vehicle">${c.vehicle}</div>
        <div style="font-size:10px;color:var(--text3);margin-top:3px">Credit: ${fmt(totalCredit)} · Recovered: ${fmt(totalRec)}</div>
      </div>
      <div class="cust-bal-col">
        <div class="cust-bal ${c.balance>0?'red-val':'green-val'}">${fmt(c.balance)}</div>
        <div class="cust-bal-lbl">${c.balance>0?'outstanding':'clear'}</div>
        <div style="font-size:10px;color:var(--text2);margin-top:4px;display:flex;align-items:center;gap:3px"><i class="ti ti-chevron-right" style="font-size:12px" aria-hidden="true"></i>Ledger</div>
      </div>
    </div>`;
  }).join('');
}

function openCustomerLedger(custId){
  activeLedgerCustId=custId;
  const c=db.customers.find(x=>x.id===custId);if(!c)return;
  const initials=c.name.split(' ').map(w=>w[0]).slice(0,2).join('');
  const wrap=document.getElementById('ledgerAvatarWrap');
  if(c.photo){
    wrap.innerHTML=`<img src="${c.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"><div class="avatar-edit-overlay"><i class="ti ti-camera" style="color:#fff;font-size:14px" aria-hidden="true"></i></div>`;
  } else {
    wrap.innerHTML=`<span id="ledgerAvatar">${initials}</span><div class="avatar-edit-overlay"><i class="ti ti-camera" style="color:#fff;font-size:14px" aria-hidden="true"></i></div>`;
  }
  document.getElementById('ledgerName').textContent=c.name;
  document.getElementById('ledgerVehicle').textContent=c.vehicle;
  document.getElementById('ledgerMobile').textContent='📞 '+c.mobile;
  const totalCredit=c.transactions.filter(t=>t.type==='credit'&&t.status!=='Rejected').reduce((s,t)=>s+t.amount,0);
  const totalRec=c.transactions.filter(t=>t.type==='recovery'&&t.approved).reduce((s,t)=>s+t.amount,0);
  document.getElementById('ledgerTotalCredit').textContent=fmt(totalCredit);
  document.getElementById('ledgerTotalRecovered').textContent=fmt(totalRec);
  document.getElementById('ledgerBalance').textContent=fmt(c.balance);
  document.getElementById('ledgerTxCount').textContent=c.transactions.length+' entries';

  const tbody=document.getElementById('ledgerTransactions');
  if(!c.transactions.length){
    tbody.innerHTML='<div class="empty-state" style="padding:20px 0"><i class="ti ti-receipt-off" aria-hidden="true"></i><p>No transactions recorded yet.</p></div>';
    showUdhaarTab('ledger');return;
  }

  let runningBal=0;
  const sortedTx=[...c.transactions].sort((a,b)=>new Date(a.dateTime)-new Date(b.dateTime));
  tbody.innerHTML=sortedTx.map((tx,i)=>{
    const isCredit=tx.type==='credit';
    if(tx.approved&&isCredit)runningBal+=tx.amount;
    else if(tx.approved&&!isCredit)runningBal=Math.max(0,runningBal-tx.amount);
    let tagClass,tagLabel;
    if(isCredit){tagClass='tag-credit';tagLabel='Udhaar Given';}
    else if(tx.status==='Approved'){tagClass='tag-recovery-ok';tagLabel='Recovery ✓';}
    else if(tx.status==='Pending Setoff'){tagClass='tag-recovery-pending';tagLabel='Pending Approval';}
    else{tagClass='tag-recovery-rejected';tagLabel='Rejected';}
    const desc=isCredit?`${tx.fuelType}${tx.liters>0?' · '+tx.liters.toFixed(1)+'L':''}`:'Cash Payment';
    return `<div class="ledger-tx">
      <div class="ledger-tx-top">
        <div>
          <span class="tag ${tagClass}">${tagLabel}</span>
          <div class="ledger-tx-desc" style="margin-top:5px">${desc}</div>
        </div>
        <div class="${isCredit?'red-val':'green-val'} ledger-tx-amt">${isCredit?'+':'-'}${fmt(tx.amount)}</div>
      </div>
      <div class="ledger-tx-meta">
        <div class="ledger-tx-info"><i class="ti ti-clock" style="font-size:11px" aria-hidden="true"></i> ${fmtDT(tx.dateTime)} · ${tx.attendant}</div>
        <div class="ledger-tx-bal">Bal: ${fmt(isCredit?tx.balanceAfter:(tx.approved?tx.balanceAfter:runningBal))}</div>
      </div>
    </div>`;
  }).join('');

  showUdhaarTab('ledger');
}


async function deleteCustomerConfirm(){
  if(!activeLedgerCustId)return;
  const c=db.customers.find(x=>x.id===activeLedgerCustId);if(!c)return;
  if(!await appConfirm(`Delete customer "${c.name}"?\nAll transaction history will be permanently removed.`,'Delete Customer',true))return;
  db.customers=db.customers.filter(x=>x.id!==activeLedgerCustId);
  activeLedgerCustId=null;saveDB();showUdhaarTab('list');
}

function renderPendingClearances(){
  const pending=[];
  db.customers.forEach(c=>c.transactions.forEach(t=>{if(t.type==='recovery'&&!t.approved&&t.status==='Pending Setoff')pending.push({c,t});}));
  document.getElementById('pendingCount').textContent=pending.length+' pending';
  const el=document.getElementById('pendingList');
  if(!pending.length){el.innerHTML='<div style="color:var(--text3);font-size:12px;padding:6px 0">No pending clearances.</div>';return;}
  el.innerHTML=pending.map(({c,t})=>`<div style="background:var(--surface2);border-radius:var(--r);padding:10px 12px;margin-bottom:8px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><strong style="font-size:13px">${c.name}</strong><span class="green-val" style="font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(t.amount)}</span></div>
    <div style="font-size:11px;color:var(--text3);margin-bottom:8px">${c.vehicle} · by ${t.attendant} · ${fmtDT(t.dateTime)}</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-success" onclick="approveRecovery('${c.id}','${t.id}')"><i class="ti ti-check" aria-hidden="true"></i>Approve</button>
      <button class="btn btn-danger" onclick="rejectRecovery('${c.id}','${t.id}')"><i class="ti ti-x" aria-hidden="true"></i>Reject</button>
    </div>
  </div>`).join('');
}

function approveRecovery(custId,txId){
  const c=db.customers.find(x=>x.id===custId);const t=c&&c.transactions.find(x=>x.id===txId);if(!c||!t)return;
  c.balance=Math.max(0,c.balance-t.amount);t.approved=true;t.status='Approved';t.balanceAfter=c.balance;
  db.notifications.unshift({id:'n'+Date.now(),dateTime:new Date().toISOString(),type:'success',message:`Recovery of ${fmt(t.amount)} approved for ${c.name}. New balance: ${fmt(c.balance)}.`,read:false});
  saveDB();renderPendingClearances();renderCustomerList();showToast(`Approved! New balance: ${fmt(c.balance)}`,'success');
}
async function rejectRecovery(custId,txId){
  if(!await appConfirm('Reject this recovery?','Reject Recovery',true))return;
  const c=db.customers.find(x=>x.id===custId);const t=c&&c.transactions.find(x=>x.id===txId);if(!c||!t)return;
  t.status='Rejected';t.approved=false;saveDB();renderPendingClearances();renderCustomerList();
}

async function saveNewCustomer(){
  const name=document.getElementById('nc-name').value.trim();
  const mobile=document.getElementById('nc-mobile').value.trim();
  const vehicle=document.getElementById('nc-vehicle').value.trim().toUpperCase();
  const opening=Math.max(0,+document.getElementById('nc-opening').value||0);
  if(!name){showToast('Enter customer name.','info');return;}
  if(!vehicle){showToast('Enter vehicle number.','info');return;}
  if(mobile&&(mobile.length!==10||isNaN(mobile))){showToast('Enter a valid 10-digit mobile number.','info');return;}
  const photoInp=document.getElementById('nc-photo');
  const doSave=(photoData)=>{
    const newCust={id:'cust_'+Date.now(),name,mobile,vehicle,balance:opening,photo:photoData,transactions:[]};
    if(opening>0){
      newCust.transactions.push({id:'tx_ob_'+Date.now(),dateTime:new Date().toISOString(),type:'credit',amount:opening,fuelType:'N/A',liters:0,attendant:'System (Opening Balance)',balanceAfter:opening,approved:true,status:'Approved'});
    }
    db.customers.push(newCust);saveDB();
    document.getElementById('nc-name').value='';document.getElementById('nc-mobile').value='';
    document.getElementById('nc-vehicle').value='';document.getElementById('nc-opening').value='0';
    document.getElementById('nc-avatar-preview').innerHTML='<i class="ti ti-camera" style="font-size:22px;color:var(--accent)" aria-hidden="true"></i>';
    populateDropdowns();
    showToast(`Customer "${name}" registered successfully!`,'success');
    showUdhaarTab('list');
  };
  if(photoInp.files[0]){const r=new FileReader();r.onload=e=>doSave(e.target.result);r.readAsDataURL(photoInp.files[0]);}
  else doSave(null);
}

function adminTabGuard(tab){
  if(!isAdmin){showToast('Admin access required. Switch to Admin Mode first.','error');return;}
  showUdhaarTab(tab);
}

function adminActionGuard(fn){
  if(!isAdmin){showToast('Admin access required. Switch to Admin Mode first.','error');return;}
  fn();
}

function previewCustomerPhoto(){
  const inp=document.getElementById('nc-photo');
  const file=inp.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const prev=document.getElementById('nc-avatar-preview');
    prev.innerHTML=`<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  };
  reader.readAsDataURL(file);
}

function updateCustomerPhoto(){
  const inp=document.getElementById('ledger-photo-input');
  const file=inp.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const c=db.customers.find(x=>x.id===activeLedgerCustId);if(!c)return;
    c.photo=e.target.result;saveDB();openCustomerLedger(activeLedgerCustId);
  };
  reader.readAsDataURL(file);
}

function toggleUdhaarFields(){
  const t=document.getElementById('uType').value;
  document.getElementById('uCreditFields').style.opacity=t==='recovery'?'0.4':'1';
  document.getElementById('uCreditFields').style.pointerEvents=t==='recovery'?'none':'auto';
}

function saveUdhaar(){
  const custId=document.getElementById('uCustomer').value;
  const type=document.getElementById('uType').value;
  const amount=+document.getElementById('uAmount').value;
  if(!custId){showToast('Select a customer.','info');return;}
  if(!amount||amount<=0){showToast('Enter a valid amount.','info');return;}
  const cust=db.customers.find(c=>c.id===custId);if(!cust)return;
  const attId=document.getElementById('uAttendant').value;
  const attName=db.employees.find(e=>e.id===attId)?.name||'Unknown';
  if(type==='credit'){
    cust.balance+=amount;
    cust.transactions.push({id:'tx_'+Date.now(),dateTime:new Date().toISOString(),type:'credit',amount,fuelType:document.getElementById('uFuel').value,liters:+document.getElementById('uLiters').value||0,attendant:attName,balanceAfter:cust.balance,approved:true,status:'Approved'});
    if(amount>=5000)db.notifications.unshift({id:'n'+Date.now(),dateTime:new Date().toISOString(),type:'warning',message:`Large Udhaar of ${fmt(amount)} for ${cust.name}.`,read:false});
  } else {
    const newBal=isAdmin?Math.max(0,cust.balance-amount):cust.balance;
    cust.transactions.push({id:'tx_'+Date.now(),dateTime:new Date().toISOString(),type:'recovery',amount,fuelType:'N/A',liters:0,attendant:attName,balanceAfter:newBal,approved:isAdmin,status:isAdmin?'Approved':'Pending Setoff'});
    if(isAdmin){cust.balance=newBal;db.notifications.unshift({id:'n'+Date.now(),dateTime:new Date().toISOString(),type:'success',message:`Recovery of ${fmt(amount)} approved for ${cust.name}.`,read:false});}
    else{db.notifications.unshift({id:'n'+Date.now(),dateTime:new Date().toISOString(),type:'info',message:`Recovery of ${fmt(amount)} from ${cust.name} awaiting Admin approval.`,read:false});}
  }
  saveDB();
  document.getElementById('uAmount').value='';document.getElementById('uLiters').value='';
  const msg=type==='credit'?'Udhaar recorded!':isAdmin?'Recovery approved & balance updated!':'Recovery logged — awaiting Admin approval.';
  showToast(msg,'info');
  if(activeLedgerCustId===custId){openCustomerLedger(custId);}
  else{showUdhaarTab('list');}
}

/* ── NOTE DENOMINATIONS ── */
const NOTE_DENOMS=[{v:500,l:'₹500'},{v:200,l:'₹200'},{v:100,l:'₹100'},{v:50,l:'₹50'},{v:20,l:'₹20'},{v:10,l:'₹10'},{v:1,l:'Coins (₹1)'}];
function initNoteCounter(){
  window._notes={};
  NOTE_DENOMS.forEach(d=>window._notes[d.v]=0);
  const el=document.getElementById('noteRows');if(!el)return;
  el.innerHTML=NOTE_DENOMS.map(d=>`
    <div style="display:flex;align-items:center;gap:8px">
      <div style="background:var(--surface2);border-radius:6px;padding:5px 8px;font-size:11px;font-weight:700;min-width:70px;text-align:center;font-family:'JetBrains Mono',monospace;color:var(--accent)">${d.l}</div>
      <div style="display:flex;align-items:center;gap:0;border:1px solid var(--border);border-radius:8px;overflow:hidden;flex:1">
        <button onclick="changeNote(${d.v},-1)" style="background:var(--surface2);border:none;color:var(--text2);padding:6px 12px;cursor:pointer;font-size:16px;font-weight:700;line-height:1">−</button>
        <input type="number" id="note_${d.v}" value="0" min="0" oninput="updateNoteTotal()" style="background:none;border:none;outline:none;color:var(--text);font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;text-align:center;width:50px;-moz-appearance:textfield">
        <button onclick="changeNote(${d.v},1)" style="background:var(--surface2);border:none;color:var(--text2);padding:6px 12px;cursor:pointer;font-size:16px;font-weight:700;line-height:1">+</button>
      </div>
      <div style="font-size:11px;font-weight:700;font-family:'JetBrains Mono',monospace;color:var(--text3);min-width:50px;text-align:right" id="noteAmt_${d.v}">₹0</div>
    </div>
  `).join('');
  updateNoteTotal();
}
function changeNote(denom,delta){
  const inp=document.getElementById('note_'+denom);if(!inp)return;
  inp.value=Math.max(0,(+inp.value||0)+delta);
  updateNoteTotal();
}
function updateNoteTotal(){
  let total=0;
  NOTE_DENOMS.forEach(d=>{
    const inp=document.getElementById('note_'+d.v);
    const cnt=Math.max(0,+inp?.value||0);
    const sub=cnt*d.v;
    total+=sub;
    const amtEl=document.getElementById('noteAmt_'+d.v);
    if(amtEl)amtEl.textContent=sub>0?fmt(sub):'₹0';
  });
  document.getElementById('sCash').value=total;
  document.getElementById('sCashDisplay').textContent=fmt(total);
  calcShift();
}

/* ── AUTO UDHAAR FETCH + METER READINGS ── */
function onShiftDateOrAttendantChange(){
  const date=document.getElementById('sDate').value;
  const attId=document.getElementById('sAttendant').value;
  const machine=document.getElementById('sMachine').value;
  if(!date||!attId){return;}
  const attName=db.employees.find(e=>e.id===attId)?.name||'';
  // Find all udhaar credits given by this attendant on this date
  const txs=[];
  db.customers.forEach(c=>{
    c.transactions.forEach(t=>{
      if(t.type==='credit'&&t.status!=='Rejected'&&t.attendant===attName){
        const txDate=t.dateTime.split('T')[0];
        if(txDate===date)txs.push({customer:c.name,vehicle:c.vehicle,...t});
      }
    });
  });
  const total=txs.reduce((s,t)=>s+t.amount,0);
  document.getElementById('sUdhaar').value=total;
  document.getElementById('sUdhaarAutoAmt').textContent=fmt(total);
  document.getElementById('sUdhaarCount').textContent=txs.length+' entr'+(txs.length===1?'y':'ies');
  if(txs.length===0){
    document.getElementById('sUdhaarDetails').innerHTML='<span style="color:var(--text3)">No udhaar recorded for this attendant on this date.</span>';
  } else {
    document.getElementById('sUdhaarDetails').innerHTML=txs.map(t=>`
      <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(240,79,89,0.1)">
        <span style="color:var(--text2)">${t.customer} · ${t.fuelType}${t.liters>0?' ('+t.liters.toFixed(1)+'L)':''}</span>
        <span class="red-val" style="font-weight:700;font-family:'JetBrains Mono',monospace">+${fmt(t.amount)}</span>
      </div>`).join('');
  }

  // Load meter readings for selected machine
  if(!db.machineReadings)db.machineReadings={'1':{petrol:0,diesel:0},'2':{petrol:0,diesel:0}};
  const readings=db.machineReadings[machine]||{petrol:0,diesel:0};
  const openP=readings.petrol||0;
  const openD=readings.diesel||0;
  document.getElementById('sOpenPetrol').value=openP.toFixed(3);
  document.getElementById('sOpenDiesel').value=openD.toFixed(3);
  document.getElementById('sOpenPetrolDisplay').textContent='Opening: '+openP.toFixed(3);
  document.getElementById('sOpenDieselDisplay').textContent='Opening: '+openD.toFixed(3);
  calcMeterQty();
  calcShift();
}

/* ── EXPENSES ── */
window._shiftExpenses=[];
function renderExpensesList(){
  const el=document.getElementById('expensesList');if(!el)return;
  const total=window._shiftExpenses.reduce((s,e)=>s+e.amount,0);
  if(!window._shiftExpenses.length){
    el.innerHTML='<div style="font-size:12px;color:var(--text3);padding:4px 0">No expenses added yet.</div>';
  } else {
    el.innerHTML=window._shiftExpenses.map((e,i)=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(61,142,240,0.1)">
        <span style="font-size:12px;color:var(--text2)">${e.desc}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="blue-val" style="font-weight:700;font-family:'JetBrains Mono',monospace;font-size:12px">${fmt(e.amount)}</span>
          <button onclick="removeExpense(${i})" style="background:rgba(240,79,89,0.12);border:1px solid rgba(240,79,89,0.2);border-radius:4px;color:var(--danger);font-size:10px;cursor:pointer;padding:2px 6px">✕</button>
        </div>
      </div>`).join('');
  }
  document.getElementById('lcExpenses').textContent=fmt(total);
  calcShift();
}
function addExpense(){
  const desc=(document.getElementById('expDesc').value||'').trim();
  const amt=+document.getElementById('expAmt').value;
  if(!desc){showToast('Enter expense description.','info');return;}
  if(!amt||amt<=0){showToast('Enter valid amount.','info');return;}
  window._shiftExpenses.push({desc,amount:amt});
  document.getElementById('expDesc').value='';
  document.getElementById('expAmt').value='';
  renderExpensesList();
}
function removeExpense(idx){
  window._shiftExpenses.splice(idx,1);
  renderExpensesList();
}

function calcMeterQty(){
  const openP=parseFloat(document.getElementById('sOpenPetrol').value)||0;
  const closeP=parseFloat(document.getElementById('sClosePetrol').value)||0;
  const openD=parseFloat(document.getElementById('sOpenDiesel').value)||0;
  const closeD=parseFloat(document.getElementById('sCloseDiesel').value)||0;
  const pQty=Math.max(0,parseFloat((closeP-openP).toFixed(3)));
  const dQty=Math.max(0,parseFloat((closeD-openD).toFixed(3)));
  const pAmt=Math.round(pQty*db.settings.petrolRate);
  const dAmt=Math.round(dQty*db.settings.dieselRate);
  document.getElementById('sPetrolQty').value=pQty;
  document.getElementById('sDieselQty').value=dQty;
  document.getElementById('sPetrolCalcDisplay').textContent=pQty.toFixed(3)+' L → '+fmt(pAmt);
  document.getElementById('sDieselCalcDisplay').textContent=dQty.toFixed(3)+' L → '+fmt(dAmt);
  calcShift();
}

function calcShift(){
  const pQty=+document.getElementById('sPetrolQty').value||0;
  const dQty=+document.getElementById('sDieselQty').value||0;
  const total=(pQty*db.settings.petrolRate)+(dQty*db.settings.dieselRate);
  const online=+document.getElementById('sOnline').value||0;
  const udhaar=+document.getElementById('sUdhaar').value||0;
  const expenses=(window._shiftExpenses||[]).reduce((s,e)=>s+e.amount,0);
  const cash=+document.getElementById('sCash').value||0;
  // Expected cash = total - online - udhaar - expenses
  const exp=Math.max(0,total-online-udhaar-expenses);
  const diff=cash-exp;
  document.getElementById('lcSales').textContent=fmt(Math.round(total));
  document.getElementById('lcUdhaarAmt').textContent=fmt(udhaar);
  document.getElementById('lcExpAmt').textContent=fmt(expenses);
  document.getElementById('lcOnlineAmt').textContent=fmt(online);
  document.getElementById('lcNet').textContent=fmt(cash);
  const de=document.getElementById('lcDiff');
  if(diff<0){de.textContent='-'+fmt(-diff)+' (Shortage)';de.style.color='var(--danger)';}
  else if(diff>0){de.textContent='+'+fmt(diff)+' (Excess)';de.style.color='var(--accent3)';}
  else{de.textContent='₹0 (Balanced)';de.style.color='var(--accent3)';}
}

function saveShift(){
  const closeP=parseFloat(document.getElementById('sClosePetrol').value)||0;
  const closeD=parseFloat(document.getElementById('sCloseDiesel').value)||0;
  const openP=parseFloat(document.getElementById('sOpenPetrol').value)||0;
  const openD=parseFloat(document.getElementById('sOpenDiesel').value)||0;
  const machine=document.getElementById('sMachine').value;
  if(!closeP&&!closeD){showToast('Enter at least one closing meter reading.','info');return;}
  if(closeP<openP){showToast('Closing petrol reading cannot be less than opening reading.','error');return;}
  if(closeD<openD){showToast('Closing diesel reading cannot be less than opening reading.','error');return;}
  const pQty=parseFloat((closeP-openP).toFixed(3));
  const dQty=parseFloat((closeD-openD).toFixed(3));
  const pAmt=Math.round(pQty*db.settings.petrolRate);
  const dAmt=Math.round(dQty*db.settings.dieselRate);
  const total=pAmt+dAmt;
  const online=+document.getElementById('sOnline').value||0;
  const udhaar=+document.getElementById('sUdhaar').value||0;
  const expenses=(window._shiftExpenses||[]).reduce((s,e)=>s+e.amount,0);
  const cash=+document.getElementById('sCash').value||0;
  const exp=Math.max(0,total-online-udhaar-expenses);
  const diff=cash-exp;
  const attId=document.getElementById('sAttendant').value;
  const attName=db.employees.find(e=>e.id===attId)?.name||'Unknown';
  const newShift={
    id:'shift_'+Date.now(),date:document.getElementById('sDate').value,shiftType:document.getElementById('sType').value,
    machine,attendantId:attId,attendantName:attName,
    openPetrolMeter:openP,closePetrolMeter:closeP,openDieselMeter:openD,closeDieselMeter:closeD,
    petrolSoldQty:pQty,petrolSoldAmount:pAmt,dieselSoldQty:dQty,dieselSoldAmount:dAmt,
    totalFuelSale:total,onlineCollection:online,expectedCash:exp,cashCollected:cash,
    cashDifference:diff,udhaarGiven:udhaar,udhaarRecovered:0,
    expenses:window._shiftExpenses.map(e=>({...e})),totalExpenses:expenses,
    netCollection:cash,status:'Closed'
  };
  // Update machine readings so next shift auto-populates
  if(!db.machineReadings)db.machineReadings={'1':{petrol:0,diesel:0},'2':{petrol:0,diesel:0}};
  db.machineReadings[machine]={petrol:closeP,diesel:closeD};
  if(diff<0){const emp=db.employees.find(e=>e.id===attId);if(emp)emp.shortageBalance+=Math.abs(diff);db.notifications.unshift({id:'n'+Date.now(),dateTime:new Date().toISOString(),type:'warning',message:`Shortage of ${fmt(-diff)} logged for ${attName}.`,read:false});}
  db.inventory.petrol.closingStock-=pQty;db.inventory.petrol.soldStock+=pQty;
  db.inventory.diesel.closingStock-=dQty;db.inventory.diesel.soldStock+=dQty;
  db.inventoryHistory.push({date:newShift.date,fuelType:'petrol',type:'sale',amount:pQty},{date:newShift.date,fuelType:'diesel',type:'sale',amount:dQty});
  db.shifts.unshift(newShift);saveDB();closeModal('modal-shift');
  if(currentView==='dashboard')renderDashboard();else if(currentView==='shifts')renderShifts();
  showToast('Shift saved! Machine '+machine+' readings updated.','success');
}

function renderInventory(){
  const {petrol,diesel}=db.inventory;
  document.getElementById('invPetrolVal').textContent=petrol.closingStock.toLocaleString()+' L';
  document.getElementById('invPetrolPct').textContent=Math.round(petrol.closingStock/petrol.capacity*100)+'% of '+petrol.capacity.toLocaleString()+'L cap';
  document.getElementById('invDieselVal').textContent=diesel.closingStock.toLocaleString()+' L';
  document.getElementById('invDieselPct').textContent=Math.round(diesel.closingStock/diesel.capacity*100)+'% of '+diesel.capacity.toLocaleString()+'L cap';
  document.getElementById('invSummary').innerHTML=[
    {l:'Petrol Opening',v:petrol.openingStock.toLocaleString(),c:''},
    {l:'Petrol Received',v:'+'+petrol.receivedStock.toLocaleString(),c:'green-val'},
    {l:'Petrol Sold',v:'-'+petrol.soldStock.toLocaleString(),c:'red-val'},
    {l:'Diesel Opening',v:diesel.openingStock.toLocaleString(),c:''},
    {l:'Diesel Received',v:'+'+diesel.receivedStock.toLocaleString(),c:'green-val'},
    {l:'Diesel Sold',v:'-'+diesel.soldStock.toLocaleString(),c:'red-val'}
  ].map(r=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--text2)">${r.l}</span><span class="${r.c}" style="font-weight:700;font-family:'JetBrains Mono',monospace">${r.v} L</span></div>`).join('');
  const logs=[...db.inventoryHistory].reverse().slice(0,15);
  document.getElementById('invHistory').innerHTML=logs.map(l=>{const s=l.type==='sale';return `<div class="inv-log"><div><div style="font-weight:700;font-size:12px;${s?'color:var(--danger)':'color:var(--accent3)'}">${l.fuelType.toUpperCase()} · ${s?'Sold':'Received'}</div><div style="font-size:10px;color:var(--text3);font-family:'JetBrains Mono',monospace">${fmtDate(l.date)}</div></div><div style="font-weight:800;font-family:'JetBrains Mono',monospace;font-size:13px;${s?'color:var(--danger)':'color:var(--accent3)'}">${s?'-':'+'}${l.amount.toLocaleString()} L</div></div>`;}).join('');
}

function renderEmployees(){
  const colors=['#F5C542','#3D8EF0','#2ECC8A','#B07FFF'];
  document.getElementById('employeesList').innerHTML=db.employees.map((emp,i)=>{
    const shifts=db.shifts.filter(s=>s.attendantId===emp.id);
    const totalSales=shifts.reduce((s,x)=>s+x.totalFuelSale,0);
    const totalShort=shifts.reduce((s,x)=>s+(x.cashDifference<0?Math.abs(x.cashDifference):0),0);
    const eff=totalSales>0?Math.max(0,Math.min(100,100-(totalShort/totalSales*100))):100;
    const c=colors[i%colors.length];
    const attDates=Object.keys(emp.attendance||{});
    const present=attDates.filter(d=>emp.attendance[d]==='present').length;
    const avatarContent=emp.photo?`<img src="${emp.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:`<span style="font-size:15px;font-weight:800;color:${c}">${emp.name.split(' ').map(w=>w[0]).join('')}</span>`;
    return `<div class="card" style="cursor:pointer;transition:border-color .2s;border-color:transparent" onmouseover="this.style.borderColor='${c}44'" onmouseout="this.style.borderColor='transparent'" onclick="openStaffDetail('${emp.id}')">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:48px;height:48px;border-radius:50%;background:${c}22;border:2px solid ${c}44;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">${avatarContent}</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:800">${emp.name}</div>
          <div style="font-size:11px;color:var(--text3)">📞 <a href="tel:${emp.mobile}" style="color:inherit; text-decoration:none; pointer-events:auto;" onclick="event.stopPropagation()">${emp.mobile}</a> · ${shifts.length} shifts</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:13px;font-weight:700;font-family:'JetBrains Mono',monospace">${fmt(emp.salary)}/mo</div>
          <div style="font-size:11px;margin-top:2px;${emp.shortageBalance>0?'color:var(--danger)':'color:var(--accent3)'}">${emp.shortageBalance>0?'Short: '+fmt(emp.shortageBalance):'✓ Clear'}</div>
          <div style="font-size:11px;margin-top:1px;${(emp.advanceBalance||0)>0?'color:var(--accent)':'color:var(--text3)'}">${(emp.advanceBalance||0)>0?'Adv: '+fmt(emp.advanceBalance):''}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px">View Profile →</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function openStaffDetail(empId){
  const emp=db.employees.find(e=>e.id===empId);if(!emp)return;
  document.getElementById('emp-list-pane').style.display='none';
  document.getElementById('emp-detail-pane').style.display='block';
  const colors=['#F5C542','#3D8EF0','#2ECC8A','#B07FFF'];
  const i=db.employees.indexOf(emp)%colors.length;
  const c=colors[i];
  const shifts=db.shifts.filter(s=>s.attendantId===emp.id).sort((a,b)=>b.date>a.date?1:-1);
  const totalSales=shifts.reduce((s,x)=>s+x.totalFuelSale,0);
  const totalShort=shifts.filter(s=>s.cashDifference<0).reduce((s,x)=>s+Math.abs(x.cashDifference),0);
  const totalExcess=shifts.filter(s=>s.cashDifference>0).reduce((s,x)=>s+x.cashDifference,0);
  const eff=totalSales>0?Math.max(0,Math.min(100,100-(totalShort/totalSales*100))):100;
  const attDates=Object.keys(emp.attendance||{}).sort((a,b)=>b>a?1:-1);
  const present=attDates.filter(d=>emp.attendance[d]==='present').length;
  const avatarContent=emp.photo?`<img src="${emp.photo}" style="width:100%;height:100%;object-fit:cover">`:`<span>${emp.name.split(' ').map(w=>w[0]).join('')}</span>`;
  const shiftDayRows=shifts.slice(0,20).map(s=>{
    const diff=s.cashDifference;
    return `<div class="shortage-day-row">
      <div>
        <div style="font-weight:700;font-size:12px">${fmtDate(s.date)} · ${s.shiftType}</div>
        <div style="font-size:11px;color:var(--text3)">${fmt(s.totalFuelSale)} total · Cash: ${fmt(s.cashCollected)}</div>
      </div>
      <span class="${diff<0?'red-val':diff>0?'green-val':''}" style="font-weight:800;font-family:'JetBrains Mono',monospace;font-size:12px">
        ${diff===0?'—':diff<0?'-'+fmt(-diff):'+'+fmt(diff)}
      </span>
    </div>`;
  }).join('');

  document.getElementById('empDetailContent').innerHTML=`
    <div class="staff-profile-header">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
        <div class="staff-avatar-big" style="width:72px;height:72px;background:${c}22;border:2px solid ${c}55;color:${c}" onclick="isAdmin&&triggerStaffPhotoUpload('${emp.id}')">
          ${avatarContent}
          <div class="avatar-edit-overlay"><i class="ti ti-camera" style="color:#fff;font-size:16px" aria-hidden="true"></i></div>
        </div>
        <input type="file" id="staff-photo-input-${emp.id}" accept="image/*" style="display:none" onchange="updateStaffPhoto('${emp.id}',this)">
        <div style="flex:1">
          <div style="font-size:18px;font-weight:800;margin-bottom:2px">${emp.name}</div>
          <div style="font-size:12px;color:var(--text3)">📞 <a href="tel:${emp.mobile}" style="color:inherit; text-decoration:none; pointer-events:auto;" onclick="event.stopPropagation()">${emp.mobile}</a></div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px">Joined: ${fmtDate(emp.joiningDate)}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
        <div style="background:var(--surface2);border-radius:var(--r);padding:10px;text-align:center">
          <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Salary</div>
          <div class="accent-val" style="font-size:14px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(emp.salary)}</div>
        </div>
        <div style="background:var(--surface2);border-radius:var(--r);padding:10px;text-align:center">
          <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Efficiency</div>
          <div class="${eff>=99?'green-val':'accent-val'}" style="font-size:14px;font-weight:800">${eff.toFixed(1)}%</div>
        </div>
        <div style="background:${emp.shortageBalance>0?'rgba(240,79,89,.08)':'rgba(46,204,138,.08)'};border:1px solid ${emp.shortageBalance>0?'rgba(240,79,89,.2)':'rgba(46,204,138,.2)'};border-radius:var(--r);padding:10px;text-align:center">
          <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Shortage</div>
          <div class="${emp.shortageBalance>0?'red-val':'green-val'}" style="font-size:14px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(emp.shortageBalance)}</div>
        </div>
        <div style="background:${(emp.advanceBalance||0)>0?'rgba(245,197,66,.08)':'rgba(46,204,138,.08)'};border:1px solid ${(emp.advanceBalance||0)>0?'rgba(245,197,66,.2)':'rgba(46,204,138,.2)'};border-radius:var(--r);padding:10px;text-align:center">
          <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Advance</div>
          <div class="${(emp.advanceBalance||0)>0?'accent-val':'green-val'}" style="font-size:14px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(emp.advanceBalance||0)}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><div class="card-title">Attendance Summary</div><span style="font-size:11px;color:var(--text2)">${present}/${attDates.length} present</span></div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${attDates.slice(0,30).map(d=>`<div style="padding:4px 8px;border-radius:6px;font-size:10px;font-weight:700;font-family:'JetBrains Mono',monospace;background:${emp.attendance[d]==='present'?'rgba(46,204,138,0.12)':'rgba(240,79,89,0.12)'};color:${emp.attendance[d]==='present'?'var(--accent3)':'var(--danger)'}">${fmtDate(d)}</div>`).join('')}
        ${attDates.length===0?'<div style="color:var(--text3);font-size:12px">No attendance recorded yet.</div>':''}
      </div>
    </div>

    <div class="card">
      <div class="card-head"><div class="card-title">Shift-wise Shortage / Excess</div><span style="font-size:11px;color:var(--text2)">${shifts.length} shifts</span></div>
      <div style="display:flex;gap:10px;margin-bottom:12px">
        <div style="flex:1;background:rgba(240,79,89,0.08);border:1px solid rgba(240,79,89,0.2);border-radius:var(--r);padding:10px;text-align:center">
          <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Total Shortage</div>
          <div class="red-val" style="font-size:15px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(totalShort)}</div>
        </div>
        <div style="flex:1;background:rgba(46,204,138,0.08);border:1px solid rgba(46,204,138,0.2);border-radius:var(--r);padding:10px;text-align:center">
          <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Total Excess</div>
          <div class="green-val" style="font-size:15px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(totalExcess)}</div>
        </div>
      </div>
      ${shiftDayRows||'<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">No shifts recorded.</div>'}
    </div>

    <div style="display:flex;gap:8px;margin-bottom:20px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="settleSalary('${emp.id}')"><i class="ti ti-cash" aria-hidden="true"></i>Settle Salary</button>
      ${isAdmin?`<button class="btn btn-success" style="flex:1;justify-content:center" onclick="openAdvanceModal('${emp.id}')"><i class="ti ti-arrows-exchange" aria-hidden="true"></i>Advance/Pay</button>`:''}
      ${isAdmin?`<button class="btn btn-danger" style="padding:10px 12px;justify-content:center" onclick="deleteStaffConfirm('${emp.id}')"><i class="ti ti-trash" aria-hidden="true"></i></button>`:''}
    </div>

    <!-- Advance History -->
    <div class="card">
      <div class="card-head">
        <div class="card-title">Advance &amp; Payment History</div>
        <span class="${(emp.advanceBalance||0)>0?'red-val':'green-val'}" style="font-size:13px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(emp.advanceBalance||0)}</span>
      </div>
      ${(emp.advanceHistory&&emp.advanceHistory.length)?`
        <div style="background:var(--surface2);border-radius:var(--r);padding:8px 12px;margin-bottom:10px;display:flex;justify-content:space-between">
          <span style="font-size:12px;color:var(--text2)">Outstanding Advance</span>
          <span class="${(emp.advanceBalance||0)>0?'red-val':'green-val'}" style="font-size:14px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(emp.advanceBalance||0)}</span>
        </div>
        ${[...(emp.advanceHistory||[])].reverse().map(a=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border)">
            <div>
              <div style="font-size:12px;font-weight:700;color:${a.type==='advance'?'var(--danger)':'var(--accent3)'}">${a.type==='advance'?'↑ Advance Taken':'↓ Payment Deducted'}</div>
              <div style="font-size:11px;color:var(--text3)">${fmtDate(a.date)}${a.note?' · '+a.note:''}</div>
            </div>
            <div style="text-align:right">
              <div class="${a.type==='advance'?'red-val':'green-val'}" style="font-weight:800;font-family:'JetBrains Mono',monospace">${a.type==='advance'?'+':'-'}${fmt(a.amount)}</div>
              <div style="font-size:10px;color:var(--text3)">Bal: ${fmt(a.balanceAfter)}</div>
            </div>
            ${isAdmin?`<button onclick="deleteAdvanceRecord('${emp.id}','${a.id}')" style="background:rgba(240,79,89,0.1);border:1px solid rgba(240,79,89,0.2);border-radius:6px;color:var(--danger);font-size:10px;cursor:pointer;padding:3px 7px;margin-left:8px;flex-shrink:0">✕</button>`:''}
          </div>`).join('')}
      `:`<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px">No advance records yet.</div>`}
    </div>
  `;
}

function closeStaffDetail(){
  document.getElementById('emp-list-pane').style.display='block';
  document.getElementById('emp-detail-pane').style.display='none';
}

function triggerStaffPhotoUpload(empId){
  if(!isAdmin){showToast('Admin access required.','error');return;}
  document.getElementById('staff-photo-input-'+empId).click();
}

function updateStaffPhoto(empId,input){
  const file=input.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const emp=db.employees.find(x=>x.id===empId);if(!emp)return;
    emp.photo=e.target.result;saveDB();openStaffDetail(empId);
  };
  reader.readAsDataURL(file);
}

function previewStaffPhoto(){
  const inp=document.getElementById('ns-photo');
  const file=inp.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const prev=document.getElementById('ns-avatar-preview');
    prev.innerHTML=`<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  };
  reader.readAsDataURL(file);
}

function openAddStaffModal(){
  if(!isAdmin){showToast('Admin access required to add staff.','error');return;}
  document.getElementById('ns-name').value='';
  document.getElementById('ns-mobile').value='';
  document.getElementById('ns-salary').value='';
  document.getElementById('ns-joining').value=new Date().toISOString().split('T')[0];
  document.getElementById('ns-avatar-preview').innerHTML='<i class="ti ti-camera" style="font-size:24px;color:var(--accent2)" aria-hidden="true"></i>';
  openModal('modal-add-staff');
}

async function saveNewStaff(){
  const name=(document.getElementById('ns-name').value||'').trim();
  const mobile=(document.getElementById('ns-mobile').value||'').trim();
  const salary=+document.getElementById('ns-salary').value||0;
  const joining=document.getElementById('ns-joining').value;
  if(!name){showToast('Enter staff name.','info');return;}
  if(!salary){showToast('Enter salary.','info');return;}
  const photoInp=document.getElementById('ns-photo');
  let photo=null;
  const doSave=(photoData)=>{
    const newEmp={id:'emp_'+Date.now(),name,mobile,salary,joiningDate:joining,shortageBalance:0,attendance:{},photo:photoData};
    db.employees.push(newEmp);saveDB();
    closeModal('modal-add-staff');renderEmployees();
    showToast(`${name} added to staff roster!`,'success');
  };
  if(photoInp.files[0]){const r=new FileReader();r.onload=e=>doSave(e.target.result);r.readAsDataURL(photoInp.files[0]);}
  else doSave(null);
}

async function deleteStaffConfirm(empId){
  const emp=db.employees.find(e=>e.id===empId);if(!emp)return;
  if(!await appConfirm(`Remove ${emp.name} from staff roster?\nAll their data will be kept in shift records.`,'Remove Staff',true))return;
  db.employees=db.employees.filter(e=>e.id!==empId);
  saveDB();closeStaffDetail();renderEmployees();
}

async function settleSalary(empId){
  const emp=db.employees.find(e=>e.id===empId);if(!emp)return;
  const net=emp.salary-emp.shortageBalance-(emp.advanceBalance||0);
  if(await appConfirm(`Settle salary for ${emp.name}?\nBase: ${fmt(emp.salary)}\nShortage: ${fmt(emp.shortageBalance)}\nAdvance: ${fmt(emp.advanceBalance||0)}\nNet Payable: ${fmt(net)}`,'Settle Salary')){
    emp.shortageBalance=0;emp.advanceBalance=0;
    if(emp.advanceHistory&&emp.advanceHistory.length){
      emp.advanceHistory.push({id:'adv_settle_'+Date.now(),date:new Date().toISOString().split('T')[0],type:'payment',amount:emp.advanceBalance||0,note:'Salary settlement',balanceAfter:0});
    }
    saveDB();renderEmployees();showToast(`Settled! Net paid: ${fmt(net)}`,'success');
  }
}

function openAdvanceModal(empId){
  if(!isAdmin){showToast('Admin access required.','error');return;}
  const emp=db.employees.find(e=>e.id===empId);if(!emp)return;
  document.getElementById('advEmpId').value=empId;
  document.getElementById('advanceModalTitle').textContent='Advance / Payment — '+emp.name;
  document.getElementById('advAmount').value='';
  document.getElementById('advNote').value='';
  document.getElementById('advDate').value=new Date().toISOString().split('T')[0];
  // Reset radio styling
  document.getElementById('advTypeAdvLabel').style.borderColor='rgba(240,79,89,0.4)';
  document.getElementById('advTypePayLabel').style.borderColor='var(--border)';
  document.querySelector('input[name="advType"][value="advance"]').checked=true;
  document.getElementById('modal-advance').classList.add('open');
}

async function saveAdvancePayment(){
  const empId=document.getElementById('advEmpId').value;
  const emp=db.employees.find(e=>e.id===empId);if(!emp)return;
  const type=document.querySelector('input[name="advType"]:checked').value;
  const amount=+document.getElementById('advAmount').value;
  const note=(document.getElementById('advNote').value||'').trim();
  const date=document.getElementById('advDate').value;
  if(!amount||amount<=0){showToast('Enter a valid amount.','error');return;}
  if(!emp.advanceHistory)emp.advanceHistory=[];
  if(!emp.advanceBalance)emp.advanceBalance=0;
  if(type==='advance'){
    emp.advanceBalance+=amount;
  } else {
    if(amount>emp.advanceBalance){if(!await appConfirm(`Payment ₹${amount.toLocaleString('en-IN')} exceeds outstanding advance ₹${emp.advanceBalance.toLocaleString('en-IN')}. Proceed?`,'Overpayment'))return;}
    emp.advanceBalance=Math.max(0,emp.advanceBalance-amount);
  }
  emp.advanceHistory.push({id:'adv_'+Date.now(),date,type,amount,note,balanceAfter:emp.advanceBalance});
  db.notifications.unshift({id:'n'+Date.now(),dateTime:new Date().toISOString(),type:type==='advance'?'warning':'success',message:`${type==='advance'?'Advance of':'Payment of'} ${fmt(amount)} ${type==='advance'?'given to':'deducted from'} ${emp.name}. Balance: ${fmt(emp.advanceBalance)}.`,read:false});
  saveDB();closeModal('modal-advance');openStaffDetail(empId);showToast(`${type==='advance'?'Advance':'Payment'} of ${fmt(amount)} recorded.`,'success');
}

async function deleteAdvanceRecord(empId,advId){
  if(!isAdmin){showToast('Admin access required.','error');return;}
  const emp=db.employees.find(e=>e.id===empId);if(!emp||!emp.advanceHistory)return;
  if(!await appConfirm('Remove this advance/payment record?','Delete Record',true))return;
  emp.advanceHistory=emp.advanceHistory.filter(a=>a.id!==advId);
  // Recalculate advance balance from history
  emp.advanceBalance=emp.advanceHistory.reduce((bal,a)=>{
    if(a.type==='advance')return bal+a.amount;
    return Math.max(0,bal-a.amount);
  },0);
  saveDB();openStaffDetail(empId);
}

function initReports(){
  const t=new Date().toISOString().split('T')[0];
  document.getElementById('rptDate').value=t;document.getElementById('rptMonth').value=t.substring(0,7);
  document.getElementById('rptOutput').style.display='none';
}
function toggleRptDate(){
  const v=document.getElementById('rptType').value;
  document.getElementById('rptDateGroup').style.display=v==='monthly'?'none':'block';
  document.getElementById('rptMonthGroup').style.display=v==='monthly'?'block':'none';
}
function generateReport(){
  const type=document.getElementById('rptType').value;
  const dateVal=document.getElementById('rptDate').value;
  const monthVal=document.getElementById('rptMonth').value;
  const out=document.getElementById('rptOutput');out.style.display='block';
  const title=document.getElementById('rptTitle');
  const content=document.getElementById('rptContent');
  if(type==='daily'){
    const shifts=db.shifts.filter(s=>s.date===dateVal);
    const sum={sales:shifts.reduce((s,x)=>s+x.totalFuelSale,0),online:shifts.reduce((s,x)=>s+x.onlineCollection,0),cash:shifts.reduce((s,x)=>s+x.cashCollected,0),diff:shifts.reduce((s,x)=>s+x.cashDifference,0),udhaar:shifts.reduce((s,x)=>s+x.udhaarGiven,0),rec:shifts.reduce((s,x)=>s+x.udhaarRecovered,0),net:shifts.reduce((s,x)=>s+x.netCollection,0)};
    title.textContent='Daily: '+fmtDate(dateVal);
    content.innerHTML=`<div class="rpt-grid"><div class="rpt-stat"><div class="rl">Total Sales</div><div class="rv accent-val">${fmt(sum.sales)}</div></div><div class="rpt-stat"><div class="rl">Online</div><div class="rv blue-val">${fmt(sum.online)}</div></div><div class="rpt-stat"><div class="rl">Cash</div><div class="rv green-val">${fmt(sum.cash)}</div></div><div class="rpt-stat"><div class="rl">${sum.diff<0?'Shortage':'Excess'}</div><div class="rv ${sum.diff<0?'red-val':'green-val'}">${fmt(Math.abs(sum.diff))}</div></div><div class="rpt-stat"><div class="rl">Udhaar Given</div><div class="rv red-val">${fmt(sum.udhaar)}</div></div><div class="rpt-stat"><div class="rl">Net Collection</div><div class="rv">${fmt(sum.net)}</div></div></div>`+(shifts.length?shifts.map(s=>`<div style="background:var(--surface2);border-radius:var(--r);padding:10px 12px;margin-bottom:8px;font-size:12px"><strong>${s.attendantName}</strong> · ${s.shiftType} · ${fmt(s.totalFuelSale)} · Diff: <span class="${s.cashDifference<0?'red-val':'green-val'}">${fmt(s.cashDifference)}</span></div>`).join(''):'<div style="color:var(--text3);font-size:12px;padding:8px 0">No shifts on this date.</div>');
  } else if(type==='monthly'){
    const shifts=db.shifts.filter(s=>s.date.startsWith(monthVal));
    const sum={sales:shifts.reduce((s,x)=>s+x.totalFuelSale,0),online:shifts.reduce((s,x)=>s+x.onlineCollection,0),udhaar:shifts.reduce((s,x)=>s+x.udhaarGiven,0),net:shifts.reduce((s,x)=>s+x.netCollection,0)};
    title.textContent='Monthly: '+monthVal;
    content.innerHTML=`<div class="rpt-grid"><div class="rpt-stat"><div class="rl">Month Sales</div><div class="rv accent-val">${fmt(sum.sales)}</div></div><div class="rpt-stat"><div class="rl">Online</div><div class="rv blue-val">${fmt(sum.online)}</div></div><div class="rpt-stat"><div class="rl">Udhaar Given</div><div class="rv red-val">${fmt(sum.udhaar)}</div></div><div class="rpt-stat"><div class="rl">Net Collection</div><div class="rv green-val">${fmt(sum.net)}</div></div></div><div style="font-size:12px;color:var(--text2)">${shifts.length} shifts in ${monthVal}</div>`;
  } else if(type==='udhaar'){
    const totalOut=db.customers.reduce((s,c)=>s+c.balance,0);
    title.textContent='Debtor Report';
    content.innerHTML=`<div style="background:rgba(240,79,89,.08);border:1px solid rgba(240,79,89,.2);border-radius:var(--r);padding:12px;margin-bottom:12px;display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--text2)">Total Outstanding</span><span class="red-val" style="font-size:18px;font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(totalOut)}</span></div>`+db.customers.map(c=>{const tc=c.transactions.filter(t=>t.type==='credit').reduce((s,t)=>s+t.amount,0);const tr2=c.transactions.filter(t=>t.type==='recovery'&&t.approved).reduce((s,t)=>s+t.amount,0);return `<div style="background:var(--surface2);border-radius:var(--r);padding:10px 12px;margin-bottom:8px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><strong style="font-size:13px">${c.name}</strong><span class="${c.balance>0?'red-val':'green-val'}" style="font-weight:800;font-family:'JetBrains Mono',monospace">${fmt(c.balance)}</span></div><div style="font-size:11px;color:var(--text3)">${c.vehicle} · Credit: ${fmt(tc)} · Recovered: ${fmt(tr2)}</div></div>`;}).join('');
  } else if(type==='inventory'){
    const {petrol,diesel}=db.inventory;
    title.textContent='Inventory Status';
    content.innerHTML=`<div class="rpt-grid"><div class="rpt-stat" style="border:1px solid rgba(245,197,66,.2)"><div class="rl">Petrol Available</div><div class="rv accent-val">${petrol.closingStock.toLocaleString()} L</div></div><div class="rpt-stat" style="border:1px solid rgba(61,142,240,.2)"><div class="rl">Diesel Available</div><div class="rv blue-val">${diesel.closingStock.toLocaleString()} L</div></div><div class="rpt-stat"><div class="rl">Petrol Sold</div><div class="rv red-val">${petrol.soldStock.toLocaleString()} L</div></div><div class="rpt-stat"><div class="rl">Diesel Sold</div><div class="rv red-val">${diesel.soldStock.toLocaleString()} L</div></div></div>`;
  }
}

// ------------------ PDF GENERATION ------------------
const sanitizeForPDF = (str) => String(str).replace(/₹/g, 'Rs. ');

async function getBase64ImageFromUrl(imageUrl) {
  try {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch(e) {
    return null;
  }
}


async function downloadPDF(title, subtitle, tableHeaders, tableBody, totalStats, topImageBase64 = null) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Header Background - Sleek Dark Slate
  doc.setFillColor(15, 23, 42); 
  doc.rect(0, 0, 210, 42, 'F');
// HP Logo Image (Circular Mask)
  try {
    doc.setFillColor(255, 255, 255);
    doc.circle(25, 21, 14.5, 'F'); 
    
    doc.saveGraphicsState();
    doc.circle(25, 21, 14.5);
    doc.clip(); 
    
    doc.addImage("data:image/png;base64,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", 'PNG', 10.5, 6.5, 29, 29);
    
    doc.setDrawColor(245, 197, 66); 
    doc.setLineWidth(0.5);
    doc.circle(25, 21, 14.5, 'S');
  } catch(e) {}



  
  // Title
  doc.setTextColor(245, 197, 66); // Premium Gold
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("DARSHAN FILLING STATION", 45, 16);
  
  // Address
  doc.setTextColor(220, 220, 220);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Villa. & Post Hadrukh, SH-21 Jalaun to Auraiya Road, Uttar Pradesh", 45, 24);
  
  // GST
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("GSTIN: 09DLEPS9511N1ZC", 45, 33);
  
  // Subtitle (Report Type)
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(sanitizeForPDF(subtitle), 15, 54);
  
  // A sleek dividing line
  doc.setDrawColor(245, 197, 66);
  doc.setLineWidth(1);
  doc.line(15, 58, 195, 58);
  
  // Customer Photo or Other Top Image
  if (topImageBase64) {
    try {
      doc.setDrawColor(245, 197, 66);
      doc.setLineWidth(0.5);
      doc.rect(164, 47, 30, 30);
      doc.addImage(topImageBase64, 'JPEG', 165, 48, 28, 28);
    } catch(e) {}
  }
  
  let startY = 66;
  if (totalStats && totalStats.length) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    totalStats.forEach((stat, i) => {
      doc.text(sanitizeForPDF(stat), 15, startY + (i * 6));
    });
    startY += (totalStats.length * 6) + 10;
  }
  
  if (tableHeaders && tableBody && tableBody.length > 0) {
    const safeBody = tableBody.map(row => 
      row.map(cell => {
        if(typeof cell === 'object' && cell !== null && cell.content !== undefined) {
           cell.content = sanitizeForPDF(cell.content);
           return cell;
        }
        return sanitizeForPDF(cell);
      })
    );
    
    if (startY < 80 && topImageBase64) startY = 82;
    
    doc.autoTable({
      startY: startY,
      head: [tableHeaders.map(h => sanitizeForPDF(h))],
      body: safeBody,
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], textColor: [245, 197, 66], fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 4 },
      alternateRowStyles: { fillColor: [245, 248, 250] },
      didDrawCell: function(data) {
        if (data.section === 'body' && data.cell.raw && data.cell.raw.image) {
          try {
            doc.addImage(data.cell.raw.image, 'JPEG', data.cell.x + 2, data.cell.y + 1, 8, 8);
          } catch(e) {}
        }
      }
    });
  }
  
  const pageCount = doc.internal.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Generated on ${new Date().toLocaleString()} - Page ${i} of ${pageCount}`, 15, 290);
    doc.text("Powered by Antigravity", 165, 290);
  }
  
  const fileName = `${title.replace(/ /g, '_')}_${new Date().getTime()}.pdf`;
  
  try {
    const arrayBuffer = doc.output('arraybuffer');
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const file = new File([blob], fileName, { type: 'application/pdf' });
    
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: title,
        text: 'Please find the attached report.'
      });
      return;
    }
  } catch (err) {
    console.error('Sharing failed', err);
  }
  
  doc.save(fileName);
}

async function shareOnWhatsApp(){
  if(!activeLedgerCustId)return;
  const c=db.customers.find(x=>x.id===activeLedgerCustId);if(!c)return;
  showToast('Generating PDF...', 'info');
  
  const totalCredit=c.transactions.filter(t=>t.type==='credit'&&t.status!=='Rejected').reduce((s,t)=>s+t.amount,0);
  const totalRec=c.transactions.filter(t=>t.type==='recovery'&&t.approved).reduce((s,t)=>s+t.amount,0);
  
  const headers = ['Date', 'Type', 'Fuel', 'Liters', 'Amount', 'Attendant'];
  const body = c.transactions.map(t => [
    fmtDT(t.dateTime),
    t.type.toUpperCase(),
    t.fuelType,
    t.liters || '-',
    `Rs. ${Number(t.amount||0).toLocaleString('en-IN')}`,
    t.attendant
  ]);
  
  const stats = [
    `Customer Name: ${c.name}`,
    `Vehicle: ${c.vehicle || 'N/A'}`,
    `Mobile: ${c.mobile}`,
    `Total Udhaar Given: Rs. ${Number(totalCredit||0).toLocaleString('en-IN')}`,
    `Total Recovered: Rs. ${Number(totalRec||0).toLocaleString('en-IN')}`,
    `Outstanding Balance: Rs. ${Number(c.balance||0).toLocaleString('en-IN')}`
  ];
  
  let avatarB64 = null;
  if(c.photo) avatarB64 = await getBase64ImageFromUrl(c.photo);
  
  await downloadPDF(`${c.name}_Statement`, "Customer Ledger & Statement", headers, body, stats, avatarB64);
  showToast('PDF Generated and ready to share!', 'success');
}

async function shareReport(){
  const type=document.getElementById('rptType').value;
  showToast('Generating Report...', 'info');
  
  if(type==='daily'){
    const dateVal=document.getElementById('rptDate').value;
    const shifts=db.shifts.filter(s=>s.date===dateVal);
    if(shifts.length === 0) {
      showToast('No shifts found for this date.', 'warn');
      return;
    }
    const sum={
      sales:shifts.reduce((s,x)=>s+x.totalFuelSale,0),
      online:shifts.reduce((s,x)=>s+x.onlineCollection,0),
      cash:shifts.reduce((s,x)=>s+x.cashCollected,0),
      udhaar:shifts.reduce((s,x)=>s+x.udhaarGiven,0),
      net:shifts.reduce((s,x)=>s+x.netCollection,0),
      diff:shifts.reduce((s,x)=>s+x.cashDifference,0)
    };
    
    const headers = ['Shift', 'Attendant', 'Petrol (L)', 'Diesel (L)', 'Total Sale', 'Cash', 'Online', 'Diff'];
    const body = shifts.map(s => [
      s.shiftType,
      s.attendantName,
      `${Number(s.petrolSoldQty||0).toLocaleString('en-IN')} L`,
      `${Number(s.dieselSoldQty||0).toLocaleString('en-IN')} L`,
      `Rs. ${Number(s.totalFuelSale||0).toLocaleString('en-IN')}`,
      `Rs. ${Number(s.cashCollected||0).toLocaleString('en-IN')}`,
      `Rs. ${Number(s.onlineCollection||0).toLocaleString('en-IN')}`,
      `Rs. ${Number(s.cashDifference||0).toLocaleString('en-IN')}`
    ]);
    
    const stats = [
      `Date: ${fmtDate(dateVal)}`,
      `Total Shifts: ${shifts.length}`,
      `Gross Sales: Rs. ${Number(sum.sales||0).toLocaleString('en-IN')}`,
      `Total Online Collection: Rs. ${Number(sum.online||0).toLocaleString('en-IN')}`,
      `Total Cash Collected: Rs. ${Number(sum.cash||0).toLocaleString('en-IN')}`,
      `Total Udhaar Given: Rs. ${Number(sum.udhaar||0).toLocaleString('en-IN')}`,
      `Net Collection: Rs. ${Number(sum.net||0).toLocaleString('en-IN')}`,
      `Net Cash Difference: Rs. ${Number(sum.diff||0).toLocaleString('en-IN')}`
    ];
    
    await downloadPDF(`Daily_Report_${dateVal}`, `Daily Shift Closure Report`, headers, body, stats);
    showToast('Daily PDF Report Generated!', 'success');
    
  } else if(type==='monthly') {
    const dStr = document.getElementById('rptDate').value;
    const monthPrefix = dStr.substring(0,7); // YYYY-MM
    const shifts=db.shifts.filter(s=>s.date.startsWith(monthPrefix));
    if(shifts.length === 0) { showToast('No shifts found for this month.', 'warn'); return; }
    
    let pLiters=0, dLiters=0, total=0, cash=0, online=0, udhaar=0;
    shifts.forEach(s => {
      pLiters+=s.petrolSoldQty; dLiters+=s.dieselSoldQty; total+=s.totalFuelSale;
      cash+=s.cashCollected; online+=s.onlineCollection; udhaar+=s.udhaarGiven;
    });
    
    const stats = [
      `Month: ${monthPrefix}`,
      `Total Petrol Sold: ${Number(pLiters||0).toLocaleString('en-IN')} L`,
      `Total Diesel Sold: ${Number(dLiters||0).toLocaleString('en-IN')} L`,
      `Gross Revenue: Rs. ${Number(total||0).toLocaleString('en-IN')}`,
      `Total Cash: Rs. ${Number(cash||0).toLocaleString('en-IN')}`,
      `Total Online: Rs. ${Number(online||0).toLocaleString('en-IN')}`,
      `Total Udhaar: Rs. ${Number(udhaar||0).toLocaleString('en-IN')}`
    ];
    await downloadPDF(`Monthly_Report_${monthPrefix}`, `Monthly Summary Report`, null, null, stats);
    showToast('Monthly PDF Report Generated!', 'success');
    
  } else if(type==='inventory') {
    const stats = [
      `Current Date: ${new Date().toLocaleDateString()}`,
      `-- PETROL --`,
      `Stock: ${Number(db.inventory.petrol.closingStock||0).toLocaleString('en-IN')} / ${Number(db.inventory.petrol.capacity||0).toLocaleString('en-IN')} L`,
      `Rate: Rs. ${db.settings.petrolRate}`,
      `-- DIESEL --`,
      `Stock: ${Number(db.inventory.diesel.closingStock||0).toLocaleString('en-IN')} / ${Number(db.inventory.diesel.capacity||0).toLocaleString('en-IN')} L`,
      `Rate: Rs. ${db.settings.dieselRate}`
    ];
    await downloadPDF(`Inventory_Report`, `Current Inventory Status`, null, null, stats);
    showToast('Inventory PDF Report Generated!', 'success');
    
  } else if(type==='udhaar') {
    const customers = db.customers.filter(c => c.balance > 0).sort((a,b)=>b.balance - a.balance);
    const totalOut = customers.reduce((s,c)=>s+c.balance, 0);
    
    const headers = ['Customer', 'Mobile', 'Vehicle', 'Outstanding Balance'];
    
    // Fetch images concurrently
    const body = await Promise.all(customers.map(async c => {
      let imgData = null;
      if (c.photo) imgData = await getBase64ImageFromUrl(c.photo);
      
      const nameObj = imgData ? { content: '      ' + c.name, image: imgData } : c.name;
      
      return [
        nameObj,
        c.mobile,
        c.vehicle || '-',
        `Rs. ${Number(c.balance||0).toLocaleString('en-IN')}`
      ];
    }));
    
    const stats = [
      `Total Debtors: ${customers.length}`,
      `Total Outstanding Amount: Rs. ${Number(totalOut||0).toLocaleString('en-IN')}`
    ];
    
    await downloadPDF(`Overall_Debtor_Report`, `Overall Debtor Report`, headers, body, stats);
    showToast('Debtor PDF Report Generated!', 'success');
  }
}


async function saveFuelDelivery(){
  const fuelType=document.getElementById('fFuelType').value;
  const qty=+document.getElementById('fQty').value;
  if(!qty||qty<=0){showToast('Enter a valid quantity.','info');return;}
  const inv=db.inventory[fuelType];
  if(inv.closingStock+qty>inv.capacity){showToast('Exceeds tank capacity. Space: '+(inv.capacity-inv.closingStock,'error')+' L');return;}
  inv.receivedStock+=qty;inv.closingStock+=qty;
  db.inventoryHistory.push({date:new Date().toISOString().split('T')[0],fuelType,type:'replenishment',amount:qty});
  db.notifications.unshift({id:'n'+Date.now(),dateTime:new Date().toISOString(),type:'success',message:`${qty.toLocaleString()} L of ${fuelType.toUpperCase()} received. Stock updated.`,read:false});
  await saveDB();closeModal('modal-fuel');if(currentView==='inventory')renderInventory();else if(currentView==='dashboard')renderDashboard();showToast('Delivery added!','success');
}

function renderAttendanceList(){
  document.getElementById('attList').innerHTML=db.employees.map(emp=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:var(--surface2);border-radius:var(--r);margin-bottom:6px"><span style="font-weight:700;font-size:13px">${emp.name}</span><div style="display:flex;gap:12px;font-size:12px"><label style="display:flex;align-items:center;gap:4px;cursor:pointer"><input type="radio" name="att_${emp.id}" value="present" checked style="accent-color:var(--accent3)">Present</label><label style="display:flex;align-items:center;gap:4px;cursor:pointer"><input type="radio" name="att_${emp.id}" value="absent" style="accent-color:var(--danger)">Absent</label></div></div>`).join('');
}
async function saveAttendance(){
  const date=document.getElementById('attDate').value;if(!date){showToast('Select a date.','info');return;}
  db.employees.forEach(emp=>{const sel=document.querySelector(`input[name="att_${emp.id}"]:checked`);if(sel){if(!emp.attendance)emp.attendance={};emp.attendance[date]=sel.value;}});
  await saveDB();closeModal('modal-attend');if(currentView==='employees')renderEmployees();showToast('Attendance saved!','success');
}




// --- SETTINGS LOGIC ---
function openSettings() {
  if(!isAdmin) { showToast('Admin access required.', 'error'); return; }
  document.getElementById('setPetrolRate').value = db.settings.petrolRate || '';
  document.getElementById('setDieselRate').value = db.settings.dieselRate || '';
  document.getElementById('setPetrolCap').value = db.inventory.petrol.capacity || '';
  document.getElementById('setDieselCap').value = db.inventory.diesel.capacity || '';
  openModal('modal-settings');
}

async function saveSettings() {
  const pRate = parseFloat(document.getElementById('setPetrolRate').value);
  const dRate = parseFloat(document.getElementById('setDieselRate').value);
  const pCap = parseFloat(document.getElementById('setPetrolCap').value);
  const dCap = parseFloat(document.getElementById('setDieselCap').value);
  
  if(!pRate || !dRate || !pCap || !dCap) {
    showToast('Please fill in all fields correctly.', 'error');
    return;
  }
  
  db.settings.petrolRate = pRate;
  db.settings.dieselRate = dRate;
  db.inventory.petrol.capacity = pCap;
  db.inventory.diesel.capacity = dCap;
  
  await saveDB();
  closeModal('modal-settings');
  showToast('Settings saved successfully!', 'success');
  
  if(currentView === 'dashboard') renderDashboard();
  if(currentView === 'inventory') renderInventory();
}

db={}; loadDB();

// Scrolling Effect with Glassmorphism for Bottom Nav
let lastScrollY = 0;
const contentEl = document.getElementById('mainContent');
const nav = document.querySelector('.bottom-nav');

if (contentEl && nav) {
  contentEl.addEventListener('scroll', () => {
    const currentScrollY = contentEl.scrollTop;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      nav.classList.add('scrolled-down');
      nav.classList.remove('scrolled-up');
    } else {
      nav.classList.remove('scrolled-down');
      if (currentScrollY > 20) {
        nav.classList.add('scrolled-up');
      } else {
        nav.classList.remove('scrolled-up');
      }
    }
    lastScrollY = currentScrollY;
  });
}
