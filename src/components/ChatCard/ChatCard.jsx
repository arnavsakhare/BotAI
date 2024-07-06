import React, { useEffect, useState } from 'react'
import ai from '../../assets/bot.png'
import human from '../../assets/person.png'
import { Box, IconButton, Rating, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { ThumbDownOffAlt, ThumbUpAlt, ThumbUpOffAlt } from '@mui/icons-material'


const ChatCard = ({details, showFeedBackModal, updateChat, setSelectedChatId, readOnly = false}) => {

  const [isRating, setIsRating] = useState(false)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    
    if(isRating) {
        updateChat(prev => (
            prev.map(item => {
                if(item.id == details.id) {
                    return {...item, rating: rating || 0}
                } else {
                    return {...item}
                }
            })
        ))
    }
  }, [rating])

  return (
    <Stack
        p={{xs: 1, md: 2}}
        boxShadow='0 0 4px rgba(0,0,0,0.2)'
        borderRadius={1}
        direction='row'
        spacing={{xs: 1, md: 3}}
        bgcolor={readOnly ? 'primary.main' : 'primary.light'}
        sx={{
            '&:hover .feedback-btns': {
                visibility: 'visible',
                opacity: 1
            }
        }}
    >
        <Box
            component='img'
            src={details.type == "AI" ? ai : human}
            height={{xs: 30, md: 68}}
            width={{xs: 30, md: 68}}
            borderRadius='50%'
            flexShrink={0}
            sx={{objectFit: 'cover'}}
        />

        <Box>
            <Typography variant='heading' fontWeight={700} fontSize={{xs: 14, md: 16}}>
                {details.type == "AI" ? 'Soul AI' : 'You'}
            </Typography>
            <Typography fontSize={{xs: 12, md: 16}}>
                {details.text}
            </Typography>

            <Stack
                direction='row'
                gap={2}
                alignItems='center'
                mt={1}
            >
                <Typography fontSize={{xs: 8, md: 12}} color='text.secondary'>
                    {format(details.time, 'hh:mm a')}
                </Typography>

                {(details.type == "AI" && !readOnly) && (
                    <Stack
                        direction='row'
                        visibility={{xs: 'visible', md: 'hidden'}}
                        className='feedback-btns'
                        sx={{
                            opacity: {xs: 1, md: 0},
                            transition: 'opacity 400ms ease'
                        }}
                    >
                        <IconButton size='small' onClick={() => setIsRating(prev => !prev)}>
                            {!isRating && <ThumbUpOffAlt fontSize='inherit' />}
                            {isRating && <ThumbUpAlt fontSize='inherit' />}
                        </IconButton>

                        <IconButton 
                            size='small'
                            onClick={() => {
                                setSelectedChatId(details.id)
                                showFeedBackModal()
                            }}
                        >
                            <ThumbDownOffAlt fontSize='inherit' />
                        </IconButton>
                    </Stack>
                )}
            </Stack>

            {((isRating || details.rating > 0) && details.type == "AI") && (
                <Box pt={{xs: 1, md: 2}}>
                    <Typography component='legend' fontSize={{xs: 10, md: 12}} mb={0.5}>
                        {readOnly ? 'Rating' : 'Rate this response'}
                    </Typography>

                    <Rating
                        name='simple-controlled'
                        value={details.rating > 0 ? details.rating : rating}
                        onChange={(event, newValue) => {
                            setRating(newValue)
                        }}
                        sx={{
                            width: 'auto'
                        }}
                        readOnly={readOnly}
                    />
                </Box>
            )}

            {details.feedback && (
                <Typography pt={1} fontSize={{xs: 10, md: 16}}>
                    <Box component='span' fontWeight={600}>
                        Feedback:
                    </Box>

                    <Box component='span'>
                        {` ${details.feedback}`}
                    </Box>
                </Typography>
            )}
        </Box>
    </Stack>
  )
}

export default ChatCard