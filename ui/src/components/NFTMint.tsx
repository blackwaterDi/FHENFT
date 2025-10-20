import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Contract } from 'ethers';
import { useEthersSigner } from '../hooks/useEthersSigner';
import { useZamaInstance } from '../hooks/useZamaInstance';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';

export function Mint() {
  const { address } = useAccount();
  const signerPromise = useEthersSigner();
  const { instance } = useZamaInstance();
  const [to, setTo] = useState<string>('');
  const [level, setLevel] = useState('1');
  const [exp, setExp] = useState('0');
  const [attack, setAttack] = useState('1');
  const [defense, setDefense] = useState('1');
  const [pending, setPending] = useState(false);
  const [lastTokenId, setLastTokenId] = useState<null | number>(null);

  const onMint = async () => {
    if (!instance || !signerPromise || !address) {
      alert('Wallet and encryption must be ready');
      return;
    }
    try {
      setPending(true);
      const recipient = to || address;
      const input = instance
        .createEncryptedInput(CONTRACT_ADDRESS, address)
        .add32(parseInt(level))
        .add32(parseInt(exp))
        .add32(parseInt(attack))
        .add32(parseInt(defense));
      const encrypted = await input.encrypt();

      const signer = await signerPromise;
      if (!signer) throw new Error('No signer');
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.mint(
        recipient,
        encrypted.handles[0],
        encrypted.handles[1],
        encrypted.handles[2],
        encrypted.handles[3],
        encrypted.inputProof
      );
      const receipt = await tx.wait();
      // Extract tokenId from Transfer event (best-effort)
      const transferLog = receipt?.logs?.find((l: any) => (l as any).fragment?.name === 'Transfer');
      if (transferLog && (transferLog as any).args) {
        setLastTokenId(Number((transferLog as any).args.tokenId));
      }
    } catch (e:any) {
      alert(e.message || 'Mint failed');
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="card">
      <h2 className="title">Mint NFT</h2>
      <div className="grid">
        <label className="label">Recipient</label>
        <input
          className="input"
          placeholder="0x... (optional, defaults to your address)"
          value={to}
          onChange={e=>setTo(e.target.value)}
        />

        <label className="label">Level</label>
        <input
          className="input"
          type="number"
          min="1"
          placeholder="Character level (1-4,294,967,295)"
          value={level}
          onChange={e=>setLevel(e.target.value)}
        />

        <label className="label">Experience</label>
        <input
          className="input"
          type="number"
          min="0"
          placeholder="Experience points"
          value={exp}
          onChange={e=>setExp(e.target.value)}
        />

        <label className="label">Attack</label>
        <input
          className="input"
          type="number"
          min="1"
          placeholder="Attack power"
          value={attack}
          onChange={e=>setAttack(e.target.value)}
        />

        <label className="label">Defense</label>
        <input
          className="input"
          type="number"
          min="1"
          placeholder="Defense capability"
          value={defense}
          onChange={e=>setDefense(e.target.value)}
        />
      </div>
      <button className="button" onClick={onMint} disabled={pending || !address}>
        <span>{pending ? '⏳ Minting...' : '🎨 Mint NFT'}</span>
      </button>
      {lastTokenId !== null && <div className="info">Successfully minted token #{lastTokenId}!</div>}
    </section>
  );
}
