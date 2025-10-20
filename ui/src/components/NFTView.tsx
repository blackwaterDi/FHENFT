import { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { useZamaInstance } from '../hooks/useZamaInstance';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';

export function ViewAttributes() {
  const [tokenId, setTokenId] = useState<string>('0');
  const { address } = useAccount();
  const { instance } = useZamaInstance();

  const { data: levelH } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'getLevel', args: [BigInt(tokenId)] });
  const { data: expH } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'getExp', args: [BigInt(tokenId)] });
  const { data: attackH } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'getAttack', args: [BigInt(tokenId)] });
  const { data: defenseH } = useReadContract({ address: CONTRACT_ADDRESS, abi: CONTRACT_ABI, functionName: 'getDefense', args: [BigInt(tokenId)] });

  const [dec, setDec] = useState<{level?: string, exp?: string, attack?: string, defense?: string}>({});
  const [pending, setPending] = useState(false);

  const onDecrypt = async () => {
    if (!instance || !address) return;
    setPending(true);
    try {
      const pairs = [] as {handle: string, contractAddress: string}[];
      if (levelH) pairs.push({ handle: levelH as string, contractAddress: CONTRACT_ADDRESS });
      if (expH) pairs.push({ handle: expH as string, contractAddress: CONTRACT_ADDRESS });
      if (attackH) pairs.push({ handle: attackH as string, contractAddress: CONTRACT_ADDRESS });
      if (defenseH) pairs.push({ handle: defenseH as string, contractAddress: CONTRACT_ADDRESS });

      const keypair = instance.generateKeypair();
      const start = Math.floor(Date.now()/1000).toString();
      const durationDays = '7';
      const eip712 = instance.createEIP712(keypair.publicKey, [CONTRACT_ADDRESS], start, durationDays);
      // Sign using window.ethereum provider through the SDK helper
      const signature = await window.ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [address, JSON.stringify({ domain: eip712.domain, types: { UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification }, primaryType: 'UserDecryptRequestVerification', message: eip712.message })]
      });

      const result = await instance.userDecrypt(
        pairs,
        keypair.privateKey,
        keypair.publicKey,
        String(signature).replace('0x',''),
        [CONTRACT_ADDRESS],
        address,
        start,
        durationDays
      );

      setDec({
        level: levelH ? result[levelH as string] : undefined,
        exp: expH ? result[expH as string] : undefined,
        attack: attackH ? result[attackH as string] : undefined,
        defense: defenseH ? result[defenseH as string] : undefined,
      });
    } catch (e:any) {
      alert(e.message || 'Decrypt failed');
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="card">
      <h2 className="title">View Attributes</h2>
      <div className="row">
        <label className="label">Token ID</label>
        <input
          className="input"
          type="number"
          min="0"
          placeholder="Enter NFT token ID"
          value={tokenId}
          onChange={e=>setTokenId(e.target.value)}
        />
      </div>
      <button className="button" onClick={onDecrypt} disabled={pending || !address}>
        <span>{pending ? '🔓 Decrypting...' : '🔐 Decrypt Attributes'}</span>
      </button>
      <div className="grid mt">
        <div className="pill">
          <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem'}}>Level</div>
          <div style={{fontSize: '1.25rem', fontWeight: '700', color: dec.level ? 'var(--primary-light)' : 'var(--text-muted)'}}>
            {dec.level ?? '—'}
          </div>
        </div>
        <div className="pill">
          <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem'}}>Experience</div>
          <div style={{fontSize: '1.25rem', fontWeight: '700', color: dec.exp ? 'var(--secondary)' : 'var(--text-muted)'}}>
            {dec.exp ?? '—'}
          </div>
        </div>
        <div className="pill">
          <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem'}}>Attack</div>
          <div style={{fontSize: '1.25rem', fontWeight: '700', color: dec.attack ? 'var(--error)' : 'var(--text-muted)'}}>
            {dec.attack ?? '—'}
          </div>
        </div>
        <div className="pill">
          <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem'}}>Defense</div>
          <div style={{fontSize: '1.25rem', fontWeight: '700', color: dec.defense ? 'var(--success)' : 'var(--text-muted)'}}>
            {dec.defense ?? '—'}
          </div>
        </div>
      </div>
    </section>
  );
}

