import { ArrowUpward } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

const Card = ({heading, subtext, handleClick}) => {
  return (
    <Stack
		bgcolor='primary.light'
		p={{xs: 1, md: 3}}
		boxShadow='0 0 12px rgba(0,0,0,0.2)'
		direction='row'
		spacing={1}
		alignItems='center'
		justifyContent='space-between'
		onClick={() => handleClick(heading)}
		sx={{
		'&:hover .MuiIconButton-root': {
			opacity: 1
		},
		cursor: 'pointer',
		'&:hover' : {
			bgcolor:'primary.bglight'
		},
		transition: 'background 200ms ease'
    }}
    >
		<Box>
			<Typography variant='heading' fontWeight={700} fontSize={{xs: 14, md: 20}}>
				{heading}
			</Typography>
			<Typography color='text.secondary' fontSize={{xs: 10, md: 16}}>
				{subtext}
			</Typography>
		</Box>

		<IconButton size='small' sx={{opacity: 0, bgcolor: 'primary.bglight', transition: 'opacity 400ms ease'}}>
			<ArrowUpward fontSize='inherit'/>
		</IconButton>
    </Stack>
  )
}

export default Card