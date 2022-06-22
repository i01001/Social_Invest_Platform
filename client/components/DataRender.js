// import React from 'react'
// import { useContext } from "react";
// import { SocialContext } from "../context/context";

// const JsonDataDisplay = async () => {

//     // const { dataAllList, setdataAllList} = useContext(SocialContext);

//     const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/getchannels`,
//       );
//     const data = await response.json();
// 	const DisplayData=data.map(
// 		(channel, index)=>{
// 			return(
//                 <>
//                 <p> key={index}</p>

// 				{/* <tr> */}
//                     {/* <td>{info.tokenQuantity}</td> */}
// 					{/* <td>{info._orderNumber}</td>
// 					<td>{info.seller}</td>
// 					<td>{info.tokenQuantity}</td>
//                     <td>{info.tokenContract}</td>
// 					<td>{info.maticAmount}</td> */}
//                     </>
// 				// </tr>
// 			)
// 		}
// 	)

// 	return(
// 		<div>
// 			{/* <table class="table table-striped">
// 				<thead>
// 					<tr>
// 					<th>Order No</th>
// 					<th>Seller</th>
// 					<th>Token Quantity</th>
//                     <th>Token Contract</th>
// 					<th>Matic Amount</th>
// 					</tr>
// 				</thead>
// 				<tbody> */}

// 					{DisplayData}

// 				{/* </tbody>
// 			</table> */}

// 		</div>
// 	)
// }

// export default JsonDataDisplay;

import React from "react";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
var Web3 = require("web3");
import {
  contractStandardABI,
  contractABI,
  contractAddress,
} from "../lib/constants";
import { SocialContext } from "../context/context";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons"; 
import { useRouter } from "next/router";
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
import { set } from "react-hook-form";

const DataRender = () => {
  const router = useRouter();
  const [Rchannels, setRchannels] = useState([]);
  const { dataAllList, setdataAllList } = useContext(SocialContext);
  const [jsonAllData, setjsonAllData] = useState();
  const [jsondATdata, setjsondATdata]= useState([{"0":"0","1":"0xaF87B6479f9CA8D3BAE56deAd220bcE44a709549","2":"0","3":"0xE3cf96b99c06eADC26E92ac3a01dac64E9f5bF68","4":"0","_orderNumber":"0","seller":"0xaF87B6479f9CA8D3BAE56deAd220bcE44a709549","tokenQuantity":"0","tokenContract":"0xE3cf96b99c06eADC26E92ac3a01dac64E9f5bF68","maticAmount":"0"}]);


  
  // useEffect(() => {
  //   const Inter2 = async () => {
  //     console.log("waiting inter2");
  //     const intermed = await dataAllList;
  //     setRchannels(intermed);
  //   };
  //   Inter2();
  //   // Inter();
  // },[]);

  const arrayOfObjects = [
    { coffee: "Americano", size: "Medium" },
    { coffee: "Espresso", size: "Single" },
  ];

  const [LEntercount, setLEntercount] = useState({
    inc: 1,
    count: 1,
  });

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
      dataRec();
      // setjsondATdata(prevState);
    }
  }, [LEntercount]);

  console.log("lenter count", LEntercount.count);

  // useEffect(() => {
  //   // dataRec();
  // }, [jsonAllData]);

  const dataRec = async () => {
    console.log("ENTERED DATA REC")
    var web3 = new Web3("https://rpc-mumbai.maticvigil.com");
    var myContract = new web3.eth.Contract(contractABI, contractAddress);
    var counterOrder = await myContract.methods.orderNumber().call();
    console.log(counterOrder);

    const ordersObjectList = [];
    for (const i = 0; i < counterOrder; i++) {
      ordersObjectList[i] = await myContract.methods.Orders(i).call();
    }
    console.log(ordersObjectList);
    const jsondAT = await JSON.stringify(ordersObjectList);
    console.log("JSON data going", await jsondAT);
    await jsondAT;
    console.log("order Objects NEWWW orig", ordersObjectList);
    console.log("order Objects NEWWWmod", jsondAT);
    setjsondATdata(jsondAT);
    // console.log("order Json new ", jsonAllData);
    // console.log("dataAlllist NEWWWWWW being updated", await dataAllList);
    await jsondATdata;
    await new Promise((r) => setTimeout(r, 7000));

  };
  console.log("json field outside dataRec", jsondATdata);
  // const Inter = async () => {

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/getchannels`,
  //     );
  //     console.log("RESPONSE", await response);
  //     const dataR = await response.json();
  //     console.log("DATAAAAAAAAAAAA", await dataR);
  //     console.log("data IMPORT",await dataAllList)

  //   setRchannels(dataFORtest);

  // } catch (error) {
  //   console.log(error);
  // }
  // }


  const Lenterfunc = async () => {
    // dataRec();
    const inc = 1;
    setLEntercount((prevState) => {
      return {
        ...prevState,
        count: prevState.count + LEntercount.inc,
      };
    });

  };

  // if ( LEntercount.count <= 3) {
  //   return (
  //     <div>
  //       <p>LOADDDDDDDDDD</p>
  //       <Button
  //     variant="solid"
  //     size="lg"
  //     // mt={40}
  //     pl={5}
  //     pr={5}
  //     fontWeight="bold"
  //     color="white"
  //     textAlign="center"
  //     backgroundColor="whiteAlpha.500"
  //     border={100}
  //     borderRadius={20}
  //     ml={300}
  //     colorScheme="whiteAlpha"
  //     letterSpacing="wide"
  //     fontSize="lg"
  //     rightIcon={<ArrowForwardIcon />}
  //     // display="inline"
  //     pb={10}
  //     pt={3}
  //     onClick={() => {
  //       Lenterfunc();
  //     }}
  //   >
  //     ALL NEW LISTINGS
  //   </Button>
  //     </div>
  //   );
  // }

  return (
    <div>
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
      ml={300}
      colorScheme="whiteAlpha"
      letterSpacing="wide"
      fontSize="lg"
      rightIcon={<ArrowForwardIcon />}
      // display="inline"
      pb={10}
      pt={3}
      onClick={() => {
        Lenterfunc();
      }}
    >
      ALL NEW LISTINGS
    </Button>
    <br></br>
      {/* {Rchannels.map((roomId, roomName) => ( */}
      {jsondATdata.map(({ _orderNumber, seller }) => (
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
          key={_orderNumber}
        >
          Coffee type {seller} in a {_orderNumber} size
        </Text>
      ))}
    </div>
  );
};

export default DataRender;

// export default function DataRender() {
//   return (
//     <>

//       ))}
//     </>
//   );
// }

//   {channels.map((channel) => (
//       // key={index}
//       <p>{channel.roomId} </p>
//       <p>{channel.avatar}</p>
//       <p>{channel.roomName}</p>
//     />
//   ))}
