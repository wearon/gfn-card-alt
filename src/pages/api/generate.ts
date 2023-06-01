import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";

interface TokenFormValues {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
  totalDecimals: number;
  txFeeHolders: number;
  txFeeLP: number;
  txFeeBurned: number;
  txFeeWallet: number;
  walletAddress: string;
  txFeeBuyback: number;
  maxWalletPercentage: number;
  maxTransactionPercentage: number;
}

export default async function generateBEP20Token(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const formValues: TokenFormValues = req.body;

  try {
    // Connect to a blockchain network
    const provider = ethers.getDefaultProvider("rinkeby"); // Example: using the Rinkeby test network
    const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider); // Replace 'YOUR_PRIVATE_KEY' with your wallet's private key

    // Load the BEP20 token contract template
    const tokenContract = require("path/to/BEP20TokenContract.json"); // Replace 'path/to/BEP20TokenContract.json' with the path to your BEP20 token contract JSON file

    // Deploy the BEP20 token contract
    const factory = new ethers.ContractFactory(
      tokenContract.abi,
      tokenContract.bytecode,
      signer
    );
    const token = await factory.deploy(
      formValues.tokenName,
      formValues.tokenSymbol,
      formValues.totalDecimals,
      parseUnits(formValues.totalSupply.toString(), formValues.totalDecimals)
    );

    await token.deployTransaction.wait(); // Wait for the deployment transaction to be mined
    console.log("BEP20 token deployed:", token.address);

    res.status(200).json({ tokenAddress: token.address });
  } catch (error) {
    console.error("Error generating BEP20 token:", error);
    res.status(500).json({ error: "Error generating BEP20 token" });
  }
}
