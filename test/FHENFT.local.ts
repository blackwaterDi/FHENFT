import { expect } from "chai";
import { ethers, fhevm, deployments } from "hardhat";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { FhevmType } from "@fhevm/hardhat-plugin";

describe("FHENFT (local/mock)", function () {
  let alice: HardhatEthersSigner;
  let bob: HardhatEthersSigner;
  let nftAddress: string;

  before(async function () {
    if (!fhevm.isMock) {
      console.warn("This test is for local/mock network only");
      this.skip();
    }

    const [a, b] = await ethers.getSigners();
    alice = a;
    bob = b;

    await deployments.fixture(["FHENFT"]);
    nftAddress = (await deployments.get("FHENFT")).address;
  });

  it("mints and decrypts attributes for owner", async function () {
    const input = await fhevm
      .createEncryptedInput(nftAddress, alice.address)
      .add32(5) // level
      .add32(10) // exp
      .add32(7) // attack
      .add32(3) // defense
      .encrypt();

    const nft = await ethers.getContractAt("FHENFT", nftAddress);
    const tx = await nft
      .connect(alice)
      .mint(alice.address, input.handles[0], input.handles[1], input.handles[2], input.handles[3], input.inputProof);
    await tx.wait();

    const level = await nft.getLevel(0);
    const exp = await nft.getExp(0);
    const attack = await nft.getAttack(0);
    const defense = await nft.getDefense(0);

    const dLevel = await fhevm.userDecryptEuint(FhevmType.euint32, level, nftAddress, alice);
    const dExp = await fhevm.userDecryptEuint(FhevmType.euint32, exp, nftAddress, alice);
    const dAttack = await fhevm.userDecryptEuint(FhevmType.euint32, attack, nftAddress, alice);
    const dDefense = await fhevm.userDecryptEuint(FhevmType.euint32, defense, nftAddress, alice);

    expect(dLevel).to.eq(5);
    expect(dExp).to.eq(10);
    expect(dAttack).to.eq(7);
    expect(dDefense).to.eq(3);
  });

  it("owner can allow another address to decrypt one attribute", async function () {
    const nft = await ethers.getContractAt("FHENFT", nftAddress);
    // Allow bob to read level for token 0
    const tx = await nft.connect((await ethers.getSigners())[0]).allowAttribute(0, 0, bob.address);
    await tx.wait();

    const level = await nft.getLevel(0);
    const dLevelByBob = await fhevm.userDecryptEuint(FhevmType.euint32, level, nftAddress, bob);
    expect(dLevelByBob).to.eq(5);
  });
});

