import React, { Component } from 'react';
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import DataRender from "./DataRender";
require('react-json-pretty/themes/monikai.css');
import 'react-json-pretty/themes/monikai.css';
import { SocialContext } from "../context/context";
import {
  contractStandardABI,
  contractABI,
  contractAddress,
} from "../lib/constants";
// import { ethers } from 'ethers';
var Web3 = require("web3");
const Web3Utils = require("web3-utils");
const axios = require("axios");
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
  Divider,
  Textarea,
  resize,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
var JSONPrettyMon = require('react-json-pretty/dist/monikai');

const OTCPage = () => {
  const [inputRecord, setinputRecord] = useState("");
  const { register, getValues, handleSubmit } = useForm();
  const [transferError, settransferError] = useState({ isHidden: true });
  const [transferSuccess, settransferSuccess] = useState({ isHidden: true });
  const [errorMessage, seterrorMessage] = useState("");
  const [transferMessage, settransferMessage] = useState("");
  const [listingData, setlistingData] = useState("");
  const [Mapping, setMapping] = useState([]);

  
  const { roomName, currentAccount, connectWallet, dataAllList, setdataAllList } = useContext(SocialContext);

  const [LtokenAddress, setLtokenAddress] = useState();
  const [LTokenQuant, setLTokenQuant] = useState();
  const [LMaticAmt, setLMaticAmt] = useState();
  const [BbuyOrder, setBbuyOrder] = useState();
  const [CListOrderNo, setCListOrderNo] = useState();

  const { modstat, setmodstat, modOTC, setmodOTC } = useContext(SocialContext);

  const styleE = { display: transferError.isHidden ? "none" : "block" };
  const styleT = { display: transferSuccess.isHidden ? "none" : "block" };

  const [LEntercount, setLEntercount] = useState({
    inc: 1,
    count: 1,
  });

  const [BEntercount, setBEntercount] = useState({
    inc: 1,
    count: 1,
  });

  const [CEntercount, setCEntercount] = useState({
    inc: 1,
    count: 1,
  });

  var web3 = new Web3("https://rpc-mumbai.maticvigil.com");
  var myContract = new web3.eth.Contract(contractABI, contractAddress);

  const LuseComponentDidMount = () => {
    const ref = useRef();
    useEffect(() => {
      ref.current = true;
    }, []);
    return ref.current;
  };

  const LisComponentMounted = LuseComponentDidMount();

  useEffect(() => {
    if (LisComponentMounted) {
      settransferError({ isHidden: true });
      settransferSuccess({ isHidden: true });
      createListing();
    }
  }, [LtokenAddress, LTokenQuant, LMaticAmt, LEntercount]);

  const BuseComponentDidMount = () => {
    const ref = useRef();
    useEffect(() => {
      ref.current = true;
    }, []);
    return ref.current;
  };

  const BisComponentMounted = BuseComponentDidMount();

  useEffect(() => {
    if (BisComponentMounted) {
      settransferError({ isHidden: true });
      settransferSuccess({ isHidden: true });
      buyorder();
    }
  }, [BbuyOrder, BEntercount]);

  const CuseComponentDidMount = () => {
    const ref = useRef();
    useEffect(() => {
      ref.current = true;
    }, []);
    return ref.current;
  };

  const CisComponentMounted = CuseComponentDidMount();

  useEffect(() => {
    if (CisComponentMounted) {
      settransferError({ isHidden: true });
      settransferSuccess({ isHidden: true });
      cancelOrder();
    }
  }, [CListOrderNo, CEntercount]);

  // useEffect(() => {
  //   enterPressOTC()
  // }, []);
  

  const ListContractAddress = () => (
    <Input
      size="md"
      display="inline"
      mt={15}
      ml={30}
      placeholder="TOKEN CONTRACT ADDRESS"
      variant="filled"
      fontWeight="bold"
      textAlign="center"
      width={500}
      fontSize="lg"
      {...register("listContract")}
      color="facebook.500"
    />
  );

  const LTokenQuantity = () => (
    <Input
      size="md"
      display="inline"
      mt={15}
      ml={6}
      placeholder="TOKEN QUANTITY"
      variant="filled"
      fontWeight="bold"
      textAlign="center"
      width={500}
      fontSize="lg"
      {...register("tokenQuant")}
      color="facebook.500"
    />
  );

  const LMaticAmount = () => (
    <Input
      size="md"
      mt={15}
      display="inline"
      ml={6}
      placeholder="MATIC AMOUNT"
      variant="filled"
      fontWeight="bold"
      textAlign="center"
      fontSize="lg"
      width={500}
      {...register("lMatAmount")}
      color="facebook.500"
    />
  );

  const LEnterButton = () => (
    <Button
      variant="solid"
      size="lg"
      mt={1}
      // pl={5}
      // pr={5}
      display="inline"
      fontWeight="bold"
      color="white"
      textAlign="center"
      backgroundColor="whiteAlpha.500"
      border={100}
      borderRadius={20}
      ml={6}
      colorScheme="whiteAlpha"
      rightIcon={<ArrowForwardIcon />}
      letterSpacing="wide"
      fontSize="xl"
      // pb={10}
      // pt={3}
      type="submit"
      onClick={() => {
        Lenterfunc();
      }}
    >
      ENTER{" "}
    </Button>
  );

  const DividerN = () => (
    <Divider
      borderColor="purple.500"
      mt={5}
      width={1750}
      ml={3}
      fontWeight="bold"
      border={6}
      borderRadius={10}
      backgroundColor="messenger.500"
      color="messenger.500"
    />
  );

  const BuyOrderNumber = () => (
    <Input
      size="md"
      display="inline"
      mt={15}
      ml={350}
      placeholder="BUY LISTING NUMBER"
      variant="filled"
      fontWeight="bold"
      textAlign="center"
      width={500}
      fontSize="lg"
      // id="fromTok"
      {...register("buyOrdern")}
      color="facebook.500"
    />
  );

  const BEnterButton = () => (
    <Button
      variant="solid"
      size="lg"
      mt={1}
      // pl={5}
      // pr={5}
      display="inline"
      fontWeight="bold"
      color="white"
      textAlign="center"
      backgroundColor="whiteAlpha.500"
      border={100}
      borderRadius={20}
      ml={100}
      colorScheme="whiteAlpha"
      rightIcon={<ArrowForwardIcon />}
      letterSpacing="wide"
      fontSize="xl"
      // pb={10}
      // pt={3}
      type="submit"
      onClick={() => {
        Benterfunc();
      }}
    >
      ENTER{" "}
    </Button>
  );

  const CanOrderNumber = () => (
    <Input
      size="md"
      display="inline"
      mt={15}
      ml={350}
      placeholder="CANCEL LISTING NUMBER"
      variant="filled"
      fontWeight="bold"
      textAlign="center"
      width={500}
      fontSize="lg"
      // id="fromTok"
      {...register("cOrderNo")}
      color="facebook.500"
    />
  );

  const CEnterButton = () => (
    <Button
      variant="solid"
      size="lg"
      mt={1}
      // pl={5}
      // pr={5}
      display="inline"
      fontWeight="bold"
      color="white"
      textAlign="center"
      backgroundColor="whiteAlpha.500"
      border={100}
      borderRadius={20}
      ml={100}
      colorScheme="whiteAlpha"
      rightIcon={<ArrowForwardIcon />}
      letterSpacing="wide"
      fontSize="xl"
      // pb={10}
      // pt={3}
      type="submit"
      onClick={() => {
        Centerfunc();
      }}
    >
      ENTER{" "}
    </Button>
  );

  const AllListing = () => (
    <Textarea
    isReadOnly 
    mt={30}
    color="black"
    fontStyle="italic" 
    lineHeight={8}
    placeholder={dataAllList} 
    resize={resize}
    height={800}
    letterSpacing="wide"
    />
  );

  const Centerfunc = async () => {
    setCListOrderNo(getValues("cOrderNo"));
    const inc = 1;
    settransferError({ isHidden: true });
    settransferSuccess({ isHidden: true });
    setCEntercount((prevState) => {
      return {
        ...prevState,
        count: prevState.count + CEntercount.inc,
      };
    });
  };

  const cancelOrder = async () => {
    try {
      var datacancel = await myContract.methods
        .cancelOrder(CListOrderNo)
        .encodeABI();
      console.log("datacancel", datacancel);

      const txcancelList = await ethereum.request({
        method: "eth_sendTransaction",

        params: [
          {
            from: currentAccount,
            to: contractAddress,
            data: datacancel,
          },
        ],
      });
      console.log(await txcancelList);

      if (txcancelList) {
        settransferError({ isHidden: true });
        settransferSuccess({ isHidden: false });
        settransferMessage(`Transfer has been successful
      https://polygonscan.com/tx/${txcancelList}`);
      } else {
        settransferError({ isHidden: false });
        settransferSuccess({ isHidden: true });
        seterrorMessage("Transaction has been unsuccessful");
        return;
      }
    } catch (error_transfer) {
      settransferError({ isHidden: false });
      settransferSuccess({ isHidden: true });
      seterrorMessage("Transaction has an error");
      return;
    }
  };

  const Benterfunc = async () => {
    setBbuyOrder(getValues("buyOrdern"));
    settransferError({ isHidden: true });
    settransferSuccess({ isHidden: true });
    const inc = 1;
    setBEntercount((prevState) => {
      return {
        ...prevState,
        count: prevState.count + BEntercount.inc,
      };
    });
  };

  const buyorder = async () => {
    await BbuyOrder;
    // await new Promise(r => setTimeout(r, 2000));

    console.log(await BbuyOrder);
    // var counterOrder = await myContract.methods.orderNumber().call();
    // console.log(counterOrder);

    try {
      var ordersObject = await myContract.methods.Orders(BbuyOrder).call();
      var maticAmountforOrder = await ordersObject.maticAmount;
      const matic_hex = Web3Utils.toHex(await maticAmountforOrder);

      console.log(ordersObject);
      console.log(maticAmountforOrder);
      console.log(matic_hex);

      var databuy = await myContract.methods.redeemOrder(BbuyOrder).encodeABI();
      console.log("databuy", databuy);

      const txBuy = await ethereum.request({
        method: "eth_sendTransaction",

        params: [
          {
            from: currentAccount,
            to: contractAddress,
            data: databuy,
            value: matic_hex,
          },
        ],
      });
      console.log(await txBuy);

      if (txBuy) {
        settransferError({ isHidden: true });
        settransferSuccess({ isHidden: false });
        settransferMessage(`Transfer has been successful
      https://polygonscan.com/tx/${txBuy}`);
      } else {
        settransferError({ isHidden: false });
        settransferSuccess({ isHidden: true });
        seterrorMessage("Transaction has been unsuccessful");
        return;
      }
    } catch (error_transfer) {
      settransferError({ isHidden: false });
      settransferSuccess({ isHidden: true });
      seterrorMessage("Transaction has an error");
      return;
    }
  };

  const enterPressOTC = async () => {
    settransferError({ isHidden: true });
    settransferSuccess({ isHidden: true });
    var counterOrder = await myContract.methods.orderNumber().call();
    console.log(counterOrder);

    const ordersObjectList = [];
    for (const i = 0; i < counterOrder; i++) {
      ordersObjectList[i] = await myContract.methods.Orders(i).call();
      // console.log(ordersObjectList[i]._orderNumber);
      // console.log(ordersObjectList[i].seller);
      // console.log(ordersObjectList[i].tokenQuantity);
      // console.log(ordersObjectList[i].tokenContract);
      // console.log(ordersObjectList[i].maticAmount);
    }
    console.log(ordersObjectList);
    const jsonAllData = await JSON.stringify(ordersObjectList);
    console.log("JSON data going", await jsonAllData);
    await jsonAllData;
    console.log("order Objects orig", ordersObjectList);
    console.log("order Objects mod", jsonAllData);
    console.log('dataAlllist being updated', await dataAllList);
    setdataAllList(await jsonAllData);
    // setMapping(jsonAllData);
    // TestMapping();


    web3.eth.getChainId().then(console.log);
  };

  const Lenterfunc = async () => {
    setLtokenAddress(getValues("listContract"));
    setLTokenQuant(getValues("tokenQuant"));
    setLMaticAmt(getValues("lMatAmount"));
    settransferError({ isHidden: true });
    settransferSuccess({ isHidden: true });
    const inc = 1;
    setLEntercount((prevState) => {
      return {
        ...prevState,
        count: prevState.count + LEntercount.inc,
      };
    });
  };

  const createListing = async () => {
    console.log(await LtokenAddress);
    console.log(await LTokenQuant);
    console.log(await LMaticAmt);

    // const TokenCont = "0x71b602688e7341eC30032327ACECE64342a17621";
    // const quantityT = 3000000000000000;
    // const maticAmount = 100000000000000;

    try {
      var tokenContractDep = new web3.eth.Contract(
        contractStandardABI,
        LtokenAddress
      );

      var dataApprove = await tokenContractDep.methods
        .approve(contractAddress, LTokenQuant)
        .encodeABI();
      console.log("dataApprove", dataApprove);

      const txHashApprove = await ethereum.request({
        method: "eth_sendTransaction",

        params: [
          {
            from: currentAccount,
            to: LtokenAddress,
            data: dataApprove,
          },
        ],
      });
      console.log("txhash approval", await txHashApprove);

      if (txHashApprove) {
        settransferError({ isHidden: true });
        settransferSuccess({ isHidden: false });
        settransferMessage(`Approval to transfer has been successful"
    https://polygonscan.com/tx/${txHashApprove}`);
      } else {
        settransferError({ isHidden: false });
        settransferSuccess({ isHidden: true });
        seterrorMessage("Approval Transaction unsuccessful");
        return;
      }
    } catch (error_approval) {
      settransferError({ isHidden: false });
      settransferSuccess({ isHidden: true });
      seterrorMessage("Error in approval");
      return;
    }
    var receiptApprove = await web3.eth
      .getTransactionReceipt(
        "0x6b5dce363433b7a0f860fa2fc15bde461e568047838607446600c893fd9ef622"
      )
      .then(console.log);
    // while (receiptApprove == null){
    // receiptApprove = await web3.eth.getTransactionReceipt(txHashApprove)
    // .then(console.log);
    //   await new Promise(r => setTimeout(r, 2000));
    //   console.log("waiting");
    // }

    const i = 0;
    while (i < 10) {
      await new Promise((r) => setTimeout(r, 2000));
      console.log("count of i", i);
      i++;
    }

    try {
      var data3 = await myContract.methods
        .createOrder(LtokenAddress, LTokenQuant, LMaticAmt)
        .encodeABI();

      console.log("data3", data3);

      const txHash3 = await ethereum.request({
        method: "eth_sendTransaction",

        params: [
          {
            from: currentAccount,
            to: contractAddress,
            data: data3,
          },
        ],
      });
      console.log(await txHash3);

      if (txHash3) {
        settransferError({ isHidden: true });
        settransferSuccess({ isHidden: false });
        settransferMessage(`Transfer has been successful
    https://polygonscan.com/tx/${txHash3}`);
      } else {
        settransferError({ isHidden: false });
        settransferSuccess({ isHidden: true });
        seterrorMessage("Transaction has been unsuccessful");
        return;
      }
    } catch (error_transfer) {
      settransferError({ isHidden: false });
      settransferSuccess({ isHidden: true });
      seterrorMessage("Transaction has an error");
      return;
    }
  };

  const exitPress = async () => {
    setmodOTC(false);
  };

  const TestMapping = () => {
    <div>
      {/* {Rchannels.map((roomId, roomName) => ( */}
      {jsonAllData.map(({ _orderNumber, seller }) => (
      <Text
        display="inline"
        ml={240}
        fontWeight="bold"
        textAlign="center"
        border={30}
        borderRadius={20}
        pl={10}
        pr={10}
        pt={2}
        pb={2}
        opacity={1}
        mr={10}
        mt={20}
        // backgroundColor="whiteAlpha.500"
        boxShadow={10}
        fontSize="2xl"
        color="facebook.500"
      // >key={roomId}
      // {roomName}
        /* [{indi._orderNumber} {indi[{index}].seller}] */
        key={_orderNumber}>NEW COFF type {seller} in a {_orderNumber} size

      </Text>
      ))}
    </div>
  }


  const AlllistingButton = () => (
    <Button
      variant="solid"
      size="lg"
      // mt={40}
      pl={5}
      pr={5}
      fontWeight="bold"
      color="white"
      textAlign="center"
      backgroundColor="whiteAlpha.500"
      border={100}
      borderRadius={20}
      ml={10}
      colorScheme="whiteAlpha"
      letterSpacing="wide"
      fontSize="lg"
      rightIcon={<ArrowForwardIcon />}
      display="inline"
      pb={10}
      pt={3}
      onClick={() => {
        enterPressOTC();
      }}
    >
      ALL LISTINGS
    </Button>
  );



  const ExitButton = () => (
    <Button
      variant="solid"
      size="lg"
      // mt={40}
      display="inline"
      pl={5}
      pr={5}
      fontWeight="bold"
      color="white"
      textAlign="center"
      backgroundColor="whiteAlpha.500"
      border={100}
      borderRadius={20}
      ml={50}
      colorScheme="whiteAlpha"
      letterSpacing="wide"
      fontSize="lg"
      leftIcon={<CloseIcon />}
      pb={10}
      pt={3}
      onClick={() => {
        exitPress();
      }}
    >
      EXIT
    </Button>
  );

  const TransferErrorDiv = () => (
    <Alert status="error" variant="solid" mt={5}>
      <AlertIcon />
      <AlertTitle mr={1} fontWeight="bold">
        ERROR:{" "}
      </AlertTitle>
      <AlertDescription>
        Request is having an issue: {errorMessage}
      </AlertDescription>
    </Alert>
  );

  const TransferSuccessDiv = () => (
    <Alert status="success" variant="solid" mt={5}>
      <AlertIcon />
      <AlertTitle mr={1} fontWeight="bold">
        TRANSFER:
      </AlertTitle>
      <AlertDescription>{transferMessage}</AlertDescription>
    </Alert>
  );

  return (
    <div>
    <ChakraProvider resetCSS>
      <br></br>
      <Text
        display="inline"
        // ml={240}
        fontWeight="bold"
        textAlign="center"
        border={30}
        borderRadius={20}
        pl={10}
        pr={10}
        pt={2}
        pb={2}
        opacity={1}
        mr={10}
        mt={20}
        // backgroundColor="whiteAlpha.500"
        boxShadow={10}
        fontSize="2xl"
        color="white"
      >
        OTC TRADING - PEER TO PEER - ANY POLYGON TOKENS TO MATIC
      </Text>
      <Text
        // display="inline"
        // ml={240}
        fontWeight="bold"
        textAlign="center"
        border={30}
        borderRadius={20}
        pl={10}
        pr={10}
        pt={2}
        pb={2}
        opacity={1}
        mr={10}
        // mt={20}
        // backgroundColor="whiteAlpha.500"
        boxShadow={10}
        fontSize="2xl"
        color="facebook.500"
      >
        CREATE SELLING LISTING
      </Text>
      {/* <QuoteorSwap /> */}
      {/* <Text
        display="inline"
        ml={8}
        fontWeight="bold"
        textAlign="center"
        border={100}
        borderRadius={20}
        pl={10}
        pr={10}
        pt={2}
        pb={2}
        // backgroundColor="whiteAlpha.500"
        mt={20}
        mr={10}
        fontSize="2xl"
        color="facebook.500"
      >
        SWAP TOKENS
      </Text> */}
      <form
        onSubmit={handleSubmit((inputRecord) =>
          setinputRecord(JSON.stringify(inputRecord))
        )}
      >
        <ListContractAddress />
        <LTokenQuantity />
        <LMaticAmount />
        <LEnterButton />
        <DividerN />
        <br></br>
        <Text
          // display="inline"
          // ml={240}
          fontWeight="bold"
          textAlign="center"
          border={30}
          borderRadius={20}
          pl={10}
          pr={10}
          pt={2}
          pb={2}
          opacity={1}
          mr={10}
          // mt={20}
          // backgroundColor="whiteAlpha.500"
          boxShadow={10}
          fontSize="2xl"
          color="facebook.500"
        >
          BUY LISTING
        </Text>
        <BuyOrderNumber />
        <BEnterButton />
        <DividerN />
        <br></br>
        <Text
          // display="inline"
          // ml={240}
          fontWeight="bold"
          textAlign="center"
          border={30}
          borderRadius={20}
          pl={10}
          pr={10}
          pt={2}
          pb={2}
          opacity={1}
          mr={10}
          // mt={20}
          // backgroundColor="whiteAlpha.500"
          boxShadow={10}
          fontSize="2xl"
          color="facebook.500"
        >
          CANCEL LISTING
        </Text>
        <CanOrderNumber />
        <CEnterButton />
        <DividerN />
        <br></br>
        <div style={styleT}>
          <TransferSuccessDiv />
        </div>
        <div style={styleE}>
          <TransferErrorDiv />
        </div>
        <ExitButton />
        <Text
          // display="inline"
          ml={600}
          fontWeight="bold"
          textAlign="center"
          border={30}
          borderRadius={20}
          pl={10}
          pr={10}
          pt={2}
          pb={2}
          display="inline"
          opacity={1}
          mr={30}
          // mt={20}
          // backgroundColor="whiteAlpha.500"
          boxShadow={10}
          fontSize="2xl"
          color="facebook.500"
        >
          ALL LISTING
          {/* <br></br> */}
          {" "}
        </Text>
        <AlllistingButton />
        {/* <TestMapping /> */}
        {/* <DataRender /> */}
       



      </form>
      <div width={600}> 
      {/* <pre>{JSON.stringify(dataAllList, null, 2)}</pre> */}
      {/* <JSONPretty data={dataAllList} theme={JSONPrettyMon}></JSONPretty> */}
          </div>
      <AllListing />
    </ChakraProvider>
    {/* <pre>{dataAllList}</pre> */}
    </div>
    
    // <div>
    //             {jsonAllData.map((user, index) => (
    //         <p>{user.seller}</p>
    //       ))}
    // </div>
  );
};

export default OTCPage;
