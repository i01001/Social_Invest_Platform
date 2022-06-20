import React from "react";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SocialContext } from "../context/context";
const Web3 = require("web3");
const axios = require("axios");
import { ethers } from 'ethers';
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

const NewPage = () => {
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
            `https://api.1inch.io/v4.0/137/approve/transaction?tokenAddress=${ToTok}&amount=${quantValue}`
          );

          const approve_data = approve.data;
          console.log("APPROVE PRINT", await approve);
          console.log("APRROVE DATA PRINT", await approve_data.data);
          const data1 = await approve_data.data;
          const value1 = await approve_data.value;
          const gas1 = await approve_data.gas;
          const gasPrice1 = await approve_data.gasPrice;
          const to1 = await approve_data.to;
          console.log("TO TOKEN", await to1);

          const gas2= 1000000;

          console.log("data1 printed", data1);
          console.log("current printed", currentAccount);
          console.log("value printed", value1);

          // web3.eth.sendTransaction;
          const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [
              {
                from: currentAccount,
                to: fromTok,
                data: data1,
                // value: '0',
                // value: value1.toString(16),
                // gas: gas2.toString(16),
                // gasPrice: gasPrice1,
              },
            ],
          });
          console.log("TX hash approval", txHash);

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
        const swapA = await swap_transfer.data;
        const swapB = await swapA.data;
        const swapC = await swapA.tx;
        const swapCdata = await swapC.data;
        const swapCto = await swapC.to;
        const swapCval = await swapC.value;
        const swapCval_hex = await ethers.utils.hexlify(swapCval);
        const swapCval_hex2 = await swapCval.toString(16);
          console.log("SWAP a", await swapA);
          console.log("SWAP data", await swapB);
          console.log("swap transfer", await swap_transfer);
          console.log("swap C", await swapC);
          console.log("swapCdata", await swapCdata);
          console.log("swapcto", await swapCto);
          console.log("swapCval", await swapCval);
          console.log("swapC val to hex", await swapCval)
          console.log("swapC val to hex", await swapCval_hex)
          console.log("swapC val to hex", await swapCval_hex2)


        // if (await swap_transfer.data) {
          // const swapA = await swap_transfer.data;
          // const swapB = await swapA.data;
          // const swapC = await swapA.tx;
          // const swapCdata = await swapC.data;
          // const swapCto = await swapC.to;
          // const swapCval = await swapC.value;
          // const swapCdata_hex = await swapC.data_hex;
        // }
console.log("TEST");

if (lowerBaseToken != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        const txHash2 = await ethereum.request({
          method: "eth_sendTransaction",

          params: [
            {
              from: currentAccount,
              to: swapCto,
              data: swapCdata,
              // value: swapCval.toString(16),
              // gas: gas2,
              // gasPrice: gasPrice2,
            },
          ],
        });
      }
      else {
        const txHash2 = await ethereum.request({
          method: "eth_sendTransaction",

          params: [
            {
              from: currentAccount,
              to: swapCto,
              data: swapCdata,
              value: swapCval_hex,
              // gas: gas2,
              // gasPrice: gasPrice2,
            },
          ],
        });
      }
        console.log("TX transfer hash", txHash2);

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
    setfromTok(getValues("FromToken1"));
    setToTok(getValues("ToToken"));
    setquantValue(getValues("QuantityToken"));
    const inc = 1;
    setEntercount((prevState) => {
      return {
        ...prevState,
        count: prevState.count + Entercount.inc,
      };
    });
  };

  const exitPress = async () => {
    setmodstat(false)
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
        QUOTES
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

export default NewPage;
