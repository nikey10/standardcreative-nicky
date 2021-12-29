import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEthPrice } from '../../services/api'
import { placeBid } from '../../services/oneOfOne'
import MultiPanel from './multipanel'
import RecordPanel from './recordpanel'
import BaseModal from '../../pages/baseModal'
import './style.scss'

const MultiBid = (props) => {
	const { id, issingle, setIssingle, switcheth } = props
	const isconnected = useSelector((state: any) => state.user.walletConnected)
	const address = useSelector((state: any) => state.user.userAddress)
	const [ethprice, setEthprice] = useState(0)
	const [records, setRecords] = useState([])
	const [totaleth, setTotaleth] = useState(0)
	const [totalprice, setTotalprice] = useState(0)
	const [totaledition, setTotaledition] = useState(0)
	const [isEnd, setIsEnd] = useState(false)

	const closeModal = () => {
		setIsEnd(false);
	}
	const auctionData = useSelector((state: any) => state.currentAuction)
	const totalOpenEditionBids = auctionData ? parseInt(auctionData.auction.totalOpenEditionBids, 10) / Math.pow(10, 18) : null
	const openEditionPrice = auctionData ? parseInt(auctionData.auction.openEditionPrice, 10) / Math.pow(10, 18) : null
	console.log(auctionData, openEditionPrice)
	const updateBid = async (eth, price, quantity) => {
		const res = await placeBid(id, eth, false, address)
		if (res) {
			console.log('auction ended')
			setIsEnd(true);
		} else {
			setTotalprice(totalprice + price)
			setTotaleth(totaleth + eth)
			setTotaledition(totaledition + quantity)
		}
	}
	const initEthPrice = async () => {
		let res = await getEthPrice()
		let price = res.data.ethereum.usd
		setEthprice(price)
	}
	useEffect(() => {
		initEthPrice()
	}, [])
	return (
		<>
		<div className="bid-multi">
			<div onClick={() => setIssingle()}>
				<div className="bid-type">COLLECTIBLES</div>
				<div className="bid-view">
					<div>TOTAL BID</div>
					<div>
						<span>Ξ</span>
						{totalOpenEditionBids ? totalOpenEditionBids.toFixed(5) : 0}
					</div>
					<div>(${(totalOpenEditionBids * ethprice).toFixed(2)})</div>
					<div>{(totalOpenEditionBids / openEditionPrice).toFixed(1)} EDITIONS</div>
				</div>
			</div>
			<MultiPanel
				issingle={issingle}
				isconnected={isconnected}
				updateBid={(eth, price, quantity) => updateBid(eth, price, quantity)}
			/>
			<div className="records">
				{!issingle && <RecordPanel isconnected={isconnected} />}
			</div>
		</div>
		<BaseModal label="Notification" show={isEnd} closeModal={closeModal}>
			<h1 className="modal-title" >Auction Ended!</h1>
		</BaseModal>
		</>
	)
}

export default MultiBid
