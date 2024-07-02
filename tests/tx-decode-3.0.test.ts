import {
  AnchorModeID,
  decodeTransaction,
  PostConditionAuthFlag,
  PostConditionModeID,
  PrincipalTypeID,
  TenureChangeCause,
  TransactionVersion,
  TxAuthFieldTypeID,
  TxPayloadNakamotoCoinbase,
  TxPayloadTypeID,
  TxPublicKeyEncoding,
  TxSpendingConditionMultiSigHashMode
} from '../index.js';

test('stacks3.0 - decode tx - tenure change', () => {
  const tenureChangeTx = '808000000004001dc27eba0247f8cc9575e7d45e50a0bc7e72427d000000000000001d000000000000000000011dc72b6dfd9b36e414a2709e3b01eb5bbdd158f9bc77cd2ca6c3c8b0c803613e2189f6dacf709b34e8182e99d3a1af15812b75e59357d9c255c772695998665f010200000000076f2ff2c4517ab683bf2d588727f09603cc3e9328b9c500e21a939ead57c0560af8a3a132bd7d56566f2ff2c4517ab683bf2d588727f09603cc3e932828dcefb98f6b221eef731cabec7538314441c1e0ff06b44c22085d41aae447c1000000010014ff3cb19986645fd7e71282ad9fea07d540a60e';
  const decoded = decodeTransaction(tenureChangeTx);
  expect(decoded).toEqual({
    "tx_id": "0xd443c1edb6bbcbdb702884a688b3ed09cc2d81e391f09c4d91ac881806979620",
    "version": TransactionVersion.Testnet,
    "chain_id": 0x80000000,
    "auth": {
      "type_id": PostConditionAuthFlag.Standard,
      "origin_condition": {
        "hash_mode": 0,
        "signer": {
          "address_version": 26,
          "address_hash_bytes": "0x1dc27eba0247f8cc9575e7d45e50a0bc7e72427d",
          "address": "STEW4ZNT093ZHK4NEQKX8QJGM2Y7WWJ2FQQS5C19"
        },
        "nonce": "29",
        "tx_fee": "0",
        "key_encoding": TxPublicKeyEncoding.Compressed,
        "signature": "0x011dc72b6dfd9b36e414a2709e3b01eb5bbdd158f9bc77cd2ca6c3c8b0c803613e2189f6dacf709b34e8182e99d3a1af15812b75e59357d9c255c772695998665f"
      }
    },
    "anchor_mode": AnchorModeID.OnChainOnly,
    "post_condition_mode": PostConditionModeID.Deny,
    "post_conditions": [],
    "post_conditions_buffer": "0x0200000000",
    "payload": {
      "type_id": TxPayloadTypeID.TenureChange,
      "tenure_consensus_hash": "0x6f2ff2c4517ab683bf2d588727f09603cc3e9328",
      "prev_tenure_consensus_hash": "0xb9c500e21a939ead57c0560af8a3a132bd7d5656",
      "burn_view_consensus_hash": "0x6f2ff2c4517ab683bf2d588727f09603cc3e9328",
      "previous_tenure_end": "0x28dcefb98f6b221eef731cabec7538314441c1e0ff06b44c22085d41aae447c1",
      "previous_tenure_blocks": 1,
      "cause": TenureChangeCause.BlockFound,
      "pubkey_hash": "0x14ff3cb19986645fd7e71282ad9fea07d540a60e",
    }
  });
});

test('stacks3.0 - decode tx - nakamoto coinbase - no alt recipient (mockamoto vector)', () => {
  const nakamotoCoinbaseTx = '80800000000400b40723ab4d7781cf1b45083aa043ce4563006c6100000000000000010000000000000000000158be820619a4838f74e63099bb113fcf7ee13ef3b2bb56728cd19470f9379f05288d4accc987d8dd85de5101776c2ad000784d118e35deb4f02852540bf6dd5f01020000000008010101010101010101010101010101010101010101010101010101010101010109119054d8cfba5f6aebaac75b0f6671a6917211729fa7bafa35ab0ad68fe243cf4169eb339d8a26ee8e036c8380e3afd63da8aca1f9673d19a59ef00bf13e1ba2e540257d0b471fc591a877a90e04e00b';
  const decoded = decodeTransaction(nakamotoCoinbaseTx);
  expect(decoded).toEqual({
    "tx_id": "0x1ecc33bfdd58a94ff97afb6d64a2ebefb0021f22490767e844ebd80285486e16",
    "version": TransactionVersion.Testnet,
    "chain_id": 0x80000000,
    "auth": {
      "type_id": PostConditionAuthFlag.Standard,
      "origin_condition": {
        "hash_mode": 0,
        "signer": {
          "address_version": 26,
          "address_hash_bytes": "0xb40723ab4d7781cf1b45083aa043ce4563006c61",
          "address": "ST2T0E8XB9NVR3KRV8M43N823SS2P603CC4Y4DG1V"
        },
        "nonce": "1",
        "tx_fee": "0",
        "key_encoding": TxPublicKeyEncoding.Compressed,
        "signature": "0x0158be820619a4838f74e63099bb113fcf7ee13ef3b2bb56728cd19470f9379f05288d4accc987d8dd85de5101776c2ad000784d118e35deb4f02852540bf6dd5f"
      }
    },
    "anchor_mode": AnchorModeID.OnChainOnly,
    "post_condition_mode": PostConditionModeID.Deny,
    "post_conditions": [],
    "post_conditions_buffer": "0x0200000000",
    "payload": {
      "type_id": TxPayloadTypeID.NakamotoCoinbase,
      "payload_buffer": "0x0101010101010101010101010101010101010101010101010101010101010101",
      "recipient": null,
      "vrf_proof": "0x119054d8cfba5f6aebaac75b0f6671a6917211729fa7bafa35ab0ad68fe243cf4169eb339d8a26ee8e036c8380e3afd63da8aca1f9673d19a59ef00bf13e1ba2e540257d0b471fc591a877a90e04e00b"
    }
  });

  const payload = decoded.payload as TxPayloadNakamotoCoinbase;
  const txType: TxPayloadTypeID.NakamotoCoinbase = payload.type_id;
  expect(txType).toEqual(TxPayloadTypeID.NakamotoCoinbase);
  expect(payload.recipient).toBeNull();
});

test('stacks3.0 - decode tx - nakamoto coinbase - no alt recipient (stacks-core vector 1)', () => {
  const nakamotoCoinbaseTx = '80800000000400b40723ab4d7781cf1b45083aa043ce4563006c6100000000000000010000000000000000000158be820619a4838f74e63099bb113fcf7ee13ef3b2bb56728cd19470f9379f05288d4accc987d8dd85de5101776c2ad000784d118e35deb4f02852540bf6dd5f010200000000081212121212121212121212121212121212121212121212121212121212121212099275df67a68c8745c0ff97b48201ee6db447f7c93b23ae24cdc2400f52fdb08a1a6ac7ec71bf9c9c76e96ee4675ebff60625af28718501047bfd87b810c2d2139b73c23bd69de66360953a642c2a330a';
  const decoded = decodeTransaction(nakamotoCoinbaseTx);
  expect(decoded).toEqual({
    "tx_id": "0x3f23c7c7d865e1ff924950bf03b12eecb949c68f024fcad45b6d8e2420fb77cc",
    "version": TransactionVersion.Testnet,
    "chain_id": 0x80000000,
    "auth": {
      "type_id": PostConditionAuthFlag.Standard,
      "origin_condition": {
        "hash_mode": 0,
        "signer": {
          "address_version": 26,
          "address_hash_bytes": "0xb40723ab4d7781cf1b45083aa043ce4563006c61",
          "address": "ST2T0E8XB9NVR3KRV8M43N823SS2P603CC4Y4DG1V"
        },
        "nonce": "1",
        "tx_fee": "0",
        "key_encoding": TxPublicKeyEncoding.Compressed,
        "signature": "0x0158be820619a4838f74e63099bb113fcf7ee13ef3b2bb56728cd19470f9379f05288d4accc987d8dd85de5101776c2ad000784d118e35deb4f02852540bf6dd5f"
      }
    },
    "anchor_mode": AnchorModeID.OnChainOnly,
    "post_condition_mode": PostConditionModeID.Deny,
    "post_conditions": [],
    "post_conditions_buffer": "0x0200000000",
    "payload": {
      "type_id": TxPayloadTypeID.NakamotoCoinbase,
      "payload_buffer": "0x1212121212121212121212121212121212121212121212121212121212121212",
      "recipient": null,
      "vrf_proof": "0x9275df67a68c8745c0ff97b48201ee6db447f7c93b23ae24cdc2400f52fdb08a1a6ac7ec71bf9c9c76e96ee4675ebff60625af28718501047bfd87b810c2d2139b73c23bd69de66360953a642c2a330a"
    }
  });

  const payload = decoded.payload as TxPayloadNakamotoCoinbase;
  const txType: TxPayloadTypeID.NakamotoCoinbase = payload.type_id;
  expect(txType).toEqual(TxPayloadTypeID.NakamotoCoinbase);
  expect(payload.recipient).toBeNull();
});

test('stacks3.0 - decode tx - nakamoto coinbase - no alt recipient (stacks-core vector 2)', () => {
  const nakamotoCoinbaseTx = '80800000000400b40723ab4d7781cf1b45083aa043ce4563006c6100000000000000010000000000000000000158be820619a4838f74e63099bb113fcf7ee13ef3b2bb56728cd19470f9379f05288d4accc987d8dd85de5101776c2ad000784d118e35deb4f02852540bf6dd5f0102000000000812121212121212121212121212121212121212121212121212121212121212120a0601ffffffffffffffffffffffffffffffffffffffff0c666f6f2d636f6e74726163749275df67a68c8745c0ff97b48201ee6db447f7c93b23ae24cdc2400f52fdb08a1a6ac7ec71bf9c9c76e96ee4675ebff60625af28718501047bfd87b810c2d2139b73c23bd69de66360953a642c2a330a';
  const decoded = decodeTransaction(nakamotoCoinbaseTx);
  expect(decoded).toEqual({
    "tx_id": "0x3448d47b2e2ef6db517963e1d8e7534ba84afccac9b2c79c1dcf32b21f56871a",
    "version": TransactionVersion.Testnet,
    "chain_id": 0x80000000,
    "auth": {
      "type_id": PostConditionAuthFlag.Standard,
      "origin_condition": {
        "hash_mode": 0,
        "signer": {
          "address_version": 26,
          "address_hash_bytes": "0xb40723ab4d7781cf1b45083aa043ce4563006c61",
          "address": "ST2T0E8XB9NVR3KRV8M43N823SS2P603CC4Y4DG1V"
        },
        "nonce": "1",
        "tx_fee": "0",
        "key_encoding": TxPublicKeyEncoding.Compressed,
        "signature": "0x0158be820619a4838f74e63099bb113fcf7ee13ef3b2bb56728cd19470f9379f05288d4accc987d8dd85de5101776c2ad000784d118e35deb4f02852540bf6dd5f"
      }
    },
    "anchor_mode": AnchorModeID.OnChainOnly,
    "post_condition_mode": PostConditionModeID.Deny,
    "post_conditions": [],
    "post_conditions_buffer": "0x0200000000",
    "payload": {
      "type_id": TxPayloadTypeID.NakamotoCoinbase,
      "payload_buffer": "0x1212121212121212121212121212121212121212121212121212121212121212",
      "recipient": {
        "address": "S13ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZXCFYZCG",
        "address_hash_bytes": "0xffffffffffffffffffffffffffffffffffffffff",
        "address_version": 1,
        "contract_name": "foo-contract",
        "type_id": PrincipalTypeID.Contract,
      },
      "vrf_proof": "0x9275df67a68c8745c0ff97b48201ee6db447f7c93b23ae24cdc2400f52fdb08a1a6ac7ec71bf9c9c76e96ee4675ebff60625af28718501047bfd87b810c2d2139b73c23bd69de66360953a642c2a330a"
    }
  });

  const payload = decoded.payload as TxPayloadNakamotoCoinbase;
  const txType: TxPayloadTypeID.NakamotoCoinbase = payload.type_id;
  expect(txType).toEqual(TxPayloadTypeID.NakamotoCoinbase);
  expect(payload.recipient).not.toBeNull();
});

test("stacks 3.0 - decode tx - non-sequential multi-sig", () => {
  const tx =
    "8080000000040535e2fdeee173024af6848ca6e335691b55498fc4000000000000000000000000000000640000000300028bd9dd96b66534e23cbcce4e69447b92bf1d738edb83182005cfb3b402666e42020158146dc95e76926e3add7289821e983e0dd2f2b0bf464c8e94bb082a213a91067ced1381a64bd03afa662992099b04d4c3f538cc6afa3d043ae081e25ebbde6f0300e30e7e744c6eef7c0a4d1a2dad6f0daa3c7655eb6e9fd6c34d1efa87b648d3e55cdd004ca4e8637cddad3316f3fbd6146665fad2e7ca26725ad09f58c4e43aa0000203020000000000051a70f696e2bda63701e044609eb7a7ce5876571905000000000000271000000000000000000000000000000000000000000000000000000000000000000000";
  const decoded = decodeTransaction(tx);
  expect(decoded).toEqual({
    "tx_id": "0xf7f30ad912e9433743fb614b17842e8a366a04cc882e7fd94ff59fa9c2638674",
    "version": TransactionVersion.Testnet,
    "chain_id": 0x80000000,
    "auth": {
      "type_id": PostConditionAuthFlag.Standard,
      "origin_condition": {
        "tx_fee": "100",
        "nonce": "0",
        "fields": [
          {
            "type_id": TxAuthFieldTypeID.PublicKeyCompressed,
            "public_key":
              "0x028bd9dd96b66534e23cbcce4e69447b92bf1d738edb83182005cfb3b402666e42",
          },
          {
            "type_id": TxAuthFieldTypeID.SignatureCompressed,
            "signature":
              "0x0158146dc95e76926e3add7289821e983e0dd2f2b0bf464c8e94bb082a213a91067ced1381a64bd03afa662992099b04d4c3f538cc6afa3d043ae081e25ebbde6f",
          },
          {
            "type_id": TxAuthFieldTypeID.SignatureUncompressed,
            "signature":
              "0x00e30e7e744c6eef7c0a4d1a2dad6f0daa3c7655eb6e9fd6c34d1efa87b648d3e55cdd004ca4e8637cddad3316f3fbd6146665fad2e7ca26725ad09f58c4e43aa0",
          },
        ],
        "hash_mode": TxSpendingConditionMultiSigHashMode.P2SHNonSequential,
        "signatures_required": 2,
        "signer": {
          "address": "SNTY5ZFEW5SG4JQPGJ6ADRSND4DNAJCFRHVZBYR8",
          "address_hash_bytes": "0x35e2fdeee173024af6848ca6e335691b55498fc4",
          "address_version": 21,
        },
      },
    },
    "anchor_mode": AnchorModeID.Any,
    "post_condition_mode": PostConditionModeID.Deny,
    "post_conditions": [],
    "post_conditions_buffer": "0x0200000000",
    "payload": {
      "type_id": TxPayloadTypeID.TokenTransfer,
      "amount": "10000",
      "recipient": {
        "type_id": PrincipalTypeID.Standard,
        "address": "ST1RFD5Q2QPK3E0F08HG9XDX7SSC7CNRS0QR0SGEV",
        "address_hash_bytes": "0x70f696e2bda63701e044609eb7a7ce5876571905",
        "address_version": 26,
      },
      "memo_hex":
        "0x00000000000000000000000000000000000000000000000000000000000000000000",
    },
  });
});
