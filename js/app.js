import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, collection, query, orderBy, onSnapshot }
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
const fbApp = initializeApp(firebaseConfig);
const auth  = getAuth(fbApp);
const db    = getFirestore(fbApp);
const TOTAL = P.reduce((sum, sec) => sum + sec.p.length, 0);

// ── State ────────────────────────────────────────────────────────────────────
let solved = {};
let notes  = {};
let currentUser      = null;
let saveTimer        = null;
let leaderboardUnsub = null;
let filter = 'all';

// ── Firestore: user data ─────────────────────────────────────────────────────
function safeJSON(str) { try { return JSON.parse(str); } catch { return null; } }

async function loadUserData(uid) {
  const ref  = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const d = snap.data();
    solved = d.solved || {};
    notes  = d.notes  || {};
  } else {
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
    await updateLeaderboard();
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
  const map = { idle: '', pending: '· · ·', saving: '⟳ Syncing', saved: '✓ Synced', error: '⚠ Offline' };
  el.textContent   = map[s] ?? '';
  el.dataset.state = s;
}

window.addEventListener('beforeunload', () => {
  if (saveTimer && currentUser) { clearTimeout(saveTimer); persistUserData(); }
});

// ── Firestore: leaderboard ───────────────────────────────────────────────────
async function updateLeaderboard() {
  if (!currentUser) return;
  const count = Object.values(solved).filter(Boolean).length;
  try {
    await setDoc(doc(db, 'leaderboard', currentUser.uid), {
      displayName: currentUser.displayName || 'Anonymous',
      photoURL:    currentUser.photoURL    || '',
      solvedCount: count,
      updatedAt:   new Date().toISOString()
    });
  } catch (e) {
    console.error('Leaderboard update failed:', e);
  }
}

function subscribeLeaderboard() {
  const q = query(collection(db, 'leaderboard'), orderBy('solvedCount', 'desc'));
  return onSnapshot(q, snap => {
    renderLeaderboard(snap.docs.map(d => ({ uid: d.id, ...d.data() })));
  }, err => console.error('Leaderboard error:', err));
}

function renderLeaderboard(users) {
  const el = document.getElementById('leaderboard-list');
  if (!users.length) {
    el.innerHTML = '<div class="lb-empty">No users yet — start solving to appear here!</div>';
    return;
  }
  const medals = ['🥇', '🥈', '🥉'];
  el.innerHTML = users.map((u, i) => {
    const rank  = i + 1;
    const pct   = TOTAL ? Math.round(u.solvedCount / TOTAL * 100) : 0;
    const isMe  = currentUser && u.uid === currentUser.uid;
    const init  = (u.displayName || '?')[0].toUpperCase();
    const avatar = u.photoURL
      ? `<img class="lb-avatar" src="${u.photoURL}" alt="">`
      : `<div class="lb-avatar lb-avatar-init">${init}</div>`;
    const rankLabel = rank <= 3 ? `<span class="lb-medal">${medals[rank-1]}</span>` : `<span class="lb-rank-num">${rank}</span>`;
    return `<div class="lb-row${isMe ? ' lb-me' : ''}">
      <div class="lb-rank-cell">${rankLabel}</div>
      ${avatar}
      <div class="lb-info">
        <div class="lb-name-row">
          <span class="lb-name">${escHtml(u.displayName || 'Anonymous')}</span>
          ${isMe ? '<span class="lb-you">you</span>' : ''}
        </div>
        <div class="lb-bar-outer"><div class="lb-bar-inner" style="width:${pct}%"></div></div>
      </div>
      <div class="lb-nums">
        <span class="lb-count">${u.solvedCount}<span class="lb-total"> / ${TOTAL}</span></span>
        <span class="lb-pct">${pct}%</span>
      </div>
    </div>`;
  }).join('');
}

// ── View switching ───────────────────────────────────────────────────────────
window.switchView = function(view) {
  document.getElementById('problems-view').classList.toggle('hidden', view !== 'problems');
  document.getElementById('leaderboard-view').classList.toggle('hidden', view !== 'leaderboard');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
  if (view === 'leaderboard' && !leaderboardUnsub && currentUser) {
    leaderboardUnsub = subscribeLeaderboard();
  }
};

// ── Auth ─────────────────────────────────────────────────────────────────────
document.getElementById('google-login-btn').addEventListener('click', async () => {
  const btn      = document.getElementById('google-login-btn');
  const original = btn.innerHTML;
  btn.disabled   = true;
  btn.textContent = 'Signing in…';
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (e) {
    btn.disabled = false;
    btn.innerHTML = original;
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

    leaderboardUnsub = subscribeLeaderboard();
    await updateLeaderboard();
    build();
    applyFilter();
  } else {
    if (leaderboardUnsub) { leaderboardUnsub(); leaderboardUnsub = null; }
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
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
          const sv    = !!solved[k];
          const nt    = escHtml(notes[k] || '');
          return `<div class="pr${sv ? ' solved' : ''}" data-key="${k}" data-id="${id||''}" data-name="${name.toLowerCase()}" data-si="${si}">
            <div class="cc"><input type="checkbox"${sv ? ' checked' : ''} onchange="toggle('${k}',this,${si})"></div>
            <div class="nc">
              <a class="pl2" href="${href}" target="_blank" rel="noopener">
                <span class="pid${isNew ? ' nw' : ''}">${isNew ? 'NEW' : '#'+id}</span>${name}<span class="pli">↗</span>
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

// ── Global handlers ──────────────────────────────────────────────────────────
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
