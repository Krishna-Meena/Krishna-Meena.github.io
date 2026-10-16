/* Contact configuration: update this value to change all email actions. */
const CONTACT_EMAIL = 'krishnameena.dev@gmail.com';
document.querySelectorAll('[data-email]').forEach(a => a.href = `mailto:${CONTACT_EMAIL}`);
document.querySelector('.email').textContent = `${CONTACT_EMAIL} ↗`;
document.querySelector('#year').textContent = new Date().getFullYear();
const definitions = [
 ['P','SELECTED WORK','#ffb7d5','#d94f8a',73,0,'work'],
 ['O','ABOUT ME','#c8b6ff','#7153c7',219,0,'about'],
 ['R','MY PROCESS','#b9f2df','#2caa85',365,0,'process'],
 ['T','WHAT I DO','#ffd98e','#d28a24',511,0,'toolkit'],
 ['F','EXPLORE','#a9ddff','#3886c9',0,139,'work'],
 ['O','A LITTLE ABOUT ME','#f4b8ff','#a34cbf',146,139,'about'],
 ['L','THE PROCESS','#ffc3a0','#d96c44',292,139,'process'],
 ['I','MY APPROACH','#c6d7ff','#5a78c9',438,139,'approach'],
 ['O','CONTACT ME','#d9f28f','#7aa52d',584,139,'contact'],
 ['↵','LET’S TALK','#ffe446','#eab800',657,0,'contact']
];
const keyboard = document.querySelector('.keyboard');
definitions.forEach(([letter,caption,face,base,x,y,action],i) => {
 const key = document.createElement(action === 'contact' ? 'a' : 'button');
 key.className = `key${i===9?' enter':''}`;
 key.style.cssText = `--face:${face};--base:${base};left:${x}px;top:${y}px`;
 key.setAttribute('aria-label', i === 8 ? 'Contact Me' : caption);
 if(action==='contact') key.href=`mailto:${CONTACT_EMAIL}`;
 else {key.type='button';key.dataset.dialog=action;}
 key.innerHTML=`<span class="key-face"><span class="key-letter">${letter}</span><span class="key-caption">${caption}</span>${i===9?'<span class="enter-small">press to connect</span>':''}</span>`;
 keyboard.append(key);
});
const content = {
 work: ['Selected work', `<p>Three projects from my data and AI portfolio.</p><ul><li><a href="#" data-detail="guardrail">GuardRail — BFSI / FinTech security scanner ↗</a></li><li><a href="#" data-detail="analyst">LLM-Driven Data Analyst Assistant ↗</a></li><li><a href="#" data-detail="market">AI-Driven Candlestick Prediction Platform ↗</a></li></ul><a class="text-link" href="https://github.com/Krishna-Meena" target="_blank" rel="noopener noreferrer">Visit GitHub ↗</a>`],
 about: ['Hi, I’m Krishna.', `<p>I’m an MSc Data Science student at SVKM’s NMIMS in Mumbai. I completed my BSc in Data Science at Thakur College of Science & Commerce in 2026.</p><p>I’m interested in GenAI/LLM engineering and data roles, especially in BFSI and FinTech. My work explores local AI analytics, static code analysis, and financial machine learning.</p><a class="text-link" href="https://www.linkedin.com/in/krishna-meena/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a>`],
 process: ['From question to system.', `<p>My projects connect a practical question to a usable application.</p><ol><li><strong>Define the problem.</strong> Code risks, natural-language analytics, or market direction.</li><li><strong>Build the pipeline.</strong> Detection rules, SQL generation, or feature engineering.</li><li><strong>Check the output.</strong> Automated tests, data profiling, or model backtests.</li><li><strong>Make it usable.</strong> A dashboard, downloadable report, API, or CLI.</li></ol>`],
 toolkit: ['Tools behind the projects.', `<p>This toolkit reflects tools used in my resume projects.</p><div class="tags">${['Python','SQL · DuckDB','Ollama','Streamlit','Plotly','scikit-learn','XGBoost','Optuna','FastAPI','Docker','Pytest','libcst','GitHub Actions'].map(t=>`<span>${t}</span>`).join('')}</div><p><strong>Learning focus:</strong> deeper foundations in LLM engineering, analytics, and reliable data applications.</p>`],
 approach: ['Useful. Explainable. Testable.', `<p>I’m drawn to systems that make their output easier to inspect: findings with fix guidance, analytics with profiling, and predictions with backtesting.</p><p>My goal is to build stronger engineering foundations while exploring practical applications of AI in financial technology.</p>`],
 guardrail: ['GuardRail', `<p>A BFSI / FinTech compliance and security scanner built with Python, libcst, Streamlit, and Pytest.</p><ul><li>Combines regex and Python AST detection with a YAML-driven set of nine security rules.</li><li>Flags risks such as hardcoded credentials, SQL injection, weak hashing, unencrypted PII, and disabled TLS.</li><li>Maps findings to compliance frameworks and exports Markdown and SARIF 2.1.0 reports.</li><li>Includes severity charts, per-finding fix guidance, and CI-friendly exit codes.</li></ul><p class="source-note">Resume-reported validation: 120 automated tests. Framework mappings support review; they do not constitute compliance certification.</p><a class="text-link" href="https://github.com/Krishna-Meena/guard-rail" target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a>`],
 analyst: ['LLM-Driven Data Analyst Assistant', `<p>A local analytics workspace using Python, Ollama, DuckDB, and Streamlit.</p><ul><li>Converts natural-language questions into DuckDB SQL.</li><li>Profiles missing values, duplicates, and IQR outliers across CSV, Excel, and Parquet data.</li><li>Generates Plotly charts and exports Markdown, HTML, and PDF reports.</li><li>Uses local inference, sliding-window conversation memory, and exponential-backoff retries.</li></ul><p>Resume-reported validation: 29 Pytest unit tests, with Ruff, MyPy, pre-commit hooks, and GitHub Actions CI.</p><a class="text-link" href="https://github.com/Krishna-Meena?tab=repositories" target="_blank" rel="noopener noreferrer">Browse project repositories ↗</a>`],
 market: ['AI-Driven Candlestick Prediction', `<p>A Python ML pipeline for financial price-direction prediction, served through Streamlit, FastAPI, and a Typer CLI.</p><ul><li>Ingests Yahoo Finance data and engineers indicators including RSI, MACD, Bollinger Bands, ATR, and ADX.</li><li>Trains Logistic Regression, Random Forest, and XGBoost models with Optuna tuning.</li><li>Backtests with Sharpe ratio, win rate, and maximum drawdown.</li><li>Uses Clean Architecture, Docker, and automated tests.</li></ul><p>Resume-reported validation: 180+ tests. This is an educational modelling project; backtests do not establish future performance.</p><a class="text-link" href="https://github.com/Krishna-Meena?tab=repositories" target="_blank" rel="noopener noreferrer">Browse project repositories ↗</a>`]
};
const dialog=document.querySelector('#detail');
const dialogContent=document.querySelector('#dialog-content');
let trigger=null;
function showDetail(name,source){const item=content[name];if(!item)return;if(!dialog.open)trigger=source;dialogContent.innerHTML=`<h2 id="dialog-title">${item[0]}</h2>${item[1]}`;dialog.setAttribute('aria-labelledby','dialog-title');if(!dialog.open)dialog.showModal();document.body.classList.add('modal-open');clearPress();}
document.addEventListener('click',event=>{const control=event.target.closest('[data-dialog],[data-detail]');if(control){event.preventDefault();showDetail(control.dataset.dialog||control.dataset.detail,control)}});
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(trigger?.isConnected)trigger.focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
const keys=[...keyboard.children];let index=0;let releaseTimer;let restingUntil=0;let hovering=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function clearPress(){clearTimeout(releaseTimer);keys.forEach(k=>k.classList.remove('auto'));}
keyboard.addEventListener('pointerenter',()=>{hovering=true;clearPress()});keyboard.addEventListener('pointerleave',()=>{hovering=false});keyboard.addEventListener('focusin',clearPress);document.addEventListener('visibilitychange',clearPress);reduced.addEventListener('change',clearPress);
setInterval(()=>{if(reduced.matches||document.hidden||dialog.open||hovering||keyboard.contains(document.activeElement)||Date.now()<restingUntil)return;clearPress();keys[index].classList.add('auto');releaseTimer=setTimeout(clearPress,220);index=(index+1)%keys.length;if(!index)restingUntil=Date.now()+1250;},350);
function resize(){const shell=document.querySelector('.keyboard-shell');const scale=Math.min(1,(shell.clientWidth-24)/900);keyboard.style.transform=`scale(${scale})`;shell.style.height=`${312*scale+8}px`;const group=document.querySelector('.marquee-group');document.querySelector('.marquee-track').style.setProperty('--duration',`${group.scrollWidth/48}s`);}
new ResizeObserver(resize).observe(document.querySelector('.keyboard-shell'));document.fonts.ready.then(resize);resize();
