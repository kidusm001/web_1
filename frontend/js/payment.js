const recepient = '0xfFC45A4D4846645FC57D376031f938E32Dea447e'

function initTransaction(price){
  if (typeof window.ethereum !== "undefined") {
    ethereum.request({ method: "eth_requestAccounts" });
    const weiPrice = price * 1000000000000000000
    const wallet = window.ethereum

    const tx = {
      from: wallet.selectedAddress,
      to: recepient,
      value: weiPrice
    };
    ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: wallet.selectedAddress,
              to: recepient,
              value: weiPrice.toString(16),
              gasPrice: '0x09184e72a000',
              gas: '0x2710',
            },
          ],
        })
        .then((txHash) => {
          console.log(txHash)
        // todo subscribe adn check status of txn
          const userData = {
            user_name: localStorage.getItem('user_id'),
            event_id: dataStore.get_selected_event().eventId
          }
          fetch('/events/buy_ticket.php', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        })
        .catch((error) => console.error(error));
  } else {
    alert("Please install MetaMask to make Ethereum transactions!");
  }
}
