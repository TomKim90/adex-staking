import React, { Fragment } from "react"
import { Box } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { InfoSharp as InfoIcon } from "@material-ui/icons"
import Tooltip from "./Tooltip"

const ExtraLabel = ({ label = "" }) =>
	Array.isArray(label) ? (
		<Fragment>
			{label.map((x, index) => (
				<Typography
					key={index}
					display="block"
					variant="caption"
					color="inherit"
				>
					{x}
				</Typography>
			))}
		</Fragment>
	) : (
		label
	)

export function Info({ title }) {
	return (
		<Tooltip title={<ExtraLabel label={title} />}>
			<InfoIcon fontSize="inherit" />
		</Tooltip>
	)
}

function AmountText({ text = "", fontSize }) {
	const decimalSeparatorSplit = text.split(".")

	if (decimalSeparatorSplit.length > 1) {
		const decimalsSplit = decimalSeparatorSplit[1].split(" ")
		return (
			<Box component="div" display="inline">
				<Box component="div" display="inline">
					{decimalSeparatorSplit[0]}
					{"."}
				</Box>
				<Box
					component="div"
					display="inline"
					style={{ opacity: "0.6" }}
					fontSize={fontSize * 0.83}
				>
					{decimalsSplit[0]}
				</Box>
				{decimalsSplit[1] && (
					<Box component="div" display="inline" fontSize={fontSize * 0.83}>
						{" "}
						{decimalsSplit[1]}
					</Box>
				)}
			</Box>
		)
	} else {
		return text
	}
}

export function CardRow({
	text,
	infoText,
	fontWeight,
	fontSize,
	color,
	justify,
	isAmountText,
	...restBox
}) {
	return (
		<Box {...restBox}>
			<Typography component="div" variant="body2">
				<Box
					color={color}
					fontWeight={fontWeight}
					fontSize={fontSize}
					display="flex"
					flexDirection="row"
					alignItems="center"
					flexWrap="wrap"
					justifyContent={justify || "flex-start"}
				>
					<Box style={{ wordBreak: "break-word" }}>
						{isAmountText ? (
							<AmountText text={text} fontSize={fontSize} />
						) : (
							text
						)}
					</Box>
					{infoText && (
						<Box ml={0.69} display="flex">
							<Info title={infoText} />
						</Box>
					)}
				</Box>
			</Typography>
		</Box>
	)
}
