import styles from "../styles/conversationList.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import friends from "../assets/icons/friends.svg";
import exchange from "../assets/icons/exchange.jpg";
import DmCard from "./DmCard";
const Web3 = require("web3");
const axios = require("axios");
// require("dotenv").config();
import DailyIframe from "@daily-co/daily-js";
// let callFrame = DailyIframe.wrap(MY_IFRAME);
import { css } from "@emotion/react";
import Modal from "react-modal";
import { MoonLoader } from "react-spinners";
import React from "react";
import { useForm } from "react-hook-form";
import NewPage from "./NewPage";
import OTCPage from "./OTCPage";
import { useContext } from 'react'
import { SocialContext } from '../context/context'
import Iframe from 'react-iframe'
import {
  ChakraProvider,
  Switch,
  Text,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

Modal.setAppElement("#__next");

const styleA = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
};

const style = {
  wrapper: `text-white h-96 w-72 flex flex-col justify-center items-center`,
  title: `font-semibold text-xl mb-12`,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0a0b0d",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const ConversationList = () => {
  const [valueQuote, setValueQuote] = useState([]);
  const [dms, setDms] = useState([]);
  const [stateN, setstateN] = useState([]);
  const [TradePop, setTradePop] = useState({ isHidden: true });
  const [VideoPop, setVideoPop] = useState({ isHidden: true });
  const [OTCPop, setOTCPop] = useState({ isHidden: true });
  const [modVstat, setmodVstat] = useState(false);

   


  // const [modstat, setmodstat] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { modstat, setmodstat, currentAccount, modOTC, setmodOTC } = useContext(SocialContext);



  const styleV = { display: VideoPop.isHidden ? "none" : "block" };
  const styleTrade = { display: TradePop.isHidden ? "none" : "block" };
  const styleOTC = { display: OTCPop.isHidden ? "none" : "block" };


  const onSubmit = (data) => console.log(data);
  console.log(errors);


  useEffect(() => {
    conversationEffect();
  }, []);

  const conversationEffect = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getdms`);
      const data2 = await response.json();
      setDms(data2);
    } catch (error) {
      console.error(error);
    }
  };

  const getrates = async () => {

    let minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
      // decimals
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function",
      },
    ];

    try {
      const quote = await axios.get(
        "https://api.1inch.io/v4.0/250/quote?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E&amount=100000000000000000"
      );
      console.log(quote);
      if (quote) {
        const name1 = await quote.data.toTokenAmount;
        console.log(await name1);
        setValueQuote(name1);
      }
    } catch (error) {
      console.log("Quote execution error", error);
    }
  };

  const getapproval = async () => {
    const walletAdd1 = 0xaf87b6479f9ca8d3bae56dead220bce44a709549;
    try {
      const approve = await axios.get(
        "https://api.1inch.io/v4.0/250/approve/transaction?tokenAddress=0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E&amount=100000000000000000"
      );

      const approve_data = approve.data;
      console.log(await approve_data.data);
      // console.log(approve);
      // if (approve.data) {
      // approve_data = approve.data;
      // approve_data.gas = 1000000;
      // approve_data.from = walletAdd1;
      // txHash = await web3.eth.sendTransaction(approve_data);
      var receiver = "0x11F43Aa282E4405057e607396Ee00f6B34a05474";
      // var sender = web3.eth.accounts[0];
      // console.log(sender);
      const data1 = await approve_data.data;
      const value1 = await approve_data.value;
      const gas1 = await approve_data.gas;
      const gasPrice1 = await approve_data.gasPrice;
      const to1 = await approve_data.to;

      console.log("data1 printed", data1);
      // web3.eth.sendTransaction;
      const txHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: "0xaF87B6479f9CA8D3BAE56deAd220bcE44a709549",
            to: to1,
            data: data1,
            value: value1.toString(16),
            gas: gas1,
            gasPrice: gasPrice1,
          },
        ],
      });
      console.log(txHash);

      if (txHash) {
        console.log("approval for DAI successful");
        setValueQuote(txHash);
      } else {
        console.log("Approval Transaction unsuccessful");
      }
      // }
    } catch (error_approval) {
      console.log("Error approval");
    }
  };

  const popQuote = async () => {
    if (!currentAccount) return;
    // <div className={styles.popListTop}>
    // setstateN("asakkas");
    // setVideoPop({ isHidden: true });
    setmodstat(true);
    // setVideoPop({ isHidden: true });
    setTradePop({ isHidden: false });
    setOTCPop({ isHidden: true });


  };

  const popOTC = async () => {
    if (!currentAccount) return;
    // setVideoPop({ isHidden: true });
    setmodstat(false);
    setmodOTC(true);
    setTradePop({ isHidden: true });
    setOTCPop({ isHidden: false });
  }

  const popVideo = async () => {
    if (!currentAccount) return;

    setmodVstat(true);
    setVideoPop({ isHidden: false });
    // setTradePop({ isHidden: true });
    // setOTCPop({ isHidden: true });
  } 

  const closeVideo = async () => {
    setVideoPop({ isHidden: true });
    setmodVstat(false);
    console.log("CLOSSSSSSSSSSSSSSSSSSSSSSING")
  }

  return (
    <div className={styles.conversations}>
      <div className={styles.conversationListTop}>
        <input type="search" placeholder="Find or start a conversation" />
      </div>
      <div className={styles.conversationsContainer}>
        <div className={styles.elementsContainer} onClick={() => popVideo()}>
          <div className={styles.svgContainer}>
            <Image
              height={35}
              width={35}
              src={friends}
              className={styles.svg}
              alt="friends"
            />
          </div>
          <p>CONFERENCE CALL</p>
        </div>
        <div className={styles.elementsContainer} onClick={() => popQuote()}>
          <div className={styles.svgContainer}>
            <Image
              height={35}
              width={35}
              src={exchange}
              className={styles.svg}
              alt="exchange"
            />
          </div>
          <p>POLYGON NETWORK TOKENS TRADING</p>
        </div>
        {/* <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <input type="text" />
          </div>
          <p>{valueQuote}</p>
        </div> */}
          <div className={styles.elementsContainer} onClick={() => popOTC()}>
          <div className={styles.svgContainer}>
            <Image
              height={35}
              width={35}
              src={exchange}
              className={styles.svg}
              alt="exchange"
            />
          </div>
          <p>OTC TRADING</p>
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
      <div className={styleA.wrapper}>
        <Modal isOpen={modstat} style={customStyles}>
          {/* <div className={style.wrapper}> */}
            <div style={styleTrade}>
            <NewPage />
            </div>

      {/* </div> */}
      {/* <div className={style.title}>Transaction in progress...</div>
          <MoonLoader
            color={"#fff"}
            loading={true}
            css={cssOverride}
            size={50}
          /> */}

                 </Modal>
                  <Modal isOpen={modVstat} style={customStyles}>

                    <div className={styles.elementsContainer} onClick={() => closeVideo()}>
               <div style={styleV}>
        <Iframe url="https://web3-video-call.herokuapp.com/a776638c-b7a1-4018-a9bd-8c9e462b1cdd"
        width="1400px"
        height="800px"
        id="myId"
        className="myClassname"
        display="initial"
        allow="camera; microphone"
        position="relative"/>
    <Button
      variant="solid"
      size="lg"
      mt={15}
      pl={10}
      pr={10}
      fontWeight="bold"
      color="white"
      textAlign="center"
      backgroundColor="black"
      border={50}
      borderRadius={10}
      ml={30}
      mb={30} 
      colorScheme="whiteAlpha"
      letterSpacing="wide"
      fontSize="lg"
      leftIcon={<CloseIcon />}
      display="inline"
      pb={10}
      pt={3}
      onClick={() => {
        closeVideo();
      }}
    >
      EXIT
    </Button>


      </div>
      </div>
        </Modal>
        <Modal isOpen={modOTC} style={customStyles}>

<div className={styles.elementsContainerOTC}>
<div style={styleOTC}>
              <OTCPage />
            </div>
            {/* <div style={styleV}>
<Iframe url="https://web3-video-call.herokuapp.com/a776638c-b7a1-4018-a9bd-8c9e462b1cdd"
width="1400px"
height="900px"
id="myId"
className="myClassname"
display="initial"
allow="camera; microphone"
position="relative"/>
</div> */}
</div>
</Modal>
        
    </div>
  </div>
    //           <div className={styles.popListTop}>
    //                     <div className={styles.elementsContainer} onClick={() => popQuote()}>

    //           <p>{stateN}</p>
    // </div>
    //         </div>
  );
};

export default ConversationList;
