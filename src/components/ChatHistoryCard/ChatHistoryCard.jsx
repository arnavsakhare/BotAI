import React from 'react'
import ChatCard from '../ChatCard/ChatCard'
import { isEqual, startOfDay, add, format } from 'date-fns'
import { Box, Stack, Typography } from '@mui/material'

const ChatHistoryCard = ({details}) => {

  const formatDate = (date) => {
    const today = startOfDay(new Date())

    if(isEqual(date, today)){
        return `Today's chats`
    }
    else if(isEqual(today, add(date, { day: 1 }))) {
        return `Yesterday's chats`
    } 
    else {
        return format(date, 'do LLL yyyy')
    }
  }


  return (
    <Box>
        <Typography fontWeight={700} mb={2}>
            {formatDate(startOfDay(new Date(details.datetime)))}
        </Typography>

        <Stack spacing={{xs: 2, md: 3}}>
            {details.chat.map((item, idx) => (
                <ChatCard key={idx} details={item} readOnly={true}/>
            ))}
        </Stack>
    </Box>
  )
}

export default ChatHistoryCard