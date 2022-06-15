import styles from "../styles/conversationList.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import friends from "../assets/icons/friends.svg";
import nitro from "../assets/icons/nitro.svg";
import DmCard from "./DmCard";
const Web3 = require("web3");
const axios = require("axios");
// require("dotenv").config();


const ConversationList = () => {
  const [valueQuote, setValueQuote] = useState([]);
  const [dms, setDms] = useState([]);

  useEffect(() => {
    conversationEffect();
  }, []);

  const conversationEffect = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getdms`,
      );
      const data2 = await response.json();
      setDms(data2);
    } catch (error) {
      console.error(error);
    }
  };

  const getrates = async () => {
    const RPC_URL_FANTOM_MAINNET = process.env.RPC_URL_FANTOM_MAINNET;
    const web3 = new Web3(RPC_URL_FANTOM_MAINNET);

    let minABI = [
      // balanceOf
      {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
      },
      // decimals
      {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
      }
    ];

    try {
      const quote = await axios.get(
        "https://api.1inch.io/v4.0/250/quote?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E&amount=100000000000000000"
      );
      console.log(quote);
      if (quote) {
        const name1 = await quote.data.estimatedGas;
        console.log(await name1);
        setValueQuote(name1);
      }
    } catch (error) { 
      console.log("Quote execution error", error);
    }
    // setValueQuote("test11111111111111");
  }

  return (
    <div className={styles.conversations}>
      <div className={styles.conversationListTop}>
        <input type="search" placeholder="Find or start a conversation" />
      </div>
      <div className={styles.conversationsContainer}>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={25}
              width={25}
              src={friends}
              className={styles.svg}
              alt="friends"
            />
          </div>
          <p>Fiends</p>
        </div>
        <div className={styles.elementsContainer} onClick={() => getrates()}>
          <div className={styles.svgContainer} >
            <Image
              height={25}
              width={25}
              src={nitro}
              className={styles.svg}
              alt="nitro"
            />
          </div>
          <p>Quotes</p>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer} >
            <input
              type='text'
            />
          </div>
          <p>{valueQuote}</p>
        </div>
        <div className={styles.dmTitle}>DIRECT MESSAGES</div>
        {dms.map((dm, index) => (
          <DmCard
            key={index}
            name={dm.name}
            id={dm.id}
            avatar={
              dm.avatar ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OCSMFIW5fZ3vSN6yGpD-w-6SsL2_ZPA_sw&usqp=CAU"
            }
            status="online"
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
