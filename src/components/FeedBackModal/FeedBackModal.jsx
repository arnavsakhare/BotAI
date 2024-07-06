import { Close, Feedback } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const FeedBackModal = ({open, handleClose, chatId, updateChat}) => {

  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    updateChat(prev => (
        prev.map(item => {
            if(item.id == chatId){
                return {...item, feedback: input}
            } else {
                return {...item}
            }
        })
    ))

    setInput('')
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '95%',
                bgcolor: 'primary.bgtheme',
                boxShadow: 24,
                p: { xs: 2, md: 3 },
                maxWidth: 720,
                borderRadius: '10px'
            }}
        >
            <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
                <Stack direction='row' spacing={{xs: 0.5, md: 2}} alignItems='center'>
                    <Feedback />
                    <Typography variant='heading' fontSize={{xs: 14, md: 18}}>
                        Provide Additional Feedback
                    </Typography>
                </Stack>

                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </Stack>

            <Box
                component='form'
                onSubmit={handleSubmit}
                pt={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '12px'
                }}
            >
                <TextField
                    multiline
                    rows={6}
                    sx={{width: 1}}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                />

                <Button variant='contained' type='submit'>
                    Submit
                </Button>
            </Box>
        </Box>
    </Modal>
  )
}

export default FeedBackModal