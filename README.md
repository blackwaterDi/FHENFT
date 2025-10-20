# FHENFT - Privacy-Preserving NFTs with Fully Homomorphic Encryption

![License](https://img.shields.io/badge/license-BSD--3--Clause--Clear-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.27-orange.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-green.svg)

A groundbreaking NFT platform that leverages Fully Homomorphic Encryption (FHE) to enable private, encrypted attributes for each token. Built on Zama's fhEVM, FHENFT allows users to mint NFTs with confidential game-like attributes (level, experience, attack, defense) that remain encrypted on-chain while still being verifiable and programmable.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Why FHENFT?](#why-fhenft)
- [Technical Advantages](#technical-advantages)
- [Problems Solved](#problems-solved)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Smart Contract Details](#smart-contract-details)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Deployment](#deployment)
- [Usage](#usage)
  - [Minting NFTs](#minting-nfts)
  - [Viewing Encrypted Attributes](#viewing-encrypted-attributes)
  - [Granting Access](#granting-access)
- [Testing](#testing)
- [Frontend Application](#frontend-application)
- [Use Cases](#use-cases)
- [Security Considerations](#security-considerations)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

FHENFT represents a paradigm shift in NFT technology by introducing **true privacy** to on-chain assets. Unlike traditional NFTs where all metadata is public, FHENFT uses Fully Homomorphic Encryption (FHE) to keep sensitive attributes encrypted while maintaining full blockchain functionality.

Each FHENFT token contains four encrypted attributes:
- **Level**: Character progression level
- **Experience (EXP)**: Accumulated experience points
- **Attack**: Combat attack power
- **Defense**: Defensive capabilities

These attributes are stored as encrypted ciphertexts (`euint32`) on-chain, making them invisible to unauthorized parties while remaining verifiable and programmable through FHE operations.

## Key Features

### 1. Encrypted On-Chain Attributes
All NFT attributes are stored as encrypted values directly on the blockchain, ensuring complete privacy without compromising decentralization or verifiability.

### 2. Granular Access Control
Token owners have fine-grained control over who can decrypt specific attributes. You can grant access to individual attributes (e.g., share your level but keep attack/defense private) to specific addresses.

### 3. Privacy-Preserving Computations
Future implementations can perform computations on encrypted data (combat calculations, experience accumulation) without ever decrypting sensitive information.

### 4. ERC-721 Compatibility
Fully compatible with the ERC-721 standard, ensuring interoperability with existing NFT marketplaces and wallets while adding privacy features.

### 5. Client-Side Encryption
Attributes are encrypted client-side before being sent to the blockchain, ensuring that sensitive data never leaves the user's device in plaintext.

### 6. Decentralized Access Management
Access control is enforced by smart contracts, eliminating the need for trusted third parties or centralized servers.

## Why FHENFT?

### Privacy for Gaming Assets
Traditional blockchain games expose all character stats publicly, eliminating strategic advantages and surprise elements. FHENFT enables:
- **Hidden character builds** in competitive gaming
- **Private inventory management** for strategic gameplay
- **Confidential trading** of valuable in-game assets
- **Fair matchmaking** without revealing player strength

### Confidential Collectibles
Digital collectibles can now have private attributes such as:
- **Rarity scores** known only to the owner
- **Hidden traits** that add mystery and value
- **Private provenance** information
- **Confidential authentication** data

### Financial Privacy
NFTs representing financial instruments can maintain confidentiality:
- **Private valuation** data
- **Confidential ownership** records
- **Hidden transaction** history
- **Encrypted certificates** of authenticity

## Technical Advantages

### 1. Fully Homomorphic Encryption (FHE)
Powered by Zama's fhEVM, FHENFT leverages cutting-edge cryptography that enables:
- Computations on encrypted data without decryption
- Zero-knowledge verification of encrypted values
- Programmable privacy with smart contract logic

### 2. On-Chain Privacy
Unlike mixing services or L2 privacy solutions, FHENFT provides:
- Native L1 privacy with full security guarantees
- No reliance on trusted setup ceremonies
- Complete auditability for authorized parties
- Transparent smart contract logic

### 3. Developer-Friendly SDK
Integration is seamless with:
- TypeScript SDK for client-side encryption
- React hooks for Web3 integration
- Wagmi and RainbowKit compatibility
- Comprehensive documentation and examples

### 4. Gas Efficiency
Optimized implementation ensures:
- Minimal gas overhead for encrypted operations
- Batch encryption for multiple attributes
- Efficient storage patterns
- Optimized Solidity compiler settings (800 runs)

## Problems Solved

### Problem 1: Public Transparency in NFTs
**Challenge**: Traditional NFTs expose all metadata publicly, making private use cases impossible.

**Solution**: FHENFT encrypts sensitive attributes on-chain, enabling privacy-preserving NFTs without sacrificing decentralization or blockchain security.

### Problem 2: Gaming Meta-Game Exploits
**Challenge**: Blockchain games reveal character stats, allowing opponents to optimize strategies and eliminating surprise tactics.

**Solution**: Encrypted attributes enable strategic depth, hidden builds, and competitive fairness in blockchain games.

### Problem 3: Lack of Confidential Trading
**Challenge**: Public NFT attributes make private negotiations and confidential trading impossible.

**Solution**: Selective attribute disclosure allows buyers to verify specific properties without revealing complete information.

### Problem 4: Privacy vs. Verifiability Trade-off
**Challenge**: Existing privacy solutions (off-chain storage, centralized servers) sacrifice decentralization and verifiability.

**Solution**: FHE enables on-chain encrypted storage with cryptographic verifiability, maintaining full decentralization.

### Problem 5: Complex Access Management
**Challenge**: Managing who can view NFT metadata requires centralized servers or complex off-chain solutions.

**Solution**: Smart contract-based access control with granular permissions enforced cryptographically on-chain.

## Technology Stack

### Smart Contracts
- **Solidity**: 0.8.27 with Cancun EVM features
- **fhEVM**: Zama's Fully Homomorphic Encryption VM
- **@fhevm/solidity**: FHE primitives and operations
- **@zama-fhe/oracle-solidity**: Decryption oracle integration
- **OpenZeppelin**: ERC-721, Ownable, and security utilities
- **Hardhat**: Development environment and testing framework

### Frontend
- **React**: 19.1.1 with modern hooks architecture
- **TypeScript**: 5.8.3 for type-safe development
- **Vite**: 7.1.6 for lightning-fast builds
- **Wagmi**: 2.17.0 for Ethereum interactions
- **RainbowKit**: 2.2.8 for wallet connection UI
- **@zama-fhe/relayer-sdk**: Client-side encryption SDK
- **Ethers.js**: 6.15.0 for smart contract interactions
- **TanStack Query**: 5.89.0 for data fetching and caching

### Development Tools
- **Hardhat Deploy**: Automated deployment system
- **TypeChain**: TypeScript bindings for contracts
- **Hardhat Gas Reporter**: Gas usage analysis
- **Solidity Coverage**: Test coverage reporting
- **ESLint**: Code quality and linting
- **Prettier**: Code formatting

### Infrastructure
- **Ethereum Sepolia**: Testnet deployment
- **Infura**: RPC provider integration
- **Etherscan**: Contract verification

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  NFT Mint    │  │  NFT View    │  │  NFT Allow   │      │
│  │  Component   │  │  Component   │  │  Component   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│         ┌──────────────────▼──────────────────┐             │
│         │   Zama Relayer SDK (Encryption)     │             │
│         └──────────────────┬──────────────────┘             │
└────────────────────────────┼──────────────────────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │     Blockchain (fhEVM)       │
              │  ┌────────────────────────┐  │
              │  │  FHENFT Smart Contract │  │
              │  │                        │  │
              │  │  ┌──────────────────┐  │  │
              │  │  │  Encrypted Data  │  │  │
              │  │  │  - euint32 level │  │  │
              │  │  │  - euint32 exp   │  │  │
              │  │  │  - euint32 attack│  │  │
              │  │  │  - euint32 defense│ │  │
              │  │  └──────────────────┘  │  │
              │  │                        │  │
              │  │  ┌──────────────────┐  │  │
              │  │  │  Access Control  │  │  │
              │  │  │  - FHE.allow()   │  │  │
              │  │  └──────────────────┘  │  │
              │  └────────────────────────┘  │
              └──────────────────────────────┘
```

### Data Flow

#### Minting Process
1. User inputs attribute values in the UI
2. Client-side SDK encrypts values using FHE
3. Encrypted handles and proof are sent to smart contract
4. Contract converts external handles to internal ciphertexts
5. Encrypted data stored on-chain with automatic access grants

#### Viewing Process
1. User requests encrypted attribute handles from contract
2. Client generates ephemeral keypair for decryption
3. User signs EIP-712 message for authorization
4. Relayer decrypts values using user's signature
5. Decrypted values displayed in UI

#### Access Granting Process
1. Token owner specifies attribute and reader address
2. Transaction sent to `allowAttribute()` function
3. Smart contract grants FHE access to specified address
4. Reader can now decrypt the specific attribute

## Smart Contract Details

### FHENFT Contract (`contracts/FHENFT.sol`)

The core smart contract implements ERC-721 with FHE extensions:

```solidity
contract FHENFT is ERC721, SepoliaConfig, Ownable {
    // Encrypted attribute mappings
    mapping(uint256 => euint32) private _level;
    mapping(uint256 => euint32) private _exp;
    mapping(uint256 => euint32) private _attack;
    mapping(uint256 => euint32) private _defense;

    // Main functions
    function mint(...) external returns (uint256 tokenId);
    function allowAttribute(uint256 tokenId, Attr attr, address reader) external;
    function getLevel(uint256 tokenId) external view returns (euint32);
    // ... similar getters for other attributes
}
```

### Key Functions

#### `mint()`
Mints a new NFT with encrypted attributes. Accepts external encrypted handles and an input proof, converts them to internal ciphertexts, and grants access to the recipient.

**Parameters:**
- `to`: Recipient address
- `levelH`: Encrypted handle for level
- `expH`: Encrypted handle for experience
- `attackH`: Encrypted handle for attack
- `defenseH`: Encrypted handle for defense
- `inputProof`: Cryptographic proof for batch encryption

#### `allowAttribute()`
Grants an address permission to decrypt a specific attribute of a token. Only callable by the token owner.

**Parameters:**
- `tokenId`: The NFT token ID
- `attr`: Enum specifying which attribute (Level, Exp, Attack, Defense)
- `reader`: Address to grant access to

#### Getter Functions
`getLevel()`, `getExp()`, `getAttack()`, `getDefense()` return encrypted handles (euint32) that can be decrypted by authorized addresses.

## Getting Started

### Prerequisites

- **Node.js**: >= 20.0.0
- **npm**: >= 7.0.0
- **Git**: Latest version
- **MetaMask** or compatible Web3 wallet
- **Sepolia ETH** for testnet deployment

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/FHENFT.git
cd FHENFT
```

2. **Install smart contract dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd ui
npm install
cd ..
```

### Configuration

1. **Create environment file**
```bash
cp .env.example .env
```

2. **Configure environment variables**
```env
# Required for deployment
PRIVATE_KEY=your_private_key_without_0x_prefix
INFURA_API_KEY=your_infura_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key

# Optional
REPORT_GAS=true
```

3. **Configure frontend**
Edit `ui/src/config/contracts.ts` with your deployed contract address:
```typescript
export const CONTRACT_ADDRESS = '0xYourContractAddress';
```

### Deployment

#### Deploy to Local Hardhat Network

1. **Start local node**
```bash
npm run chain
```

2. **Deploy contracts** (in a new terminal)
```bash
npm run deploy:localhost
```

#### Deploy to Sepolia Testnet

1. **Ensure you have Sepolia ETH** in your deployment account

2. **Deploy to Sepolia**
```bash
npm run deploy:sepolia
```

3. **Verify on Etherscan**
```bash
npm run verify:sepolia
```

#### Start Frontend Development Server

```bash
cd ui
npm run dev
```

Access the application at `http://localhost:5173`

## Usage

### Minting NFTs

1. Connect your wallet using the "Connect Wallet" button
2. Navigate to the "Mint NFT" section
3. Fill in the encrypted attributes:
   - **Recipient**: Target address (optional, defaults to your address)
   - **Level**: Character level (1-4,294,967,295)
   - **Exp**: Experience points
   - **Attack**: Attack power
   - **Defense**: Defense power
4. Click "Mint" and confirm the transaction
5. Wait for confirmation - the new token ID will be displayed

**Note**: All attributes are encrypted client-side before being sent to the blockchain.

### Viewing Encrypted Attributes

1. Enter a token ID you own or have access to
2. Click "Decrypt My Access"
3. Sign the EIP-712 message to authorize decryption
4. Encrypted attributes will be decrypted and displayed

**Privacy Guarantee**: Only addresses with explicit access can decrypt attributes. The decryption process uses your signature to prove ownership.

### Granting Access

As a token owner, you can grant others permission to view specific attributes:

1. Enter your token ID
2. Select which attribute to share (Level, Exp, Attack, or Defense)
3. Enter the reader's address
4. Click "Grant" and confirm the transaction

**Access Control**: Each attribute can be shared independently, allowing fine-grained privacy control.

## Testing

### Run Test Suite

```bash
npm test
```

### Run Tests on Sepolia

```bash
npm run test:sepolia
```

### Generate Coverage Report

```bash
npm run coverage
```

### Linting

```bash
npm run lint          # Lint Solidity and TypeScript
npm run lint:sol      # Lint Solidity only
npm run lint:ts       # Lint TypeScript only
npm run prettier:check # Check formatting
npm run prettier:write # Fix formatting
```

## Frontend Application

The frontend is a modern React application built with TypeScript and Vite, providing an intuitive interface for interacting with FHENFT contracts.

### Key Components

#### `NFTMint.tsx`
Handles minting new NFTs with encrypted attributes. Uses Zama's SDK to perform client-side encryption before submitting to the blockchain.

#### `NFTView.tsx`
Allows users to decrypt and view attributes they have access to. Implements EIP-712 signing for secure decryption authorization.

#### `NFTAllow.tsx`
Enables token owners to grant attribute access to other addresses with granular control over individual attributes.

#### `Header.tsx`
Navigation and wallet connection using RainbowKit, providing a seamless Web3 onboarding experience.

### Custom Hooks

#### `useZamaInstance`
Manages the Zama FHE instance for client-side encryption and decryption operations.

#### `useEthersSigner`
Bridges Wagmi's Viem-based architecture with Ethers.js for contract interactions.

## Use Cases

### 1. Blockchain Gaming

#### Competitive Strategy Games
- Hide character builds and equipment
- Enable surprise tactics and strategies
- Fair matchmaking without stat exploitation
- Private progression tracking

#### RPG and Adventure Games
- Confidential character attributes
- Secret quest progress
- Private inventory management
- Hidden achievement tracking

### 2. Digital Collectibles

#### Mystery Collections
- Hidden rarity scores until reveal
- Private authentication certificates
- Confidential provenance data
- Secret trait combinations

#### Premium Art NFTs
- Private valuation estimates
- Confidential ownership history
- Hidden authenticity markers
- Protected certificate data

### 3. Financial Applications

#### Tokenized Assets
- Private valuation data
- Confidential ownership records
- Hidden transaction history
- Protected financial metrics

#### Certificates and Credentials
- Private credential verification
- Confidential achievement records
- Hidden certification details
- Protected identity attributes

### 4. Social Gaming

#### Trading Card Games
- Hidden deck compositions
- Private card statistics
- Confidential tournament records
- Secret card abilities

#### Virtual Pets and Characters
- Private evolution paths
- Hidden genetic attributes
- Confidential breeding data
- Secret ability scores

## Security Considerations

### Smart Contract Security

1. **Access Control**: `allowAttribute()` enforces token ownership verification
2. **Reentrancy Protection**: Uses OpenZeppelin's battle-tested contracts
3. **Integer Overflow**: Solidity 0.8.27 includes automatic overflow checks
4. **Input Validation**: All external inputs are validated before processing

### Cryptographic Security

1. **FHE Security**: Based on TFHE (Torus Fully Homomorphic Encryption)
2. **Client-Side Encryption**: Sensitive data never leaves the device in plaintext
3. **Signature Verification**: EIP-712 signatures prevent unauthorized decryption
4. **Key Management**: Ephemeral keypairs for each decryption session

### Best Practices

1. **Never share private keys** or seed phrases
2. **Verify contract addresses** before interacting
3. **Review transactions** before signing
4. **Keep software updated** to latest versions
5. **Use hardware wallets** for high-value tokens

### Audit Status

This is experimental software built on cutting-edge cryptography. While it uses audited libraries (OpenZeppelin, Zama's fhEVM), **the complete system has not undergone a formal security audit**. Use at your own risk and avoid storing significant value until a comprehensive audit is completed.

## Future Roadmap

### Phase 1: Core Enhancements (Q2 2025)
- [ ] Implement encrypted attribute arithmetic (level up, experience gain)
- [ ] Add batch minting functionality
- [ ] Implement encrypted attribute comparison for combat systems
- [ ] Add attribute range proofs without decryption
- [ ] Create comprehensive documentation and tutorials

### Phase 2: Advanced Features (Q3 2025)
- [ ] Multi-token encrypted operations (trading, combining)
- [ ] Conditional decryption based on encrypted conditions
- [ ] Time-locked attribute reveals
- [ ] Encrypted random number generation for in-game events
- [ ] Integration with existing NFT marketplaces

### Phase 3: Gaming SDK (Q4 2025)
- [ ] Unity SDK for game developers
- [ ] Unreal Engine integration
- [ ] Sample game implementations
- [ ] Developer documentation and tutorials
- [ ] Game design patterns for privacy-preserving mechanics

### Phase 4: Ecosystem Expansion (2026)
- [ ] Mainnet deployment on fhEVM L1
- [ ] Cross-chain bridge integration
- [ ] Marketplace for encrypted NFTs
- [ ] Mobile wallet support (iOS/Android)
- [ ] Enhanced metadata standards for encrypted attributes

### Long-Term Vision
- Multi-party computation for collaborative gaming
- Zero-knowledge proofs for attribute verification
- Decentralized oracle integration for external data
- DAO governance for protocol upgrades
- Standards proposal (EIP) for encrypted NFT attributes

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or creating tutorials, your help is appreciated.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and formatting
- Write tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting PR
- Add meaningful commit messages

### Reporting Issues

Found a bug or have a suggestion? Please open an issue on GitHub with:
- Clear description of the problem
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Environment details (OS, Node version, etc.)

## License

This project is licensed under the **BSD-3-Clause-Clear License** - see the [LICENSE](LICENSE) file for details.

This license allows:
- Commercial use
- Modification
- Distribution
- Private use

With conditions:
- License and copyright notice
- Clear patent grant exclusion

## Acknowledgments

### Core Technologies
- **[Zama](https://www.zama.ai/)** - For pioneering TFHE and fhEVM, making this project possible
- **[OpenZeppelin](https://www.openzeppelin.com/)** - For battle-tested smart contract libraries
- **[Hardhat](https://hardhat.org/)** - For the exceptional development environment

### Libraries and Tools
- **[Wagmi](https://wagmi.sh/)** - For React hooks for Ethereum
- **[RainbowKit](https://www.rainbowkit.com/)** - For beautiful wallet connection UI
- **[Vite](https://vitejs.dev/)** - For lightning-fast frontend tooling
- **[Ethers.js](https://docs.ethers.org/)** - For Ethereum interaction library

### Inspiration
- The blockchain gaming community for highlighting the need for privacy
- The cryptography research community for advancing FHE technology
- The Ethereum community for building the foundation of decentralized applications

### Special Thanks
- All contributors and community members
- Early testers and feedback providers
- The open-source community for tools and libraries

---

## Contact and Community

- **Issues**: [GitHub Issues](https://github.com/yourusername/FHENFT/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/FHENFT/discussions)
- **Documentation**: [FHEVM Docs](https://docs.zama.ai)
- **Community**: [Zama Discord](https://discord.gg/zama)

---

**Built with privacy in mind for a more secure Web3**

*FHENFT - Where Privacy Meets Programmability*
