import { IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useContext } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { ThemeContext } from '../../theme/ThemeContext'
import { Brightness4, Brightness7, Menu } from '@mui/icons-material'

const NavBar = () => {

  const {handleMobileMenu} = useOutletContext()
  const isMobile = useMediaQuery('(max-width: 800px)')
  const {mode, setMode} = useContext(ThemeContext)

  return (
    <Stack 
        component='header'
        p={{xs: 2, md: 3}}
        direction='row'
        alignItems='center'
        justifyContent='space-between'
    >
        <Stack direction='row' alignItems='center' spacing={2}>
            {isMobile && (
                <Menu onClick={() => handleMobileMenu(prev => !prev)}/>
            )}

            <Link to='/' style={{textDecoration: 'none'}}>
                <Typography component='h1' variant='h1'>
                    Bot AI
                </Typography>
            </Link>
        </Stack>

        <Stack direction='row' spacing={0.4} alignItems='center'>
            <Typography textTransform='capitalize' fontSize={13}>
                {mode}
            </Typography>

            <IconButton
                onClick={() => {
                    setMode(prev => {
                        if(prev == 'light'){
                            return 'dark'
                        } else {
                            return 'light'
                        }
                    })
                }}
            >
                {mode == 'light' ? (
                    <Brightness4 />
                ) : (
                    <Brightness7 />
                )}
            </IconButton>
        </Stack>
    </Stack>
  )
}

export default NavBar