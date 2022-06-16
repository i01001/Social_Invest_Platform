import React from 'react'
import {
  ChakraProvider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button
} from '@chakra-ui/react'
import { AddIcon, CopyIcon } from '@chakra-ui/icons'

const newPage = () => (
  <ChakraProvider resetCSS>
    <Alert>
      <AlertIcon />
      <AlertTitle mr={1} fontWeight="bold">
        Alert title
      </AlertTitle>
      <AlertDescription>Need to enter Metamask</AlertDescription>
    </Alert>
    <Button
      variant="outline"
      size="lg"
      colorScheme="blue"
      leftIcon={<AddIcon />}
      rightIcon={<CopyIcon />}
      display="inline-block"
      justifyContent="center"
      ml={500}
    >
      Button text
    </Button>
  </ChakraProvider>
)

export default newPage
