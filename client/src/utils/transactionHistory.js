import axios from 'axios';

export const getTransactionSender =  async (address) => {

    let data = JSON.stringify({
        "jsonrpc": "2.0",
        "id": 0,
        "method": "alchemy_getAssetTransfers",
        "params": [
            {
                "fromBlock": "0x0",
                "fromAddress": address,
                "category" : ["external", "erc721", "erc1155", "erc20"],
            }
        ]
    });

    var requestOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: data,
    };

    const apiKey = "kEg2K9iwPHWM4fiUbapzH89TzzV4kXt4"
    const baseURL = `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`;
    const axiosURL = `${baseURL}`;

    const arrayTx = await axios(axiosURL, requestOptions)
    .catch(error => console.log(error));

    return  arrayTx?.data?.result?.transfers
        // .then(response => {
        //     console.log("Tx", response);
        //     console.log(JSON.stringify(response.data, null, 2))
        // })
}

