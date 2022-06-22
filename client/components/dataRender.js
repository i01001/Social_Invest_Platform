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
