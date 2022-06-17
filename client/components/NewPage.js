// import React from 'react'
// import {
//   ChakraProvider,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   Button
// } from '@chakra-ui/react'
// import { AddIcon, CopyIcon } from '@chakra-ui/icons'

// const NewPage = () => (
  
//   <ChakraProvider resetCSS>
//     <Alert>
//       <AlertIcon />
//       <AlertTitle mr={1} fontWeight="bold">
//         Alert title
//       </AlertTitle>
//       <AlertDescription>Need to enter Metamask</AlertDescription>
//     </Alert>
//     <Button
//       variant="outline"
//       size="lg"
//       colorScheme="blue"
//       leftIcon={<AddIcon />}
//       rightIcon={<CopyIcon />}
//       display="inline-block"
//       justifyContent="center"
//       ml={500}
//     >
//       Button text
//     </Button>
//   </ChakraProvider>
// )

// export default NewPage


import React from 'react'
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

const FromToken = () => (
  <Input
    size="md"
    mt={15}
    placeholder="FROM TOKEN"
    variant="filled"
    fontWeight="bold"
    textAlign="center"
    fontSize="lg"
    color="facebook.500"
  />
)

const FromToken1 = () => (
  <Input
    size="md"
    mt={15}
    placeholder="TO TOKEN"
    variant="filled"
    fontWeight="bold"
    textAlign="center"
    fontSize="lg"
    color="facebook.500"
  />
)

const FromToken2 = () => (
  <Input
    size="md"
    mt={15}
    placeholder="TOKEN QUANTITY"
    variant="filled"
    fontWeight="bold"
    textAlign="center"
    fontSize="lg"
    color="facebook.500"
  />
)

const Enterquote = () => (
  <Button
    variant="solid"
    size="lg"
    mt={15}
    pl={5}
    pr={5}
    fontWeight="bold"
    color="whiteAlpha.500"
    textAlign="center"
    backgroundColor="whiteAlpha.500"
    border={100}
    borderRadius={20}
    ml={40}
    colorScheme="whiteAlpha"
    rightIcon={<ArrowForwardIcon />}
    letterSpacing="wide"
    fontSize="xl"
    display="inline"
    pb={10}
    pt={3}
  >
    ENTER{' '}
  </Button>
)

const Enterquote1 = () => (
  <Button
    variant="solid"
    size="lg"
    mt={15}
    pl={5}
    pr={5}
    fontWeight="bold"
    color="facebook.500"
    textAlign="center"
    backgroundColor="whiteAlpha.500"
    border={100}
    borderRadius={20}
    ml={100}
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
      Quotation for from Token to Token Quantity is:{' '}
    </AlertDescription>
  </Alert>
)

const QuoteResult = () => (
  <AlertTitle mr={1} fontWeight="bold">
    QUOTES:
  </AlertTitle>
)

const QuoteResult1 = () => (
  <AlertTitle mr={1} fontWeight="bold">
    ERROR:{' '}
  </AlertTitle>
)

const QuotesResult1 = () => (
  <Alert status="error" variant="solid" mt={5}>
    <AlertIcon />
    <AlertTitle mr={1} fontWeight="bold">
      ERROR:{' '}
    </AlertTitle>
    <AlertDescription>Error in taking action</AlertDescription>
  </Alert>
)

const QuoteResult2 = () => (
  <AlertTitle mr={1} fontWeight="bold">
    TRANSFER:
  </AlertTitle>
)

const QuotesResult2 = () => (
  <Alert status="success" variant="solid" mt={5}>
    <AlertIcon />
    <AlertTitle mr={1} fontWeight="bold">
      TRANSFER:
    </AlertTitle>
    <AlertDescription>Transfer has been successful</AlertDescription>
  </Alert>
)

const NewPage = () => (
  <ChakraProvider resetCSS>
    <Text
      display="inline"
      ml={100}
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
      fontSize="lg"
      color="whiteAlpha.500"
    >
      QUOTES
    </Text>
    <Switch
      display="inline"
      mt={20}
      fontWeight="bold"
      backgroundColor="whiteAlpha.500"
      colorScheme="whiteAlpha"
      color="whiteAlpha.500"
      textAlign="center"
      pt={1}
    />
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
      backgroundColor="whiteAlpha.500"
      mt={20}
      mr={10}
      fontSize="lg"
      color="facebook.500"
    >
      SWAP TOKENS
    </Text>
    <FromToken />
    <FromToken1 />
    <FromToken2 />
    <Enterquote1 />
    <Enterquote />
    <QuotesResult />
    <QuotesResult1 />
    <QuotesResult2 />
  </ChakraProvider>
)

export default NewPage

