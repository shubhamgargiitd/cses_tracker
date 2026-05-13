import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { P, key } from './data.js';

// ── Firebase init ────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyBfSUTNu4-Q2zTuutlNlU02HdHFB69MntA",
  authDomain: "cses-42eb8.firebaseapp.com",
  projectId: "cses-42eb8",
  storageBucket: "cses-42eb8.firebasestorage.app",
  messagingSenderId: "544860677196",
  appId: "1:544860677196:web:2e6b308298c711a7c2c0e9"
};
const fbApp  = initializeApp(firebaseConfig);
const auth   = getAuth(fbApp);
const db     = getFirestore(fbApp);

// ── State ────────────────────────────────────────────────────────────────────
let solved = {};
let notes  = {};
let currentUser = null;
let saveTimer   = null;
let filter = 'all';

// ── Firestore helpers ────────────────────────────────────────────────────────
function safeJSON(str) { try { return JSON.parse(str); } catch { return null; } }

async function loadUserData(uid) {
  const ref  = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const d = snap.data();
    solved = d.solved || {};
    notes  = d.notes  || {};
  } else {
    // First login — migrate any existing localStorage data
    solved = safeJSON(localStorage.getItem('cses2_solved')) || {};
    notes  = safeJSON(localStorage.getItem('cses2_notes'))  || {};
    await setDoc(ref, { solved, notes });
  }
}

async function persistUserData() {
  if (!currentUser) return;
  setSyncStatus('saving');
  try {
    await setDoc(doc(db, 'users', currentUser.uid), { solved, notes });
    setSyncStatus('saved');
    setTimeout(() => setSyncStatus('idle'), 2000);
  } catch (e) {
    setSyncStatus('error');
    console.error('Firestore write failed:', e);
  }
}

function scheduleSave() {
  if (!currentUser) return;
  setSyncStatus('pending');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(persistUserData, 1500);
}

function setSyncStatus(s) {
  const el  = document.getElementById('sync-status');
  const map = { idle:'', pending:'· · ·', saving:'⟳ Syncing', saved:'✓ Synced', error:'⚠ Offline' };
  el.textContent  = map[s] ?? '';
  el.dataset.state = s;
}

// Flush before tab close
window.addEventListener('beforeunload', () => {
  if (saveTimer && currentUser) { clearTimeout(saveTimer); persistUserData(); }
});

// ── Auth ─────────────────────────────────────────────────────────────────────
document.getElementById('google-login-btn').addEventListener('click', async () => {
  const btn = document.getElementById('google-login-btn');
  btn.disabled = true;
  btn.textContent = 'Signing in…';
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (e) {
    btn.disabled = false;
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.251 17.64 11.943 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg> Sign in with Google`;
    if (e.code !== 'auth/popup-closed-by-user') alert('Login failed: ' + e.message);
  }
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  if (saveTimer && currentUser) { clearTimeout(saveTimer); await persistUserData(); }
  await signOut(auth);
});

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (user) {
    setSyncStatus('saving');
    try { await loadUserData(user.uid); } catch (e) { console.error(e); }
    setSyncStatus('saved');
    setTimeout(() => setSyncStatus('idle'), 2000);

    document.getElementById('login-overlay').classList.add('hidden');
    document.getElementById('user-info').classList.remove('hidden');
    const av = document.getElementById('user-avatar');
    if (user.photoURL) { av.src = user.photoURL; av.style.display = 'block'; }
    document.getElementById('user-name').textContent = user.displayName || user.email;

    build();
    applyFilter();
  } else {
    document.getElementById('login-overlay').classList.remove('hidden');
    document.getElementById('user-info').classList.add('hidden');
    solved = {};
    notes  = {};
  }
});

// ── UI helpers ───────────────────────────────────────────────────────────────
function total() {
  let t = 0, s = 0;
  P.forEach(sec => sec.p.forEach(p => { t++; if (solved[key(p[0], p[1])]) s++; }));
  return { t, s };
}

function secStats(sec) {
  let s = 0;
  sec.p.forEach(p => { if (solved[key(p[0], p[1])]) s++; });
  return { t: sec.p.length, s };
}

function updateOverall() {
  const { t, s } = total();
  document.getElementById('ts').textContent = s;
  document.getElementById('tc').textContent = t;
  const pct = t ? Math.round(s / t * 100) : 0;
  document.getElementById('ob').style.width = pct + '%';
  document.getElementById('op2').textContent = pct + '%';
}

function updateSecBar(si) {
  const { t, s } = secStats(P[si]);
  const bar = document.querySelector(`[data-sb="${si}"]`);
  const cnt = document.querySelector(`[data-sc="${si}"]`);
  if (bar) bar.style.width = (t ? Math.round(s / t * 100) : 0) + '%';
  if (cnt) cnt.textContent = s + '/' + t;
}

function applyFilter() {
  let any = false;
  document.querySelectorAll('.pr').forEach(row => {
    const k    = row.dataset.key;
    const name = row.dataset.name;
    const id   = row.dataset.id;
    const q    = document.getElementById('search').value.toLowerCase();
    const ms   = !q || name.includes(q) || (id && id.includes(q));
    const sv   = !!solved[k];
    const mf   = filter === 'all' || (filter === 'solved' && sv) || (filter === 'unsolved' && !sv);
    const show = ms && mf;
    row.classList.toggle('hidden', !show);
    if (show) any = true;
  });
  document.getElementById('em').classList.toggle('show', !any);
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function build() {
  const sc = document.getElementById('sc');
  sc.innerHTML = '';
  P.forEach((sec, si) => {
    const { t, s } = secStats(sec);
    const d = document.createElement('div');
    d.className = 'sec open';
    d.innerHTML = `
      <div class="sh" onclick="this.parentElement.classList.toggle('open')">
        <span class="cv">▶</span>
        <span class="st">${sec.s}</span>
        <span class="stag" style="color:${sec.c};border-color:${sec.c}40;background:${sec.c}10">${sec.t}</span>
        <div class="spg">
          <div class="sbo"><div class="sbi" data-sb="${si}" style="width:${t ? Math.round(s/t*100) : 0}%"></div></div>
          <span class="sc" data-sc="${si}">${s}/${t}</span>
        </div>
      </div>
      <div class="pt">
        <div class="ch"><div class="c1"></div><div class="c2">Problem</div><div class="c3">Notes</div></div>
        ${sec.p.map(([id, name]) => {
          const k    = key(id, name);
          const href = id ? `https://cses.fi/problemset/task/${id}` : `https://cses.fi/problemset/list/`;
          const isNew = !id;
          const sv   = !!solved[k];
          const nt   = escHtml(notes[k] || '');
          return `<div class="pr${sv ? ' solved' : ''}" data-key="${k}" data-id="${id || ''}" data-name="${name.toLowerCase()}" data-si="${si}">
            <div class="cc"><input type="checkbox"${sv ? ' checked' : ''} onchange="toggle('${k}',this,${si})"></div>
            <div class="nc">
              <a class="pl2" href="${href}" target="_blank" rel="noopener">
                <span class="pid${isNew ? ' nw' : ''}">${isNew ? 'NEW' : '#' + id}</span>${name}<span class="pli">↗</span>
              </a>
            </div>
            <div class="ntc"><textarea class="ni" rows="1" placeholder="note…"
              oninput="saveNote('${k}',this)" onfocus="ar(this)" onblur="sr(this)">${nt}</textarea></div>
          </div>`;
        }).join('')}
      </div>`;
    sc.appendChild(d);
  });
  updateOverall();
}

// ── Global handlers (called from inline HTML) ────────────────────────────────
window.toggle = function(k, cb, si) {
  solved[k] = cb.checked;
  scheduleSave();
  cb.closest('.pr').classList.toggle('solved', cb.checked);
  updateSecBar(si);
  updateOverall();
  applyFilter();
};

window.saveNote = function(k, ta) {
  notes[k] = ta.value;
  scheduleSave();
  ar(ta);
};

window.ar = function(ta) {
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 80) + 'px';
};

window.sr = function(ta) {
  if (!ta.value) ta.style.height = '';
};

// ── Toolbar wiring ───────────────────────────────────────────────────────────
document.getElementById('reset-btn').addEventListener('click', () => {
  if (!confirm('Reset ALL solved marks and notes? This cannot be undone.')) return;
  solved = {};
  notes  = {};
  scheduleSave();
  build();
  applyFilter();
});

document.getElementById('search').addEventListener('input', applyFilter);

document.querySelectorAll('.fb').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.fb').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    filter = b.dataset.filter;
    applyFilter();
  });
});
