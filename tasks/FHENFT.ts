import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("nft:address", "Print FHENFT address").setAction(async (_: TaskArguments, hre) => {
  const { deployments } = hre;
  const d = await deployments.get("FHENFT");
  console.log(`FHENFT address: ${d.address}`);
});

task("nft:mint", "Mint FHENFT with attributes")
  .addParam("to", "Recipient address")
  .addParam("level", "Level (uint32)")
  .addParam("exp", "Exp (uint32)")
  .addParam("attack", "Attack (uint32)")
  .addParam("defense", "Defense (uint32)")
  .setAction(async (args: TaskArguments, hre) => {
    const { ethers, deployments, fhevm } = hre;
    const d = await deployments.get("FHENFT");
    const [signer] = await ethers.getSigners();

    await fhevm.initializeCLIApi();

    const input = await fhevm
      .createEncryptedInput(d.address, signer.address)
      .add32(parseInt(args.level))
      .add32(parseInt(args.exp))
      .add32(parseInt(args.attack))
      .add32(parseInt(args.defense))
      .encrypt();

    const nft = await ethers.getContractAt("FHENFT", d.address);
    const tx = await nft
      .connect(signer)
      .mint(args.to, input.handles[0], input.handles[1], input.handles[2], input.handles[3], input.inputProof);
    console.log(`Mint tx: ${tx.hash}`);
    await tx.wait();
  });

task("nft:allow", "Allow reader for attribute")
  .addParam("token", "Token ID")
  .addParam("attr", "Attribute: level|exp|attack|defense")
  .addParam("reader", "Reader address")
  .setAction(async (args: TaskArguments, hre) => {
    const { ethers, deployments } = hre;
    const d = await deployments.get("FHENFT");
    const [signer] = await ethers.getSigners();
    const nft = await ethers.getContractAt("FHENFT", d.address);

    const attrMap: Record<string, number> = { level: 0, exp: 1, attack: 2, defense: 3 };
    const idx = attrMap[String(args.attr).toLowerCase()];
    if (idx === undefined) throw new Error("Invalid attr");

    const tx = await nft.connect(signer).allowAttribute(parseInt(args.token), idx, args.reader);
    console.log(`Allow tx: ${tx.hash}`);
    await tx.wait();
  });

