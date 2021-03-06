import React from "react"
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	Avatar,
	ListItemIcon
} from "@material-ui/core"
import { Wallets, METAMASK } from "../helpers/constants"
import { toIdAttributeString } from "../helpers/formatting"

export default function ChooseWalletDialog({
	title = "Select Wallet",
	handleListItemClick,
	handleClose,
	open,
	disableNonBrowserWallets
}) {
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<DialogTitle id="simple-dialog-title">{title}</DialogTitle>
			<List>
				{Wallets.map(({ icon, name = "", title }) => (
					<ListItem
						id={`connect-wallet-select-${toIdAttributeString(name)}`}
						disabled={disableNonBrowserWallets && name !== METAMASK}
						button
						onClick={() => handleListItemClick(name)}
						key={name}
					>
						<ListItemIcon>
							<Avatar src={icon} />
						</ListItemIcon>
						<ListItemText primary={title} />
					</ListItem>
				))}
			</List>
		</Dialog>
	)
}
