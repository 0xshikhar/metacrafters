import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "./App.css";

import { ethers } from "ethers";
import Counter from "./contracts/Counter.sol/Counter.json";
const counterAddress = "0xC284Be07898768F0818aAeC84A0bD95Bc5275670"
console.log(counterAddress, "Counter ABI: ", Counter.abi);

function App() {
  const [count, setCount] = useState(0);

  // const incrementCounter = () => {
  //   // we should read currentCount from the blockchain
  //   const currentCount = count;
  //   setCount(currentCount + 1);
  // };
  const incrementCounter = async () => {
    await updateCounter();
  };

  const decrementCounter = async () => {
    await downgradeCounter();
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchCount = async () => {
      const data = await readCounterValue();
      return data;
    };

    fetchCount().catch(console.error);
  }, []);

  async function readCounterValue() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("provider", provider);
      const contract = new ethers.Contract(
        counterAddress,
        Counter.abi,
        provider
      );
      console.log("contract", contract);
      try {
        const data = await contract.retrieve();
        console.log(data);
        console.log("data: ", parseInt(data.toString()));
        setCount(parseInt(data.toString()));
      } catch (err) {
        console.log("Error: ", err);
        alert(
          "Switch your MetaMask network to Sepolia testnet and refresh this page!"
        );
      }
    }
  }

  const [isLoading, setIsLoading] = useState(false);
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function updateCounter() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(counterAddress, Counter.abi, signer);
      const transaction = await contract.increment();
      setIsLoading(true);
      await transaction.wait();
      setIsLoading(false);
      readCounterValue();
    }
  }

  async function downgradeCounter() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(counterAddress, Counter.abi, signer);
      const transaction = await contract.decrement();
      setIsLoading(true);
      await transaction.wait();
      setIsLoading(false);
      readCounterValue();
    }
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, marginTop: 20 }}>
        <CardContent>
          <p>Count: {count}</p>
          <Button onClick={incrementCounter} variant="outlined">
            {isLoading ? "loading..." : "+1"}
          </Button>
          <Button sx={{ marginX:10 }} onClick={decrementCounter} variant="outlined">
            {isLoading ? "loading..." : "-1"}
          </Button>

        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
