import React, { useContext } from 'react'
import newchat from '../../assets/newchat.png'
import { ThemeContext } from '../../theme/ThemeContext'
import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import { AddComment, Close } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const SideBar = ({ setChat, closeMenu }) => {

  const {mode, setMode} = useContext(ThemeContext)
  const isMobile = useMediaQuery('(max-width: 800px)')

  const handleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <Box>
        {isMobile && (
            <Button
                endIcon={<Close />}
                sx={{
                    width: 1,
                    justifyContent: 'flex-end',
                    color: mode === 'light' ? 'primary.dark' : 'text.primary'
                }}
                onClick={closeMenu}
            >
                Close
            </Button>
        )}

        <Link to='/' style={{textDecoration: 'none'}}>
            <Stack
                onClick={() => {
                    setChat([])
                    closeMenu()
                }}
                sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.bg'
                    }
                }}
                direction='row'
                spacing={1}
                alignItems='center'
                justifyContent='space-between'
                py={2}
                px={{xs: 2, md: 3}}
            >
                <Stack direction='row' gap={2} alignItems='center'>
                    <Box
                        component='img'
                        src={newchat}
                        height={42}
                        width={42}
                        borderRadius={3}
                        boxShadow={4}
                        flexShrink={0}
                    />

                    <Typography variant='heading' fontSize={{xs: 16, md: 20}} color='text.primary'>
                        New Chat
                    </Typography>
                </Stack>

                <AddComment sx={{color: 'text.primary'}}/>

            </Stack>
        </Link>

        <Box p={{xs: 2, md: 3}}>
            <Link to='/history'>
                <Button variant='contained' sx={{width: 1}} onClick={closeMenu}>
                    Past Conversations
                </Button>
            </Link>
        </Box>
    </Box>
  )
}

export default SideBar