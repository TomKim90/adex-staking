import React from "react"
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Box,
	SvgIcon
} from "@material-ui/core"
import clsx from "clsx"
import Anchor from "./Anchor"
import logo from "./../resources/staking-logo.svg"
import DashboardIcon from "@material-ui/icons/Dashboard"
import { makeStyles } from "@material-ui/core/styles"
import { useLocation } from "react-router-dom"
import packageJson from "./../../package.json"
import { ADDR_ADX } from "./../helpers/constants"
import WithRouterLink from "./WithRouterLink"
import UserData from "./UserData"
import { HomeSharp as HomeIcon } from "@material-ui/icons"
import { ReactComponent as StakingIcon } from "./../resources/link-ic.svg"
import { ReactComponent as GaslessIcon } from "./../resources/gasless-ic.svg"

const RRListItem = WithRouterLink(ListItem)

const useStyles = makeStyles(theme => {
	const activeColor = theme.palette.primary.contrastText
	const activeBgColor = theme.palette.primary.main

	return {
		navigation: {
			backgroundColor: theme.palette.background.paper
		},
		sntPadding: {
			paddingTop: 0
		},
		navListRoot: {
			color: theme.palette.text.secondary,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between"
		},
		navList: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 100,
			overflowY: "auto",
			overflowX: "hidden"
		},
		sideNavToolbar: {},
		version: {
			position: "absolute",
			bottom: 0,
			left: 0,
			right: 0,
			padding: 10,
			paddingLeft: 16,
			borderTopWidth: 1,
			borderTopColor: theme.palette.divider,
			borderTopStyle: "solid"
		},
		active: {
			color: activeColor,
			backgroundColor: activeBgColor,
			"&:focus": {
				backgroundColor: activeBgColor
			},
			"&:hover": {
				backgroundColor: activeBgColor,
				color: activeColor,
				"& .MuiListItemIcon-root": {
					color: activeColor
				}
			},
			"& .MuiListItemIcon-root": {
				color: theme.palette.common.white
			}
		},
		adxLink: {
			color: theme.palette.text.hint,
			"&:hover": {
				color: theme.palette.text.secondary
			}
		},
		sideSwitch: {
			marginBottom: `${theme.spacing(2)}px`
		},
		icon: {
			height: 32,
			width: "auto",
			cursor: "pointer"
		},
		amount: {
			fontSize: theme.typography.pxToRem(18)
		},
		overlay: {
			position: "absolute",
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "transparent"
		},
		noUserData: {
			opacity: 0.23
		}
	}
})

function SideNav({
	prices,
	stats,
	onRequestUnbond,
	onUnbond,
	onClaimRewards,
	onRestake,
	setConnectWallet
}) {
	const classes = useStyles()
	const location = useLocation()
	const path = location.pathname

	return (
		<Box
			position="relative"
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			flexGrow="1"
		>
			<Box>
				<Box>
					<Box>
						<ListItem>
							<Box
								mb={1}
								display="flex"
								flexDirection="row"
								alignItems="flex-start"
							>
								<img height="40vh" src={logo} alt="logo"></img>
							</Box>
						</ListItem>

						<Box position="relative">
							<ListItem
								className={clsx({
									[classes.noUserData]: !stats.connectedWalletAddress
								})}
							>
								{UserData({
									prices,
									stats,
									onRequestUnbond,
									onUnbond,
									onClaimRewards,
									onRestake
								})}
							</ListItem>
							<Divider />

							{!stats.connectedWalletAddress && (
								<Box
									id="side-nav-connect-wallet-overlay"
									classes={{ root: classes.overlay }}
									display="flex"
									flexDirection="column"
									alignItems="center"
									justifyContent="center"
									color="secondary.main"
									fontSize="h1.fontSize"
									textAlign="center"
									onClick={() => setConnectWallet(true)}
									style={{ cursor: "pointer" }}
								>
									{"CONNECT WALLET"}
								</Box>
							)}
						</Box>
					</Box>
				</Box>
			</Box>

			<Box
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				flex="1"
			>
				<Box>
					<List>
						<RRListItem
							id="side-nav-link-pools"
							button
							to={{ pathname: "/" }}
							className={clsx({ [classes.active]: path === "/" })}
						>
							<ListItemIcon color="inherit">
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary={"Pools"} />
						</RRListItem>

						<RRListItem
							id="side-nav-link-stakings"
							button
							to={{ pathname: "/stakings" }}
							className={clsx({ [classes.active]: path === "/stakings" })}
						>
							<ListItemIcon color="inherit">
								<SvgIcon color="inherit">
									<StakingIcon width="100%" height="100%" color="secondary" />
								</SvgIcon>
							</ListItemIcon>
							<ListItemText primary={"Staked"} />
						</RRListItem>
						<RRListItem
							id="side-nav-link-gasless"
							button
							to={{ pathname: "/gasless" }}
							className={clsx({ [classes.active]: path === "/gasless" })}
						>
							<ListItemIcon color="inherit">
								<SvgIcon color="inherit">
									<GaslessIcon width="100%" height="100%" color="secondary" />
								</SvgIcon>
							</ListItemIcon>
							<ListItemText primary={"Gasless Staking"} />
						</RRListItem>
					</List>
				</Box>
				<Box>
					<RRListItem
						id="side-nav-link-staking-landing-page"
						button
						onClick={() =>
							window.open(
								"https://www.adex.network/staking/",
								"_blank",
								"noopener,noreferrer"
							)
						}
					>
						<ListItemIcon color="inherit">
							<SvgIcon color="inherit">
								<HomeIcon color="inherit" />
							</SvgIcon>
						</ListItemIcon>
						<ListItemText primary={"Homepage & Calculator"} />
					</RRListItem>
					<Divider />
					<ListItem>
						<Box>
							<div>
								<small>
									{" "}
									&copy; {new Date().getFullYear()} &nbsp;
									<Anchor
										id="external-link-adex-network"
										target="_blank"
										href={`https://adex.network`}
									>
										AdEx Network OÜ
									</Anchor>
								</small>
							</div>
							<div>
								<small>
									<Anchor
										id="external-link-adex-network-tos"
										target="_blank"
										href={`https://adex.network/tos`}
									>
										{"Terms and conditions"}
									</Anchor>
								</small>
							</div>
							<div>
								<small>
									<Anchor
										id="external-link-adex-token"
										target="_blank"
										href={`https://etherscan.io/address/${ADDR_ADX}`}
									>
										AdEx (ADX) Token
									</Anchor>
								</small>
							</div>
							<div>
								<small>
									<Anchor
										id="external-link-adex-staking-overview"
										target="_blank"
										href="https://www.adex.network/blog/adex-defi-staking-overview/"
									>
										v.{packageJson.version}
									</Anchor>
								</small>
							</div>
						</Box>
					</ListItem>
				</Box>
			</Box>
		</Box>
	)
}

export default SideNav
