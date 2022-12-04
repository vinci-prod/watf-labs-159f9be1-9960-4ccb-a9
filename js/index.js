
const VINCI_ENV = sessionStorage.getItem('vinciEnv');
const BASE_URL = VINCI_ENV === 'dev' ? 'https://us-central1-vinci-dev-6e577.cloudfunctions.net/publicApi/public' :
    'https://us-central1-vinci-prod.cloudfunctions.net/publicApi/public';
const BASE_API_URL = VINCI_ENV === 'dev' ? 'https://us-central1-vinci-dev-6e577.cloudfunctions.net/api' :
    'https://us-central1-vinci-prod.cloudfunctions.net/api';
const PROJECT_ID = ''
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;
const ignore = ["#", "WEB3_CONNECT_MODAL_ID", "template", "inputNext", "eth", "sol", "error-text", "discordU", "discordJ", "twitterU", "linkedTwitter", "linkedDiscord", "but", "complete",  "completeC", "completeT",  "completeC1"];

const fetchUsers = () => {
    axios.get(BASE_URL, {
        params: {
            url: window.location.href,
            API_KEY: 'VINCI_DEV_6E577'
        }, headers: { "Access-Control-Allow-Origin": "*" }
    }).then(response => {
        const users = response.data.data;
    }).catch(error => console.error(error));
};

async function country() {
    return fetch('https://extreme-ip-lookup.com/json/?key=X3he8u0UQopySwA6qesC')
        .then(res => res.json())
}

const logPageView = async () => {
    const countryR = await country();
    if (PROJECT_ID === "awda-6d9d35c1-502c-4a3d-9cdf-c8") return;
    var pathArray = window.location.pathname.split('/');
    axios.post(BASE_URL + '/onboardingview', {
        projectId: pathArray[1],
        requestURL: window.location.href,
        location: countryR.country,
        API_KEY: 'VINCI_DEV_6E577'
    });
}

const storeUserWallet = async (selectedWallet) => {
    if (window.localStorage.getItem('user') !== null && new Date().getTime() < (JSON.parse(window.localStorage.getItem('user')).expiry)) {
        let userData = JSON.parse(window.localStorage.getItem('user'));
        console.log(userData)
        userData.wallet = selectedWallet;
        window.localStorage.setItem('user', JSON.stringify(userData));
        userData = JSON.parse(window.localStorage.getItem('user'));
    } else {
        const countryR = await country();
        const userData = { wallet: selectedWallet, id: 'onboarding-user-' + crypto.randomUUID(), country: countryR.country, expiry: new Date().getTime() + 600000 };
        console.log(userData)
        window.localStorage.setItem('user', JSON.stringify(userData));
    }
}

async function checkUserInput(event) {
    event.preventDefault();
    var allElements = document.querySelectorAll('*[id]');
    var allIds = {};
    for (var i = 0, n = allElements.length; i < n; ++i) {
        var el = allElements[i];
        var result = ignore.filter(function(item){
            return item.indexOf(el.id.split('----')[0]) > -1;            
        });
        if (result.length === 0) {
            if (el.id) {
                allIds[el.id.toString()] = el.value;
            }
        }
    }

    if (window.localStorage.getItem('user') !== null && new Date().getTime() < (JSON.parse(window.localStorage.getItem('user')).expiry)) {
        let userData = JSON.parse(window.localStorage.getItem('user'));
        let merged = { ...userData, ...allIds };
        window.localStorage.setItem('user', JSON.stringify(merged));
        let userDataF = JSON.parse(window.localStorage.getItem('user'));
        var pathArray = window.location.pathname.split('/');
        axios.post(BASE_URL + '/updateuseronboarding', {
            projectId: pathArray[1],
            requestURL: window.location.href,
            userData: userDataF,
            API_KEY: 'VINCI_DEV_6E577'
        });
    } else {
        const countryR = await country();
        allIds.country = countryR.country;
        allIds.id = 'onboarding-user-' + crypto.randomUUID();
        allIds.expiry = new Date().getTime() + 600000;
        window.localStorage.setItem('user', JSON.stringify(allIds));
        let userData = JSON.parse(window.localStorage.getItem('user'));
        var pathArray = window.location.pathname.split('/');
        axios.post(BASE_URL + '/adduseronboarding', {
            projectId: pathArray[1],
            requestURL: window.location.href,
            userData: userData,
            API_KEY: 'VINCI_DEV_6E577'
        });
    }

    const data = document.querySelector("#inputNext");
    if (data.dataset.href.includes("Complete")) {
        window.close();
    }
    location.href = data.dataset.href;
}

async function checkUserInputComplete(event) {
    event.preventDefault();
    var allElements = document.querySelectorAll('*[id]');
    var allIds = {};
    for (var i = 0, n = allElements.length; i < n; ++i) {
        var el = allElements[i];
        var result = ignore.filter(function(item){
            return item.indexOf(el.id.split('----')[0]) > -1;            
        });
        if (result.length === 0) {
            if (el.id) {
                allIds[el.id.toString()] = el.value;
            }
        }
    }

    if (window.localStorage.getItem('user') !== null && new Date().getTime() < (JSON.parse(window.localStorage.getItem('user')).expiry)) {
        let userData = JSON.parse(window.localStorage.getItem('user'));
        let merged = { ...userData, ...allIds };
        window.localStorage.setItem('user', JSON.stringify(merged));
        let userDataF = JSON.parse(window.localStorage.getItem('user'));
        var pathArray = window.location.pathname.split('/');
        axios.post(BASE_URL + '/updateuseronboarding', {
            projectId: pathArray[1],
            requestURL: window.location.href,
            userData: userDataF,
            API_KEY: 'VINCI_DEV_6E577'
        });
    } else {
        const countryR = await country();
        allIds.country = countryR.country;
        allIds.id = 'onboarding-user-' + crypto.randomUUID();
        allIds.expiry = new Date().getTime() + 600000;
        window.localStorage.setItem('user', JSON.stringify(allIds));
        let userData = JSON.parse(window.localStorage.getItem('user'));
        var pathArray = window.location.pathname.split('/');
        axios.post(BASE_URL + '/adduseronboarding', {
            projectId: pathArray[1],
            requestURL: window.location.href,
            userData: userData,
            API_KEY: 'VINCI_DEV_6E577'
        });
    }

    const data = document.querySelector("#inputNext");
    if (data.dataset.href.includes("Complete")) {
        window.close();
    }
}

async function addUserDecision(event) {
    event.preventDefault();
    if (window.localStorage.getItem('user') !== null && new Date().getTime() < (JSON.parse(window.localStorage.getItem('user')).expiry)) {
        let userData = JSON.parse(window.localStorage.getItem('user'));
        let merged = { ...userData, ...{ type: event.target.id } };
        window.localStorage.setItem('user', JSON.stringify(merged));

    } else {
        const countryR = await country();
        var user = {}
        user.country = countryR.country;
        user.id = 'onboarding-user-' + crypto.randomUUID();
        user.type = event.target.id;
        user.expiry = new Date().getTime() + 600000;
        window.localStorage.setItem('user', JSON.stringify(user));
        let userData = JSON.parse(window.localStorage.getItem('user'));
    }
    const data = document.querySelector("#" + event.target.id);
    location.href = data.dataset.href;
}

function openPopupD(e, formTitle) {
    var allIds = {};
    if(window.location.host === "vinci-onboarding-repos.github.io" || window.location.host === "vinci-prod.github.io") {  
        href = window.location.origin + '/' + window.location.pathname.split('/')[1];
    } else {
        href = window.location.origin;
    }
    console.log(href);
    var popup = window.open(BASE_API_URL + '/routes/discord/auth?original=' + href, '', "width=400, height=400");

    var popupTick = setInterval(function () {
        if (popup.location.href !== undefined) {
            if (popup.location.href.indexOf('discordU') > -1) {
                const params = popup.location.href.split("discordU=")[1]
                if (window.localStorage.getItem('user') !== null && new Date().getTime() < (JSON.parse(window.localStorage.getItem('user')).expiry)) {
                    allIds['discordU----'+formTitle] = params;
                    let userData = JSON.parse(window.localStorage.getItem('user'));
                    let merged = { ...userData, ...allIds };
                    window.localStorage.setItem('user', JSON.stringify(merged));
                }
                else {
                    allIds['discordU----'+formTitle] = params;
                    allIds.expiry = new Date().getTime() + 600000;
                    allIds.id = 'onboarding-user-' + crypto.randomUUID();
                    window.localStorage.setItem('user', JSON.stringify(allIds));
                }
                const elem = document.querySelector("#linkedDiscord");
                var html = elem.innerHTML;
                elem.innerHTML = 'Linked ' + params;
                popup.close();
                clearInterval(popupTick);
            }
        } else {
            popup.close();
            clearInterval(popupTick);
        }
    }, 1000);

    return false;
}

function openPopupDJ(e, formTitle) {
    document.body.style.cursor='wait';
    e.preventDefault();
    const data = document.querySelector("#discordJ");
    //console.log(data.dataset.serverid)
    //console.log(data.dataset.channelid)
    //console.log(BASE_API_URL + '/discordBot/getInviteLink?serverid=' + data.dataset.serverid + '&channelid=' + data.dataset.channelid)
    //var popup = window.open(BASE_API_URL + '/discordBot/getInviteLink?serverid=' + data.dataset.serverid + '&channelid=' + data.dataset.channelid, '', "width=400, height=400");

    
    axios.get(BASE_API_URL + '/discordBot/getInviteLink', {
        params: {
            serverid: data.dataset.serverid,
            channelid: data.dataset.channelid
        }, headers: { "Access-Control-Allow-Origin": "*" }
    }).then(response => {   
        window.open(response.data, '_blank').focus();
    })
    return false;
}

function openPopupT(e, formTitle) {
    var allIds = {};
    var href = '';
    if(window.location.host === "vinci-onboarding-repos.github.io" || window.location.host === "vinci-prod.github.io") { 
        href = window.location.origin + '/' + window.location.pathname.split('/')[1];
    } else {
        href = window.location.origin;
    }
    console.log(href);
    var popup = window.open(BASE_API_URL + '/routes/twitter/auth/twitter1?original=' + href, '', "width=400, height=400");

    var popupTick = setInterval(function () {
        if (popup.location.href !== undefined) {
            if (popup.location.href.indexOf('twitterU') > -1) {
                const params = popup.location.href.split("twitterU=")[1]
                if (window.localStorage.getItem('user') !== null && new Date().getTime() < (JSON.parse(window.localStorage.getItem('user')).expiry)) {
                    allIds['twitterU'+'----'+formTitle] = params;
                    let userData = JSON.parse(window.localStorage.getItem('user'));
                    let merged = { ...userData, ...allIds };
                    window.localStorage.setItem('user', JSON.stringify(merged));
                }
                else {
                    allIds['twitterU'+'----'+formTitle] = params;
                    allIds.expiry = new Date().getTime() + 600000;
                    allIds.id = 'onboarding-user-' + crypto.randomUUID();
                    window.localStorage.setItem('user', JSON.stringify(allIds));
                }
                const elem = document.querySelector("#linkedTwitter");
                var html = elem.innerHTML;
                elem.innerHTML = 'Linked ' + params;
                popup.close();
                clearInterval(popupTick);
            }
        } else {
            popup.close();
            clearInterval(popupTick);
        }
    }, 1000);

    return false;
}

function init() {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "7550f76d68824553876499772c39974a",
            }
        },
    };
    web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false
    });
    console.log("Web3Modal instance is", web3Modal);
}

function getProvider() {
    if ("phantom" in window) {
        const provider = window.phantom?.solana;

        if (provider?.isPhantom) {
            return provider;
        }
    }
    window.open("https://phantom.app/", "_blank");
}

async function refreshAccountData(event) {
    await fetchAccountData(event);
}

async function onConnect(event) {
    try {
        provider = await web3Modal.connect();
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
    provider.on("accountsChanged", (accounts) => {
        fetchAccountData(event);
    });
    provider.on("chainChanged", (chainId) => {
        fetchAccountData(event);
    });
    provider.on("networkChanged", (networkId) => {
        fetchAccountData(event);
    });

    await refreshAccountData(event);

}

async function onSolConnect(event) {
    event.preventDefault();
    const provider = getProvider();
    try {
        provider.connect().then((resp) => {
            console.log(resp.publicKey.toString());
            const connectButton = document.getElementById("sol");
            connectButton.innerHTML = window.solana.publicKey;
            status.innerHTML = provider.isConnected.toString();
            const data = document.querySelector("#sol");
            if (data.dataset.address === '') {
                location.href = data.dataset.href;
            }
            const res = check_user_NFT(resp.publicKey.toString(), data.dataset.address, data.dataset.numberofneededtokens, data.dataset.chain)
            if (res) {
                storeUserWallet(resp.publicKey.toString());
                location.href = data.dataset.href;
            }
        });
    } catch (err) {
        console.log(err);
    }
}

async function fetchAccountData(event) {
    event.preventDefault();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];
    const data = document.querySelector("#eth");
    if (data.dataset.address === '') {
        location.href = data.dataset.href;
    }
    const res = check_user_NFT(selectedAccount, data.dataset.address, data.dataset.numberofneededtokens, data.dataset.chain)
    if (res) {
        storeUserWallet(selectedAccount);
        location.href = data.dataset.href;
    }
}

async function check_user_NFT(user_address, token_address, amount, network_name) {
    const opensea_uri = 'https://api.opensea.io/api/v1/assets?owner=' + user_address;
    const response = await axios.get(opensea_uri);
    const data = response.data.assets;
    // check if user has required tokens
    for (var i = 0; i < data.length; i++) {
        if (data[i].asset_contract.address === token_address) {
            return true;
        }
    }
    if (network_name === "mainnet" || network_name === "ethereum") {
        network_name = "eth";
    } else {
    }

    // https://deep-index.moralis.io/api/v2/0xB47E50B7B67971713f80eC7Ec26332f18a7CF738/erc20?chain=eth'     // --header 'X-API-Key: test'     
    const moralisURL = 'https://deep-index.moralis.io/api/v2/' + user_address + '/erc20?chain=' + network_name + '&token_address=' + token_address;
    const result = await axios.get(
        moralisURL,
        {
            headers: {
                "X-API-Key": "test",
            },
        }
    );
    if (result.data.length > 0) {
        for (var x = 0; x < result.data.length; x++) {
            if (result.data[x].token_address === token_address && (parseInt(result.data[x].balance) / (10 ^ 18)) >= amount) {
                return true;
            }
        }
    };

    // if network is solana then use solana web3 to fetch user balance of a certain token
    if (network_name === "solana") {
        const solana = require("@solana/web3.js");
        const connection = new solana.Connection(solana.clusterApiUrl("devnet"));
        //const token = new solana.PublicKey(token_address);
        const info = await connection.getTokenAccountBalance(
            new solana.PublicKey(user)
        );
        if (info.value.uiAmount >= amount) {
            return true;
        }
    } else {
        console.log("INVALID INPUT" + result.data.result);
        return false;
    }

}

async function addxptopath() {
}


function confettiComplete(event, emoji, completeMessage) {
    event.preventDefault();
    var projectId = window.location.pathname.split('/')[1];
    var url = window.location.href;
    if (url.includes("https://")) {
        url = window.location.href.split("https://")[1]
    } else {
        if (url.includes("http://")) {
            url = window.location.href.split("http://")[1]
        }
    }
    // There might be a "/" at the end. remove it
    // const formattedURL = url.replace(//$/, "");

    const pathList = url.split("/");
    const page = pathList[pathList.length - 1] == projectId ?
        "index" : pathList[pathList.length - 1];

    const data = document.querySelector("#completeT");
    let xpValue = 100;

    if (data !== null && data.dataset !== null  && data.dataset.xp !== null){
        xpValue = data.dataset.xp;
    }

    if (window.localStorage.getItem('user') === null) {
        var allIds = {};
        allIds.id = 'onboarding-user-' + crypto.randomUUID();
        window.localStorage.setItem('user', JSON.stringify(allIds));
    }
    console.log(page)

    var pathArray = window.location.pathname.split('/');
    axios.post(BASE_URL + '/changeuserxpbasedonpath', {
        path: page,
        projectId: projectId,
        xp: parseInt(xpValue),
        API_KEY: 'VINCI_DEV_6E577',
        userData: JSON.parse(window.localStorage.getItem('user')).id,
        add: true,
    });

    axios.post(BASE_URL + '/changeuseronboardingcompletion', {
        projectId: projectId,
        API_KEY: 'VINCI_DEV_6E577',
        userData: JSON.parse(window.localStorage.getItem('user')).id,
    });

    if(event.type !== 'click') {
        return;
    }
    console.log(event)
    event.preventDefault();
    alert(completeMessage);
    const jsConfetti = new JSConfetti();
    if(emoji === null) {
        jsConfetti.addConfetti();
    }
    else{
        jsConfetti.addConfetti({emojis: emoji});
    }
}


logPageView();
init();


window.addEventListener('load', async () => {
    init();
});

