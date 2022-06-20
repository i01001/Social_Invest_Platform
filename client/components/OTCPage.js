import React from "react";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SocialContext } from "../context/context";
import { contractABI, contractAddress } from '../lib/constants';
// import { ethers } from 'ethers';
var Web3 = require("web3");
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
} from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

const OTCPage = () => {
  const [inputRecord, setinputRecord] = useState("");
  const { register, getValues, handleSubmit } = useForm();
  const [quoteMessage, setquoteMessage] = useState({ isHidden: true });
  const [quoteErMessage, setquoteErMessage] = useState({ isHidden: true });
  const [tApprovalMessage, settApprovalMessage] = useState("");
  const [transferMessage, settransferMessage] = useState({ isHidden: true });

  const { roomName, currentAccount, connectWallet } = useContext(SocialContext);

  const [fromTok, setfromTok] = useState();
  const [ToTok, setToTok] = useState();
  const [quantValue, setquantValue] = useState();
  const [name1, setname1] = useState("");
  const [qErrormess, setqErrormess] = useState("");
  const [Entercount, setEntercount] = useState({
    inc: 1,
    count: 1,
  });

  const { modstat, setmodstat } = useContext(SocialContext);


  // const firstUpdate = useRef(true);
  // const styleQ = { visibility: quoteMessage.isHidden ? 'hidden' : 'visible' };

  const styleE = { display: quoteErMessage.isHidden ? "none" : "block" };
  const styleQ = { display: quoteMessage.isHidden ? "none" : "block" };
  const styleT = { display: transferMessage.isHidden ? "none" : "block" };
  
  var web3 = new Web3("https://rpc-mumbai.maticvigil.com");
  var myContract = new web3.eth.Contract(contractABI, contractAddress);

  // 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
  // 0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E
  // 100000000000000000

  const useComponentDidMount = () => {
    const ref = useRef();
    useEffect(() => {
      ref.current = true;
    }, []);
    return ref.current;
  };

  const isComponentMounted = useComponentDidMount();

  useEffect(() => {
    if (isComponentMounted) {
      quoteFunction();
    }
  }, [quantValue, fromTok, ToTok, Entercount]);

  const quoteFunction = async () => {
    const quoteYes = await getValues("Quoteornot");

    console.log(await fromTok, ToTok, quantValue, quoteYes);



    // const getEthereumContract = () => {
    //     const provider = new ethers.providers.Web3Provider(ethereum)
    //     const signer = provider.getSigner()
    //     const OTCContract = new ethers.Contract(
    //       contractAddress,
    //       contractABI,
    //       signer,
    //     )
      
    //     return OTCContract
    //   }




    if (!quoteYes) {
      try {
        const quote = await axios.get(
          `https://api.1inch.io/v4.0/137/quote?fromTokenAddress=${fromTok}&toTokenAddress=${ToTok}&amount=${quantValue}`
        );
        console.log(quote);
        if (quote) {
          setname1(await quote.data.toTokenAmount);
          console.log("NAME1", await name1);

          // setquoteMessage({ isHidden: !quoteMessage.isHidden });
          setquoteMessage({ isHidden: false });
          setquoteErMessage({ isHidden: true });
          settransferMessage({ isHidden: true });
        }
      } catch (error) {
        console.error("Quote execution error", error);
        setquoteErMessage({ isHidden: false });
        setquoteMessage({ isHidden: true });
        settransferMessage({ isHidden: true });
        setqErrormess("Quote execution error");
      }
    } else {
      console.log("Current account", await currentAccount);
      const lowerBaseToken = await fromTok.toLowerCase();
      console.log(await lowerBaseToken);
      if (lowerBaseToken != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        try {
          const approve = await axios.get(
            `h    console.log("data", dataN);
            ttps://api.1inch.io/v4.0/137/approve/transaction?tokenAddress=${ToTok}&amount=${quantValue}`
          );

          const approve_data = approve.data;
          console.log(await approve);
          console.log(await approve_data.data);
          // var receiver = "0x11F43Aa282E4405057e607396Ee00f6B34a05474";
          const data1 = await approve_data.data;
          const value1 = await approve_data.value;
          const gas1 = await approve_data.gas;
          const gasPrice1 = await approve_data.gasPrice;
          const to1 = await approve_data.to;
          console.log(await to1);

          console.log("data1 printed", data1);
          // web3.eth.sendTransaction;
          const txHash = await ethereum.request({
            method: "eth_sendTransaction",

            params: [
              {
                from: currentAccount,
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
            setquoteErMessage({ isHidden: true });
            setquoteMessage({ isHidden: true });
            settransferMessage({ isHidden: false });
            settApprovalMessage("Approval to transfer has been successful");
          } else {
            console.log("Approval Transaction unsuccessful");
            setquoteErMessage({ isHidden: false });
            setquoteMessage({ isHidden: true });
            settransferMessage({ isHidden: true });
            setqErrormess("Approval Transaction unsuccessful");
            return;
          }
          // }
        } catch (error_approval) {
          console.log("Error approval");
          setquoteErMessage({ isHidden: false });
          setquoteMessage({ isHidden: true });
          settransferMessage({ isHidden: true });
          setqErrormess("Error in approval");
          return;
        }
      }
      console.log("POST APPROVAL");
      try {
        const swap_transfer = await axios.get(
          `https://api.1inch.io/v4.0/137/swap?fromTokenAddress=${fromTok}&toTokenAddress=${ToTok}&amount=${quantValue}&fromAddress=${currentAccount}&slippage=0.1&disableEstimate=true`
        );
        console.log(swap_transfer);
        if (swap_transfer.data) {
          swap_data = swap_transfer.data;
          swap_data.tx.gas = 1000000;
          const data2 = await swap_data.data;
          const value2 = await swap_data.value;
          const gas2 = await swap_data.gas;
          const gasPrice2 = await swap_data.gasPrice;
          const to2 = await swap_data.to;
        }
        const txHash2 = await ethereum.request({
          method: "eth_sendTransaction",

          params: [
            {
              from: currentAccount,
              to: to2,
              data: data2,
              value: value2.toString(16),
              gas: gas2,
              gasPrice: gasPrice2,
            },
          ],
        });
        console.log(txHash2);

        if (txHash2) {
          console.log("transfer successful!!!");
          setquoteErMessage({ isHidden: true });
          setquoteMessage({ isHidden: true });
          settransferMessage({ isHidden: false });
          settApprovalMessage("Transfer has been successful!!");
        } else {
          console.log("Transaction unsuccessful");
          setquoteErMessage({ isHidden: false });
          setquoteMessage({ isHidden: true });
          settransferMessage({ isHidden: true });
          setqErrormess("Transaction has been unsuccessful");
          return;
        }
        // }
      } catch (error_transfer) {
        console.error("Error in Transfer");
        setquoteErMessage({ isHidden: false });
        setquoteMessage({ isHidden: true });
        settransferMessage({ isHidden: true });
        setqErrormess("Error in Transfer!");
        return;
      }
    }
  };

  const QuoteorSwap = () => (
    <Switch
      display="inline"
      // isChecked
      mt={20}
      fontWeight="bold"
      backgroundColor="whiteAlpha.500"
      colorScheme="messenger"
      color="facebook.500"
      textAlign="center"
      {...register("Quoteornot")}
      pt={1}
    />
  );

  const FromToken = () => (
    <Input
      size="md"
      mt={15}
      placeholder="FROM TOKEN"
      variant="filled"
      fontWeight="bold"
      textAlign="center"
      fontSize="lg"
      // id="fromTok"
      {...register("FromToken1")}
      color="facebook.500"
    />
  );

  const ToToken = () => (
    <Input
      size="md"
      mt={15}
      placeholder="TO TOKEN"
      variant="filled"
      fontWeight="bold"
      textAlign="center"
      fontSize="lg"
      {...register("ToToken")}
      color="facebook.500"
    />
  );

  const QuantityToken = () => (
    <Input
      size="md"
      mt={15}
      placeholder="TOKEN QUANTITY"
      variant="filled"
      fontWeight="bold"
      textAlign="center"
      fontSize="lg"
      {...register("QuantityToken")}
      color="facebook.500"
    />
  );

  const EnterButton = () => (
    <Button
      variant="solid"
      size="lg"
      mt={15}
      pl={5}
      pr={5}
      fontWeight="bold"
      color="white"
      textAlign="center"
      backgroundColor="whiteAlpha.500"
      border={100}
      borderRadius={20}
      ml={60}
      colorScheme="whiteAlpha"
      rightIcon={<ArrowForwardIcon />}
      letterSpacing="wide"
      fontSize="xl"
      display="inline"
      pb={10}
      pt={3}
      type="submit"
      onClick={() => {
        enterPress();
      }}
    >
      ENTER{" "}
    </Button>
  );

  const enterPress = async () => {
    const ACDMContract = 0xE3cf96b99c06eADC26E92ac3a01dac64E9f5bF68;
    const quantityT = 5000000000000000000000;
    const maticAmount = 10000000000000000;
    console.log("contract", myContract);
    console.log("abi", contractABI);
    console.log("contract address", contractAddress);
    // var dataN = await web3.eth.contract(contractABI).at(contractAddress).createOrder.getData(ACDMContract,quantityT,maticAmount);
    
    // var dataN = await contract(contractABI).at(contractAddress).createOrder.getData(ACDMContract,quantityT,maticAmount);
    // var dataN2 = await myContract.createOrder.getData(ACDMContract,quantityT,maticAmount);
    var data3 = await myContract.methods.createOrder(ACDMContract,quantityT,maticAmount).encodeABI();
    
    // console.log("data", dataN);
    // console.log("data2", dataN2);
    console.log("data3", data3);



    const txHash3 = await ethereum.request({
      method: "eth_sendTransaction",

      params: [
        {
          from: currentAccount,
          to: ACDMContract,
          data: dataN,
          // value: value2.toString(16),
          // gas: gas2,
          // gasPrice: gasPrice2,
        },
      ],
    });
    console.log(await txHash3);

    // setfromTok(getValues("FromToken1"));
    // setToTok(getValues("ToToken"));
    // setquantValue(getValues("QuantityToken"));
    // const inc = 1;
    // setEntercount((prevState) => {
    //   return {
    //     ...prevState,
    //     count: prevState.count + Entercount.inc,
    //   };
    // });
  };

  const exitPress = async () => {
    setmodstat(false)
  }

  const TestingButton = async () => {

  }

  const ExitButton = () => (
    <Button
      variant="solid"
      size="lg"
      mt={15}
      pl={5}
      pr={5}
      fontWeight="bold"
      color="white"
      textAlign="center"
      backgroundColor="whiteAlpha.500"
      border={100}
      borderRadius={20}
      ml={260}
      colorScheme="whiteAlpha"
      letterSpacing="wide"
      fontSize="lg"
      leftIcon={<CloseIcon />}
      display="inline"
      pb={10}
      pt={3}
      onClick={() => {
        exitPress();
      }}
    >
      EXIT
    </Button>
  );

  
  const TestButton = () => (
    <Button
      variant="solid"
      size="lg"
      mt={15}
      pl={5}
      pr={5}
      fontWeight="bold"
      color="white"
      textAlign="center"
      backgroundColor="whiteAlpha.500"
      border={100}
      borderRadius={20}
      ml={260}
      colorScheme="whiteAlpha"
      letterSpacing="wide"
      fontSize="lg"
      leftIcon={<CloseIcon />}
      display="inline"
      pb={10}
      pt={3}
      onClick={() => {
        TestingButton();
      }}
    >
      TestButton
    </Button>
  );

  const QuotesResult = () => (
    <Alert status="info" variant="solid" mt={5}>
      <AlertIcon />
      <AlertTitle mr={1} fontWeight="bold">
        QUOTES:
      </AlertTitle>
      <AlertDescription>
        <AlertTitle
          fontWeight="bold"
          color="red
    
    "
        >
          {" "}
          {name1} TOKENS
        </AlertTitle>
        Conversion of {quantValue} tokens of {fromTok} to {ToTok}{" "}
      </AlertDescription>
    </Alert>
  );

  const QuotesError = () => (
    <Alert status="error" variant="solid" mt={5}>
      <AlertIcon />
      <AlertTitle mr={1} fontWeight="bold">
        ERROR:{" "}
      </AlertTitle>
      <AlertDescription>
        Request is having an issue: {qErrormess}
      </AlertDescription>
    </Alert>
  );

  const TransferSuccess = () => (
    <Alert status="success" variant="solid" mt={5}>
      <AlertIcon />
      <AlertTitle mr={1} fontWeight="bold">
        TRANSFER:
      </AlertTitle>
      <AlertDescription>{tApprovalMessage}</AlertDescription>
    </Alert>
  );

  return (
    <ChakraProvider resetCSS>
      <br></br>
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
      >
        OTC Trading - Direct Peer to Peer
      </Text>
      <QuoteorSwap />
      <Text
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
      </Text>
      <form
        onSubmit={handleSubmit((inputRecord) =>
          setinputRecord(JSON.stringify(inputRecord))
        )}
      >
        <FromToken />
        <ToToken />
        <QuantityToken />
        <ExitButton />
        <TestButton />
        <EnterButton />
        <div style={styleQ}>
          <QuotesResult />
        </div>
        <div style={styleT}>
          <TransferSuccess />
        </div>
        <div style={styleE}>
          <QuotesError />
        </div>
      </form>
    </ChakraProvider>
  );
};

export default OTCPage;
