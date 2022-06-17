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

const QuoteorSwap = () => (
  <Switch
    display="inline"
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
    color="facebook.500"
  />
)

const ToToken = () => (
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

const QuantityToken = () => (
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
      Quotation for from Token 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE to Token 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE for Quantity 10000000000000000000 is: 10000000000000000000 {' '}
    </AlertDescription>
  </Alert>
)

// const QuoteResult = () => (
//   <AlertTitle mr={1} fontWeight="bold">
//     QUOTEwwwwwwwS:
//   </AlertTitle>
// )

// const QuoteError = () => (
//   <AlertTitle mr={1} fontWeight="bold">
//     ERROR:{' '}
//   </AlertTitle>
// )

const QuotesError = () => (
  <Alert status="error" variant="solid" mt={5}>
    <AlertIcon />
    <AlertTitle mr={1} fontWeight="bold">
      ERROR:{' '}
    </AlertTitle>
    <AlertDescription>Error in taking action</AlertDescription>
  </Alert>
)

// const QuoteResult2 = () => (
//   <AlertTitle mr={1} fontWeight="bold">
//     TRANSFER:
//   </AlertTitle>
// )

const TransferSuccess = () => (
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
    <br></br>
    <Text
      display="inline"
      ml={90}
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
      fontSize="xl"
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
      fontSize="xl"
      color="facebook.500"
    >
      SWAP TOKENS
    </Text>
    <FromToken />
    <ToToken />
    <QuantityToken />
    <EnterButton />
    <ExitButton />
    <QuotesResult />
    <QuotesError />
    <TransferSuccess />
  </ChakraProvider>
)

export default NewPage

