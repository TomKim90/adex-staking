import React from "react"
import StatsCard from "./StatsCard"
import { ZERO } from "../helpers/constants"
import { Button, Box } from "@material-ui/core"
import {
	formatDAIPretty,
	formatADXPretty,
	getADXInUSD,
	getDAIInUSD,
	getUSDFormatted
} from "../helpers/formatting"

export default function RewardCard({
	rewardChannels,
	userBonds,
	totalRewardADX,
	totalRewardDAI,
	onClaimRewards,
	onRestake,
	prices
}) {
	const title = "Unclaimed rewards"
	const loaded = rewardChannels != null
	if (!loaded) {
		return StatsCard({
			loaded,
			title,
			extra: "0.00 USD",
			subtitle: "0.00 DAI"
		})
	}

	const restakeEnabled =
		totalRewardADX.gt(ZERO) && userBonds.find(x => x.status !== "Unbonded")
	const rewardActions = (
		<Box display="flex" flexDirection="row" paddingTop={1} flex={1}>
			<Box width={1 / 2} pr={0.5}>
				<Button
					id="claim-reward-tom-side-nav"
					fullWidth
					variant="contained"
					color="primary"
					disabled={totalRewardADX.add(totalRewardDAI).eq(ZERO)}
					onClick={() => onClaimRewards(rewardChannels)}
					disableElevation
				>
					claim
				</Button>
			</Box>
			<Box width={1 / 2} pl={0.5}>
				<Button
					id="re-stake-tom-side-nav"
					fullWidth
					variant="contained"
					color="secondary"
					disabled={!restakeEnabled}
					onClick={() => onRestake(totalRewardADX)}
					disableElevation
				>
					re-stake
				</Button>
			</Box>
		</Box>
	)
	return StatsCard({
		loaded: true,
		title,
		actions: rewardActions,
		// Hax to match the design
		subtitle: `${formatADXPretty(totalRewardADX)} ADX`,
		extra: `+  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${formatDAIPretty(
			totalRewardDAI
		)} DAI`,
		moreExtra: `Total \u00A0${getUSDFormatted(
			getADXInUSD(prices, totalRewardADX) + getDAIInUSD(totalRewardDAI)
		)}`
	})
}
