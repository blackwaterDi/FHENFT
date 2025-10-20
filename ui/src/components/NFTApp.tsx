import { useState } from 'react';
import { Header } from './Header';
import { Mint } from './NFTMint';
import { ViewAttributes } from './NFTView';
import { AllowAccess } from './NFTAllow';
import '../styles/NFTApp.css';

export function NFTApp() {
  const [tab, setTab] = useState<'mint' | 'view' | 'allow'>('mint');

  return (
    <div className="app">
      <Header />
      <main className="main">
        <nav className="tabs">
          <button className={`tab ${tab==='mint'?'active':''}`} onClick={()=>setTab('mint')}>Mint</button>
          <button className={`tab ${tab==='view'?'active':''}`} onClick={()=>setTab('view')}>View</button>
          <button className={`tab ${tab==='allow'?'active':''}`} onClick={()=>setTab('allow')}>Allow</button>
        </nav>
        {tab==='mint' && <Mint />}
        {tab==='view' && <ViewAttributes />}
        {tab==='allow' && <AllowAccess />}
      </main>
    </div>
  );
}

