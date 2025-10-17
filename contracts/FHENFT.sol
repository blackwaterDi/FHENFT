// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title FHENFT - ERC721 with encrypted attributes
/// @notice Adds encrypted attributes (level, exp, attack, defense) to each token.
contract FHENFT is ERC721, SepoliaConfig, Ownable {

    enum Attr {
        Level,
        Exp,
        Attack,
        Defense
    }

    uint256 private _nextId;

    mapping(uint256 => euint32) private _level;
    mapping(uint256 => euint32) private _exp;
    mapping(uint256 => euint32) private _attack;
    mapping(uint256 => euint32) private _defense;

    constructor() ERC721("FHENFT", "FHENFT") Ownable(msg.sender) {}

    /// @notice Mint a new NFT with encrypted attributes
    /// @param to recipient address
    /// @param levelH encrypted handle for level
    /// @param expH encrypted handle for exp
    /// @param attackH encrypted handle for attack
    /// @param defenseH encrypted handle for defense
    /// @param inputProof input proof returned by the relayer for this batch
    function mint(
        address to,
        externalEuint32 levelH,
        externalEuint32 expH,
        externalEuint32 attackH,
        externalEuint32 defenseH,
        bytes calldata inputProof
    ) external returns (uint256 tokenId) {
        tokenId = _nextId++;

        // Convert external handles to internal ciphertexts
        euint32 l = FHE.fromExternal(levelH, inputProof);
        euint32 e = FHE.fromExternal(expH, inputProof);
        euint32 a = FHE.fromExternal(attackH, inputProof);
        euint32 d = FHE.fromExternal(defenseH, inputProof);

        _level[tokenId] = l;
        _exp[tokenId] = e;
        _attack[tokenId] = a;
        _defense[tokenId] = d;

        _safeMint(to, tokenId);

        // Allow contract and owner to access the ciphertexts
        _allowAllFor(tokenId, to);
    }

    /// @notice Allow an address to access a specific encrypted attribute for a token
    /// @dev Only token owner can grant
    function allowAttribute(uint256 tokenId, Attr attr, address reader) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");

        if (attr == Attr.Level) {
            FHE.allow(_level[tokenId], reader);
            return;
        }
        if (attr == Attr.Exp) {
            FHE.allow(_exp[tokenId], reader);
            return;
        }
        if (attr == Attr.Attack) {
            FHE.allow(_attack[tokenId], reader);
            return;
        }
        // Defense
        FHE.allow(_defense[tokenId], reader);
    }

    /// @notice Get encrypted level
    function getLevel(uint256 tokenId) external view returns (euint32) {
        return _level[tokenId];
    }

    /// @notice Get encrypted exp
    function getExp(uint256 tokenId) external view returns (euint32) {
        return _exp[tokenId];
    }

    /// @notice Get encrypted attack
    function getAttack(uint256 tokenId) external view returns (euint32) {
        return _attack[tokenId];
    }

    /// @notice Get encrypted defense
    function getDefense(uint256 tokenId) external view returns (euint32) {
        return _defense[tokenId];
    }

    function _allowAllFor(uint256 tokenId, address who) internal {
        // Allow contract itself for internal operations and also the provided address
        FHE.allowThis(_level[tokenId]);
        FHE.allowThis(_exp[tokenId]);
        FHE.allowThis(_attack[tokenId]);
        FHE.allowThis(_defense[tokenId]);

        FHE.allow(_level[tokenId], who);
        FHE.allow(_exp[tokenId], who);
        FHE.allow(_attack[tokenId], who);
        FHE.allow(_defense[tokenId], who);
    }
}
