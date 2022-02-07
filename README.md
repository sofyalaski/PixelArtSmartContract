# NFT Minting with Creating Pixel Art Images

## Table of Contents
- [Context](#context)
- [Application Design](#application-design)
- [Smart Contract](#smart-contract)
- [Running the Application](#running-the-application)
- [Screencast](#screencast)
- [Authors](#authors)


## Context <a name="introduction"></a>
In this project, the aim was to design simple pixel editor to create NFT work and publishing the NFTs with using the IPFS(Pinata). The smart contract that is inherited by ERC 721 single token was implemented. 

## Application Design <a name="application-design"></a>

All design principles are explained in below.

1. On the first page, the application allows the users to choose whether they would like to draw or directly upload an image with using IPFS(Interplanetary File System).
2. With pushing 'start drawing' button, the users can draw their Pixel Art work with using color-palette and it can be exported as png file.
3. Whether an image is newly created or already exists, it should be uploaded to IPFS and gathered the link of it.
4. The application should be connected to Metamask account.
5. With the link, name and description, the NFT can be minted over 'mint NFT' button.
6. Immediately afterward pushing 'Mint NFT' button, MetaMask account extension will work and be opened to show transaction details to decide confirm or reject the transacition.
    - If there is enough fund in teh account of the user, the transaction will be sent to Ethereum Blockchain to be confirmed.
    - After confirmations and block is approved, the user can see the assets in their accounts.

## Smart Contract <a name="smart-contract"></a>

Smart Contract is the back-end side of the project. The operations related with minting NFT are performed over abi file of smart contract. 
- ‘mintPixelArt’ function in the smart contract file collects
    - the address of the recipient using MetaMask and 
    - URI of the token that was previously uploaded to Pinata as parameters. 

- The ID of the token is incremented over each transaction. 

The NFT objects are stored off-chain to secure the data. This situation is solved with IPFS(Interplanetary File System), which allows peer-to-peer protocol to share and store files. Pinata is used for uploading images to the cloud and later on they can be sent to receivers.

After copying the URL of the image on Pinata, the URL, name and description on the application that the user entered are sent to blockchain as a JSON object. 

The address of smart contract is "0x54ABE227FdD1c6C1BcBA88E72255221B2319a21e"


## Running the Application <a name="running-the-application"></a>

In order to run this application on your computer and make changes on the project, you should run these steps which are stated below sequentially.

```
git clone git@github.com:sofyalaski/SmartContract.git
cd path/to/file
npm install
cd minter
npm start
```

## Screencast <a name="screencast"></a>

The screencast of the project is accessible over the [the screencast link](https://vimeo.com/674107811/9fd2da3cc7).


## Authors <a name="authors"></a>

- Sofya LASKINA
- Esra GÜCÜKBEL


