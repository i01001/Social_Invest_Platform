import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
const Web3 = require("web3");
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
  AlertDescription
} from '@chakra-ui/react'
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons'

const NewPage = () => {
  const [inputRecord, setinputRecord] = useState('');
  const { register, getValues, handleSubmit } = useForm();
  const [quoteMessage, setquoteMessage] = useState({ isHidden: true });
  const [quoteErMessage, setquoteErMessage] = useState({ isHidden: true });
  const [transferMessage, settransferMessage] = useState({ isHidden: true });


  const [fromTok, setfromTok] = useState();
  const [ToTok, setToTok] = useState();
  const [quantValue, setquantValue] = useState();
  const [name1, setname1] = useState('');
  const [qErrormess, setqErrormess] = useState('');
  // const firstUpdate = useRef(true);

  // const styleQ = { visibility: quoteMessage.isHidden ? 'hidden' : 'visible' };
  const styleE = { display: quoteErMessage.isHidden ? 'none' : 'block' };
  const styleQ = { display: quoteMessage.isHidden ? 'none' : 'block' };
  const styleT = { display: transferMessage.isHidden ? 'none' : 'block' };


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
  if(isComponentMounted) {    
  quoteFunction();
}}, [quantValue, fromTok, ToTok]);

const quoteFunction = async () => {
const quoteYes = await getValues("Quoteornot");      
   
console.log(await fromTok, ToTok, quantValue, quoteYes);

if(!quoteYes){
try {
  const quote = await axios.get(
    `https://api.1inch.io/v4.0/250/quote?fromTokenAddress=${fromTok}&toTokenAddress=${ToTok}&amount=${quantValue}`
  );
  console.log(quote);
  if (quote) {
    setname1(await quote.data.toTokenAmount);
    console.log("NAME1", await name1);

    // setquoteMessage({ isHidden: !quoteMessage.isHidden });
    setquoteMessage({ isHidden:false});
    setquoteErMessage({ isHidden:true});
    settransferMessage({ isHidden:true});

  }
} catch (error) { 
  console.error("Quote execution error", error);
  setquoteErMessage({ isHidden:false});
  setquoteMessage({ isHidden:true});
  settransferMessage({ isHidden:true});
  setqErrormess("Quote execution error");
}
}
else{
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
}
}

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
)

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
)

// console.log(temp);

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
)

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
)

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
    ENTER{' '}
  </Button>
)

const enterPress = async () => {
  setfromTok(getValues("FromToken1"));     
  setToTok(getValues("ToToken"));    
  setquantValue(getValues("QuantityToken"));   
//   const quoteYes = await getValues("Quoteornot");      
   
// console.log(await fromTok, ToTok, quantValue, quoteYes);

// if(!quoteYes){
// try {
//   const quote = await axios.get(
//     `https://api.1inch.io/v4.0/250/quote?fromTokenAddress=${fromTok}&toTokenAddress=${ToTok}&amount=${quantValue}`
//   );
//   console.log(quote);
//   if (quote) {
//     setname1(await quote.data.toTokenAmount);
//     console.log("NAME1", await name1);

//     // setquoteMessage({ isHidden: !quoteMessage.isHidden });
//     setquoteMessage({ isHidden:false});
//   }
// } catch (error) { 
//   console.error("Quote execution error", error);
// }
// }
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
  >
    EXIT
  </Button>
)

const QuotesResult = () => (
  <Alert status="info" variant="solid" mt={5}>
    <AlertIcon />
    <AlertTitle mr={1} fontWeight="bold">
      QUOTES:
    </AlertTitle>
    <AlertDescription><AlertTitle fontWeight="bold" color="red
    
    "> {name1} TOKENS</AlertTitle>Conversion of {quantValue} tokens of {fromTok} to {ToTok}{' '}
    </AlertDescription>
  </Alert>
)

const QuotesError = () => (
  <Alert status="error" variant="solid" mt={5}>
    <AlertIcon />
    <AlertTitle mr={1} fontWeight="bold">
      ERROR:{' '}
    </AlertTitle>
    <AlertDescription>Request is having an issue: {qErrormess}</AlertDescription>
  </Alert>
)

const TransferSuccess = () => (
  <Alert status="success" variant="solid" mt={5}>
    <AlertIcon />
    <AlertTitle mr={1} fontWeight="bold">
      TRANSFER:
    </AlertTitle>
    <AlertDescription>{inputRecord}</AlertDescription>
  </Alert>
)


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
    <form onSubmit={
      handleSubmit((inputRecord) => setinputRecord(JSON.stringify(inputRecord)))}>
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
)
}

export default NewPage

