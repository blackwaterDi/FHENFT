import { useState } from 'react';
import { Contract } from 'ethers';
import { useEthersSigner } from '../hooks/useEthersSigner';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';

const ATTRS = [
  { key: 'level', idx: 0 },
  { key: 'exp', idx: 1 },
  { key: 'attack', idx: 2 },
  { key: 'defense', idx: 3 },
];

export function AllowAccess() {
  const signerPromise = useEthersSigner();
  const [tokenId, setTokenId] = useState('0');
  const [attr, setAttr] = useState(0);
  const [reader, setReader] = useState('');
  const [pending, setPending] = useState(false);

  const onAllow = async () => {
    try {
      setPending(true);
      const signer = await signerPromise;
      if (!signer) throw new Error('No signer');
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.allowAttribute(parseInt(tokenId), attr, reader);
      await tx.wait();
      alert('Access granted');
    } catch (e:any) {
      alert(e.message || 'Allow failed');
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="card">
      <h2 className="title">Grant Attribute Access</h2>
      <div className="grid">
        <label className="label">Token ID</label>
        <input
          className="input"
          type="number"
          min="0"
          placeholder="Your NFT token ID"
          value={tokenId}
          onChange={e=>setTokenId(e.target.value)}
        />

        <label className="label">Attribute</label>
        <select className="input" value={attr} onChange={e=>setAttr(parseInt(e.target.value))}>
          {ATTRS.map(a => <option key={a.key} value={a.idx}>{a.key.charAt(0).toUpperCase() + a.key.slice(1)}</option>)}
        </select>

        <label className="label">Reader Address</label>
        <input
          className="input"
          placeholder="0x... (address to grant access to)"
          value={reader}
          onChange={e=>setReader(e.target.value)}
        />
      </div>
      <button className="button" onClick={onAllow} disabled={pending || !reader}>
        <span>{pending ? '🔑 Granting...' : '✨ Grant Access'}</span>
      </button>
    </section>
  );
}

