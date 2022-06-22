import React from 'react'
import { useContext } from "react";
import { SocialContext } from "../context/context";

function JsonDataDisplay(){

    const { dataAllList, setdataAllList} = useContext(SocialContext);

	const DisplayData=dataAllList.map(
		(info)=>{
			return(
				<tr>
					<td>{info._orderNumber}</td>
					<td>{info.seller}</td>
					<td>{info.tokenQuantity}</td>
                    <td>{info.tokenContract}</td>
					<td>{info.maticAmount}</td>

				</tr>
			)
		}
	)

	return(
		<div>
			<table class="table table-striped">
				<thead>
					<tr>
					<th>Order No</th>
					<th>Seller</th>
					<th>Token Quantity</th>
                    <th>Token Contract</th>
					<th>Matic Amount</th>
					</tr>
				</thead>
				<tbody>
				
					
					{DisplayData}
					
				</tbody>
			</table>
			
		</div>
	)
}

export default JsonDataDisplay;
