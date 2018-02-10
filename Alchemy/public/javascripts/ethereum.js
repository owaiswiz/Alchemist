//Integrate ethereum blockchain with web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("current provider selected");
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://" + window.location.hostname + ":8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

let CapsuleContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "patient_history4",
        "outputs": [
            {
                "name": "doctor_name",
                "type": "string"
            },
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "description",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "get_patient_history",
        "outputs": [
            {
                "components": [
                    {
                        "name": "doctor_name",
                        "type": "string"
                    },
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getStatus",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_total_medicine",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            },
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "_doctor",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            },
            {
                "name": "patien_id",
                "type": "uint256"
            }
        ],
        "name": "prescrib",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "re_order",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            },
            {
                "name": "_status",
                "type": "uint256"
            }
        ],
        "name": "setStatus",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "patient_history3",
        "outputs": [
            {
                "name": "doctor_name",
                "type": "string"
            },
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "description",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            },
            {
                "name": "_uid",
                "type": "uint256"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_date",
                "type": "uint256"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "addMedicine",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "patient_history2",
        "outputs": [
            {
                "name": "doctor_name",
                "type": "string"
            },
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "description",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "_response",
                "type": "bool"
            }
        ],
        "name": "challenge",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "from_address",
                "type": "address"
            }
        ],
        "name": "buy_medicine",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "patient_history1",
        "outputs": [
            {
                "name": "doctor_name",
                "type": "string"
            },
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "description",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
]);

let Capsule = CapsuleContract.at('0x43e29125e1aeaf298f9320cb6e59dfba9669130b');

console.log(Capsule)
