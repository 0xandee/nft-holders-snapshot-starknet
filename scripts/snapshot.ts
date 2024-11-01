import { EvmChain, NftscanEvm } from "nftscan-api";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config()

const evm = new NftscanEvm({
    apiKey: process.env.NFTSCAN_API_KEY || "",
    chain: EvmChain.STARKNET, // Replace with your chain.
});

const fetchAssetOwners = async (nft_address: string) => {
    try {
        let nextCursor = "";
        const ownerCounts: Map<string, number> = new Map();
        do {
            const { content, next } = await evm.other.getAssetOwnerByContract({
                contract_address: nft_address,
                cursor: nextCursor,
                limit: 100,
            });
            content.forEach((item: { owner: string; }) => {
                const currentCount = ownerCounts.get(item.owner) || 0;
                ownerCounts.set(item.owner, currentCount + 1);
            });
            nextCursor = next;
        } while (nextCursor);
        saveToFile(nft_address, ownerCounts);
    } catch (error) {
        console.error("Error fetching asset owners:", error);
    }
}

const saveToFile = (nft_address: string, ownerCounts: Map<string, number>) => {
    const __dirname = process.cwd();
    const csvHeader = 'owner,nft_amount\n';
    const csvContent = Array.from(ownerCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([owner, count]) => `${owner},${count}`)
        .join('\n');
    const filePath = path.join(__dirname, `/output/${nft_address}-snapshot.csv`);

    fs.writeFileSync(filePath, csvHeader + csvContent);
    console.log(`Owners and their NFT amounts have been written to ${filePath}`);
}

fetchAssetOwners(process.env.SNAPSHOT_NFT_CONTRACT_ADDRESS || "");
