// Last block constants
const lastHeightUrl = 'https://blockstream.info/api/blocks/tip/height'; // Get last block height
const lastHashUrl = 'https://blockstream.info/api/blocks/tip/hash'; // Get last block hash
const lastHeightOut = document.getElementById('lastHeightOut'); // Last block height output ID
const lastBlockOutput = document.getElementById('lastBlockOutput'); // Last block info output ID

// Specific block constants
const blockHashUrl = 'https://blockstream.info/api/block-height/:height' // Get block hash by height
const blockInfoUrl = 'https://blockstream.info/api/block/:hash'; // Get block info by hash
const specificBlockOutput = document.getElementById('specificBlockOutput'); // Specific block info output ID

// Mempool constants
const mempoolUrl = 'https://blockstream.info/api/mempool'; // Get mempool backlog stats
const mempoolOutput = document.getElementById('mempoolOutput'); // Mempool output ID

// Fee estimate constants
const feeEstimateUrl = 'https://blockstream.info/api/fee-estimates'; // Get estimated feerate
const feeEstimateOutput = document.getElementById('feeEstimateOutput'); // Fee estimate output ID



async function getLastBlockHeight() {
    let response = await fetch(lastHeightUrl);
    let data = await response.json();
    lastHeightOut.innerHTML = data;
}

async function getBlockHash(lastBlock) {
    if (lastBlock === true) {
        var respFetchHash = await fetch(lastHashUrl);
    } else {
        console.log('this is block height', document.getElementById('blockHeight'))
        var respFetchHash = await fetch(blockHashUrl.replace(':height', document.getElementById('blockHeight').value));
    }
    console.log('this is respFetchHash', respFetchHash);
    let data = await respFetchHash.text();
    console.log('this is data', data);
    return data;
}

async function getBlockInfo(lastBlock) {
    if (lastBlock === true) {
        let respGetHash = await getBlockHash(true);
        let response = await fetch(blockInfoUrl.replace(':hash', respGetHash));
        console.log('this is response', response);
        let data = await response.json();
        console.log('this is data', data);
        lastBlockOutput.innerHTML = JSON.stringify(data, null, 4);
    } else {
        let respGetHash = await getBlockHash(false);
        let response = await fetch(blockInfoUrl.replace(':hash', respGetHash));
        console.log('this is response', response);
        let data = await response.json();
        console.log('this is data', data);
        specificBlockOutput.innerHTML = JSON.stringify(data, null, 4);
    }
}

async function getMempoolStats() {
    let response = await fetch(mempoolUrl);
    let data = await response.json();
    mempoolOutput.innerHTML = JSON.stringify(data, null, 4);
}

async function getFeeEstimates() {
    let response = await fetch(feeEstimateUrl);
    let data = await response.json();
    feeEstimateOutput.innerHTML = JSON.stringify(data, null, 4);
}

function clearResults () {
    lastHeightOut.innerHTML = "";
    lastBlockOutput.innerHTML = "";
    specificBlockOutput.innerHTML = "";
    mempoolOutput.innerHTML = "";
    feeEstimateOutput.innerHTML = "";
}