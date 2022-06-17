import React from 'react'
import { useEffect, useState } from "react";
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
  const fromTok = getValues("FromToken1");     
  const ToTok = getValues("ToToken");    
  const quantValue = getValues("QuantityToken");      
console.log(await fromTok, ToTok, quantValue);

try {
  const quote = await axios.get(
    `https://api.1inch.io/v4.0/250/quote?fromTokenAddress={fromTok}&toTokenAddress={ToTok}&amount={quantValue}`
  );
  console.log(quote);
  if (quote) {
    const name1 = await quote.data.toTokenAmount;
    console.log(await name1);
  }
} catch (error) { 
  console.error("Quote execution error", error);
}
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
    <AlertDescription>
      Quotation for from Token 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE to Token 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE for Quantity 10000000000000000000 is: 10000000000000000000 {' '}
    </AlertDescription>
  </Alert>
)

const QuotesError = () => (
  <Alert status="error" variant="solid" mt={5}>
    <AlertIcon />
    <AlertTitle mr={1} fontWeight="bold">
      ERROR:{' '}
    </AlertTitle>
    <AlertDescription>Error in taking action</AlertDescription>
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
    <QuotesResult />
    <QuotesError />
    <TransferSuccess />
    </form>
  </ChakraProvider>
)
}

export default NewPage

