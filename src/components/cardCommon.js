import React from "react"
import { Box, Tooltip } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { InfoSharp as InfoIcon } from "@material-ui/icons"

export function Info({ title, color, icon }) {
	return (
		<Tooltip title={title}>
			<InfoIcon fontSize="inherit" />
		</Tooltip>
	)
}

export function CardRow({
	text,
	infoText,
	fontWeight,
	fontSize,
	color,
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
				>
					<Box>{text}</Box>
					{infoText && (
						<Box
							ml={0.69}
							display="flex"
							// flexDirection='row'
							// alignItems='center'
						>
							<Info title={infoText} />
						</Box>
					)}
				</Box>
			</Typography>
		</Box>
	)
}
