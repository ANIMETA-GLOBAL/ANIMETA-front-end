const MY = {

	ABI: [{
			"inputs": [{
				"internalType": "address",
				"name": "_thirdwebFee",
				"type": "address"
			}],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "approved",
					"type": "bool"
				}
			],
			"name": "ApprovalForAll",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": false,
					"internalType": "address",
					"name": "newRoyaltyRecipient",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "newRoyaltyBps",
					"type": "uint256"
				}
			],
			"name": "DefaultRoyalty",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": false,
					"internalType": "address",
					"name": "prevOwner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnerUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": false,
					"internalType": "address",
					"name": "platformFeeRecipient",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "platformFeeBps",
					"type": "uint256"
				}
			],
			"name": "PlatformFeeInfoUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
				"indexed": true,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}],
			"name": "PrimarySaleRecipientUpdated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "previousAdminRole",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "newAdminRole",
					"type": "bytes32"
				}
			],
			"name": "RoleAdminChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleGranted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleRevoked",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": true,
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "royaltyRecipient",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "royaltyBps",
					"type": "uint256"
				}
			],
			"name": "RoyaltyForToken",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "mintedTo",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "tokenIdMinted",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "uri",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "quantityMinted",
					"type": "uint256"
				}
			],
			"name": "TokensMinted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "signer",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "mintedTo",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "tokenIdMinted",
					"type": "uint256"
				},
				{
					"components": [{
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "royaltyRecipient",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "royaltyBps",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "primarySaleRecipient",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						},
						{
							"internalType": "string",
							"name": "uri",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "quantity",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "pricePerToken",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "currency",
							"type": "address"
						},
						{
							"internalType": "uint128",
							"name": "validityStartTimestamp",
							"type": "uint128"
						},
						{
							"internalType": "uint128",
							"name": "validityEndTimestamp",
							"type": "uint128"
						},
						{
							"internalType": "bytes32",
							"name": "uid",
							"type": "bytes32"
						}
					],
					"indexed": false,
					"internalType": "struct ITokenERC1155.MintRequest",
					"name": "mintRequest",
					"type": "tuple"
				}
			],
			"name": "TokensMintedWithSignature",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256[]",
					"name": "ids",
					"type": "uint256[]"
				},
				{
					"indexed": false,
					"internalType": "uint256[]",
					"name": "values",
					"type": "uint256[]"
				}
			],
			"name": "TransferBatch",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "TransferSingle",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [{
					"indexed": false,
					"internalType": "string",
					"name": "value",
					"type": "string"
				},
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "URI",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "DEFAULT_ADMIN_ROLE",
			"outputs": [{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "balanceOf",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address[]",
					"name": "accounts",
					"type": "address[]"
				},
				{
					"internalType": "uint256[]",
					"name": "ids",
					"type": "uint256[]"
				}
			],
			"name": "balanceOfBatch",
			"outputs": [{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "burn",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "uint256[]",
					"name": "ids",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256[]",
					"name": "values",
					"type": "uint256[]"
				}
			],
			"name": "burnBatch",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "contractType",
			"outputs": [{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "contractURI",
			"outputs": [{
				"internalType": "string",
				"name": "",
				"type": "string"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "contractVersion",
			"outputs": [{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getDefaultRoyaltyInfo",
			"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint16",
					"name": "",
					"type": "uint16"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getPlatformFeeInfo",
			"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint16",
					"name": "",
					"type": "uint16"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}],
			"name": "getRoleAdmin",
			"outputs": [{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getRoleMember",
			"outputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}],
			"name": "getRoleMemberCount",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}],
			"name": "getRoyaltyInfoForToken",
			"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "uint16",
					"name": "",
					"type": "uint16"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "grantRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "hasRole",
			"outputs": [{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "_defaultAdmin",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_symbol",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_contractURI",
					"type": "string"
				},
				{
					"internalType": "address[]",
					"name": "_trustedForwarders",
					"type": "address[]"
				},
				{
					"internalType": "address",
					"name": "_primarySaleRecipient",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_royaltyRecipient",
					"type": "address"
				},
				{
					"internalType": "uint128",
					"name": "_royaltyBps",
					"type": "uint128"
				},
				{
					"internalType": "uint128",
					"name": "_platformFeeBps",
					"type": "uint128"
				},
				{
					"internalType": "address",
					"name": "_platformFeeRecipient",
					"type": "address"
				}
			],
			"name": "initialize",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "operator",
					"type": "address"
				}
			],
			"name": "isApprovedForAll",
			"outputs": [{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "address",
				"name": "forwarder",
				"type": "address"
			}],
			"name": "isTrustedForwarder",
			"outputs": [{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_tokenId",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_uri",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "mintTo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"components": [{
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "royaltyRecipient",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "royaltyBps",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "primarySaleRecipient",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						},
						{
							"internalType": "string",
							"name": "uri",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "quantity",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "pricePerToken",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "currency",
							"type": "address"
						},
						{
							"internalType": "uint128",
							"name": "validityStartTimestamp",
							"type": "uint128"
						},
						{
							"internalType": "uint128",
							"name": "validityEndTimestamp",
							"type": "uint128"
						},
						{
							"internalType": "bytes32",
							"name": "uid",
							"type": "bytes32"
						}
					],
					"internalType": "struct ITokenERC1155.MintRequest",
					"name": "_req",
					"type": "tuple"
				},
				{
					"internalType": "bytes",
					"name": "_signature",
					"type": "bytes"
				}
			],
			"name": "mintWithSignature",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "bytes[]",
				"name": "data",
				"type": "bytes[]"
			}],
			"name": "multicall",
			"outputs": [{
				"internalType": "bytes[]",
				"name": "results",
				"type": "bytes[]"
			}],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [{
				"internalType": "string",
				"name": "",
				"type": "string"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "nextTokenIdToMint",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "platformFeeBps",
			"outputs": [{
				"internalType": "uint128",
				"name": "",
				"type": "uint128"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "platformFeeRecipient",
			"outputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "primarySaleRecipient",
			"outputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "renounceRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "revokeRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "salePrice",
					"type": "uint256"
				}
			],
			"name": "royaltyInfo",
			"outputs": [{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "royaltyAmount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256[]",
					"name": "ids",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256[]",
					"name": "amounts",
					"type": "uint256[]"
				},
				{
					"internalType": "bytes",
					"name": "data",
					"type": "bytes"
				}
			],
			"name": "safeBatchTransferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "data",
					"type": "bytes"
				}
			],
			"name": "safeTransferFrom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"name": "saleRecipientForToken",
			"outputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "operator",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "approved",
					"type": "bool"
				}
			],
			"name": "setApprovalForAll",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "string",
				"name": "_uri",
				"type": "string"
			}],
			"name": "setContractURI",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "_royaltyRecipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_royaltyBps",
					"type": "uint256"
				}
			],
			"name": "setDefaultRoyaltyInfo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}],
			"name": "setOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "_platformFeeRecipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_platformFeeBps",
					"type": "uint256"
				}
			],
			"name": "setPlatformFeeInfo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "address",
				"name": "_saleRecipient",
				"type": "address"
			}],
			"name": "setPrimarySaleRecipient",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "uint256",
					"name": "_tokenId",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_recipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_bps",
					"type": "uint256"
				}
			],
			"name": "setRoyaltyInfoForToken",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}],
			"name": "supportsInterface",
			"outputs": [{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [{
				"internalType": "string",
				"name": "",
				"type": "string"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "thirdwebFee",
			"outputs": [{
				"internalType": "contract ITWFee",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"name": "totalSupply",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}],
			"name": "uri",
			"outputs": [{
				"internalType": "string",
				"name": "",
				"type": "string"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"components": [{
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "royaltyRecipient",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "royaltyBps",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "primarySaleRecipient",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						},
						{
							"internalType": "string",
							"name": "uri",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "quantity",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "pricePerToken",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "currency",
							"type": "address"
						},
						{
							"internalType": "uint128",
							"name": "validityStartTimestamp",
							"type": "uint128"
						},
						{
							"internalType": "uint128",
							"name": "validityEndTimestamp",
							"type": "uint128"
						},
						{
							"internalType": "bytes32",
							"name": "uid",
							"type": "bytes32"
						}
					],
					"internalType": "struct ITokenERC1155.MintRequest",
					"name": "_req",
					"type": "tuple"
				},
				{
					"internalType": "bytes",
					"name": "_signature",
					"type": "bytes"
				}
			],
			"name": "verify",
			"outputs": [{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	],

	imgurl: '', // 图片拼接地址
	url: 'http://animemeta.cougogo.com', // 接口地址   
	base_url: function() {  
		// #ifdef MP-WEIXIN || APP-PLUS
		return this.url
		// #endif  
		// #ifndef MP-WEIXIN || APP-PLUS
		if (process.env.NODE_ENV === 'development') {
			return '/dpc/'
		} else { 
			return this.url
		} 
		// #endif
	},
	phone_type: uni.getSystemInfoSync().platform, 
	hidephone: function(phone) {
		if (!phone) return
		return phone.substring(0, 3) + "****" + phone.substring(7)
	}, 
	copy(value) {
		let _this=this;
		uni.setClipboardData({
			data: String(value), // e是你要保存的内容
			success: function() {
				uni.showToast({
					title: '复制成功',
					icon: 'none'
				})
			},
			fail:function(){
				_this.toast('复制失败，稍后再试试吧')
			}
		})
	},

	time: function(time) {
		return new Date(parseInt(time)).getFullYear() + '年' + (new Date(parseInt(time)).getMonth() + 1) + '月' +
			new Date(parseInt(time)).getDate() + '日' + ' ' + (new Date(parseInt(time)).getHours() < 10 ? '0' :
				'') + new Date(parseInt(time)).getHours() + ':' + (new Date(parseInt(time)).getMinutes() < 10 ?
				'0' : '') + new Date(parseInt(time)).getMinutes()
	},
	timeymd: function(time) {
		return new Date(parseInt(time)).getFullYear() + '-' + (new Date(parseInt(time)).getMonth() < 9 ? '0' :
			'') + (new Date(parseInt(time)).getMonth() + 1) + '-' + (new Date(parseInt(time)).getDate() <
			10 ? '0' : '') + new Date(parseInt(time)).getDate()
	},
	post: function(url, datas) {
		// uni.showLoading()
		return new Promise(resolve => {
			console.log(this.url + url);
			uni.request({
				url: this.url + url,
				data: datas,
				method: 'POST',
				dataType: "json",
				header: {
					"lang":uni.getStorageSync('locale')?uni.getStorageSync('locale'):'zh',
					'token': uni.getStorageSync('token'),
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-requested-with': 'XMLHttpRequest' //自定义请求头信息
				},
				success: ({
					data
				}) => {
					if (data.code === 204) uni.reLaunch({
						url: '/pages/login/login' 
					}) 
					// this.toast('网络请求失败')
					resolve(data)
				},
				fail: () => {
					this.toast('网络请求失败')
				},
				complete: () => {
					// uni.hideLoading()
				}
			})
		})

	},
	api: function(url, data, method, text) {
		if (method == 'post') {
			return new Promise((resolve, reject) => {
				this.post(url, data).then(res => {
					console.log(res, text);
					resolve(res);
				})
			});
		} else {
			return new Promise((resolve, reject) => {
				this.get(url, data).then(res => {
					console.log(res, text);
					resolve(res)
				})
			});
		}
	},

	get: function(url, datas) {
		return new Promise(resolve => {
			uni.request({
				url: this.url + url,
				data: datas || {},
				method: 'GET',
				dataType: "json",
				header: {
					'token': uni.getStorageSync('token'),
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-requested-with': 'XMLHttpRequest' //自定义请求头信息
				},
				success: ({
					data
				}) => {
					if (data.code === 204) uni.reLaunch({
						url: '/pages/login/login'
					})
					resolve(data)
				},
				fail: () => {
					this.toast('网络请求失败')
				},
				complete: () => {
					// uni.hideLoading()
				}
			})
		})
	},
	getnft: function(url, datas) {
		return new Promise(resolve => {
			uni.request({
				url:  url,
				data: datas || {},
				method: 'GET',
				dataType: "json",
				header: {
					'token': uni.getStorageSync('token'),
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-requested-with': 'XMLHttpRequest' //自定义请求头信息
				},
				success: ({
					data
				}) => {
					if (data.code === 204) uni.reLaunch({
						url: '/pages/login/login'
					})
					resolve(data)
				},
				fail: () => {
					this.toast('网络请求失败')
				},
				complete: () => {
					// uni.hideLoading()
				}
			})
		})
	},
	
	
	choosepic: function(val) {
		return new Promise(resolve => {
			uni.chooseImage({ 
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera '], //手机拍照
				success: (res) => {
					const tempFilePaths = res.tempFilePaths;
					// if (res.tempFiles[0].size > 2291456) return uni.showToast({title: "上传图片大小不能超过2MB",icon: 'none'});
					uni.uploadFile({
						url: this.url + val, 
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							'token': uni.getStorageSync('token'),
						},
						formData: {
							"file": tempFilePaths[0],
							use: 'company_photo'
						},
						success: (uploadFileRes) => {
							let res = JSON.parse(uploadFileRes.data);
							if (res.code == 200) {
								this.toast(res.message)
								resolve(res.data)
							} else {
								this.toast(res.message)
							}
						}
					});
				}
			});
		})
	},
	// choosepic: function() {
	// 	return new Promise(resolve => {
	// 		uni.chooseImage({
	// 			count: 1, //默认9
	// 			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
	// 			sourceType: ['album'], //从相册选择
	// 			success: (res) => {
	// 				uni.uploadFile({
	// 					url: this.base_url() + 'member/upload_avatar',
	// 					filePath: res.tempFilePaths[0],
	// 					name: 'url',
	// 					success: (e) => {
	// 						let res = JSON.parse(e.data)
	// 						if (res.code == 1000) {
	// 							resolve(res.data.url)
	// 						} else {
	// 							this.$my.toast(res.message)
	// 						}
	// 					},
	// 					fail: () => {
	// 						this.$my.toast('')
	// 					}
	// 				})
	// 			}
	// 		});
	// 	})
	// },
	// 姓名隐藏名
	// 姓名隐藏名
	hideName(name) {
		if (!name) return;
		let name1 = name;
		if (name.length == 2) {
			name1 = name.substring(0, 1) + "*";
		} else if (name.length == 3) {
			name1 = name.substring(0, 1) + "**";
		} else if (name.length == 4) {
			name1 = name.substring(0, 1) + "***";
		} else if (name.length == 5) {
			name1 = name.substring(0, 1) + "****";
		}
		return name1;
	},
	hideIdcard(idcard) {
		if (!idcard) return;
		return idcard.substring(0, 6) + "******" + idcard.substring(13);
	},

	go(url) {
		if (!url) {
			uni.navigateBack({
				delta: 1
			})
		} else {
			uni.navigateTo({
				url
			})
		}

	},

	toast: function(msg) {
		// #ifndef APP-PLUS
		uni.showToast({
			title: msg,
			icon: "none"
		})
		// #endif
		// #ifdef APP-PLUS
		void plus.nativeUI.toast(msg, {
			background: 'rgba(0,0,0,.4)',
			verticalAlign: 'center',
			duration: 'short'
		});
		// #endif
	},
	//防抖
	dou: function() {
		let timer = null;
		return function(callback, delayed) {
			clearTimeout(timer)
			timer = setTimeout(() => {
				callback()
			}, delayed)
		}
	},
	//节流
	shollte: function() {
		let flag = true
		return function(callback, delayed) {
			if (flag) {
				callback()
				flag = false
				setTimeout(() => {
					flag = true
				}, delayed)
			}
		}
	},



}






export default MY
