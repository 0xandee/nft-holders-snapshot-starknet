# NFT Holders Snapshot - Starknet

## Overview

NFT Holders Snapshot is a Node.js script designed to fetch and analyze NFT ownership data from the Starknet blockchain using the [Nftscan API](https://nftscan.com/). It retrieves the list of asset owners for a specific NFT contract and generates a CSV file detailing each owner's NFT holdings, sorted in descending order.

## Features

- **Fetch NFT Owners**: Retrieves all owners of a specified NFT contract on the Starknet blockchain.
- **Pagination Support**: Handles large datasets by fetching data in batches.
- **CSV Export**: Generates a CSV file containing owner addresses and their respective NFT holdings, sorted by the number of NFTs held.
- **Environment Configuration**: Utilizes environment variables for secure API key management.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14 or later recommended). You can download it from [here](https://nodejs.org/).
- **npm**: Node.js installation includes npm. Verify installation by running `npm -v` in your terminal.
- **Nftscan API Key**: Obtain an API key from [Nftscan](https://nftscan.com/).

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/nft-holders-snapshot-starknet.git
    cd nft-holders-snapshot-starknet
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

## Configuration

1. **Environment Variables**

    Create a `.env` file in the root directory of the project and add your Nftscan API key:

    ```env
    NFTSCAN_API_KEY=your_nftscan_api_key
    ```

    Replace `your_nftscan_api_key` with your actual Nftscan API key.

2. **Directory Structure**

    Ensure the `output` directory exists to store the generated CSV files. If it doesn't exist, create it:

    ```bash
    mkdir output
    ```

## Usage

Run the script using `ts-node` or compile it using `tsc` if you prefer.

1. **Using ts-node**

    ```bash
    npx ts-node scripts/snapshot.ts "0x03859bf9178b48a4ba330d6872ab5a6d3895b64d6631197beefde6293bc172cd"
    ```

    Replace the NFT contract address with the one you wish to analyze.

2. **Using Compiled JavaScript**

    - **Compile the TypeScript Code**

      ```bash
      npx tsc scripts/snapshot.ts --outDir dist
      ```

    - **Run the Compiled Script**

      ```bash
      node dist/scripts/snapshot.js "0x03859bf9178b48a4ba330d6872ab5a6d3895b64d6631197beefde6293bc172cd"
      ```

## Output

After running the script, a CSV file will be generated in the `output` directory with the following format:

```csv
owner,nft_amount
0xOwnerAddress1,150
0xOwnerAddress2,120
0xOwnerAddress3,75
...
```

Each row represents an NFT holder and the number of NFTs they own, sorted from highest to lowest.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Nftscan API](https://nftscan.com/)
- [dotenv](https://github.com/motdotla/dotenv)
- [nftscan-api](https://www.npmjs.com/package/nftscan-api)
