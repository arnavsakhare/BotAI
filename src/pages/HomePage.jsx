import React, { useContext, useRef, useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ThemeContext } from '../theme/ThemeContext'
import { Stack } from '@mui/material'
import NavBar from '../components/NavBar/NavBar'
import InitialChat from '../components/InitialChat/InitialChat'
import ChatCard from '../components/ChatCard/ChatCard'
import ChatInput from '../components/ChatInput/ChatInput'
import FeedBackModal from '../components/FeedBackModal/FeedBackModal'
import data from '../data/sampleData.json'

const HomePage = () => {

  const {chat, setChat} = useOutletContext()
  const {mode} = useContext(ThemeContext)
  const listRef = useRef(null)
  const [chatId, setChatId] = useState(1)
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const generateResponse = (input) => {
    const response = data.find(item => input.toLowerCase() == item.question.toLowerCase())

    let answer = "Sorry, Did not understand your query!"

    if(response !== undefined){
        answer = response.response
    }

    setChat(prev => (
        [
            ...prev,
            {
                type: 'Human',
                text: input,
                time: new Date(),
                id: chatId
            },
            {
                type: 'AI',
                text: answer,
                time: new Date(),
                id: chatId + 1
            }
        ]
    ))

    setChatId(prev => prev + 2)
  }

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView()
  }, [scrollToBottom])

  return (
    <Stack
        height='100vh'
        justifyContent='space-between'
        sx={{
            '@media (max-width: 800px)': {
                background: mode == 'light' ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)' : ''
            }
        }}
    >
        <NavBar />

        {chat.length == 0 && <InitialChat generateResponse={generateResponse}/>}

        {chat.length > 0 && (
            <Stack
                ref={listRef}
                height={1}
                flexGrow={0}
                p={{xs: 2, md: 3}}
                spacing={{xs: 2, md: 3}}
                sx={{
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                        borderRadius: '8px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(151, 133, 186,0.4)',
                        borderRadius: '8px'
                    }
                }}
            >
                {chat.map((item, idx) => (
                    <ChatCard
                        key={idx}
                        details={item}
                        updateChat={setChat}
                        setSelectedChatId={setSelectedChatId}
                        showFeedBackModal={() => setShowModal(true)}
                    />
                ))}
            </Stack>
        )}

        <ChatInput generateResponse={generateResponse} setScroll={setScrollToBottom} chat={chat} clearChat={() => setChat([])} />
            
        <FeedBackModal open={showModal} updateChat={setChat} chatId={selectedChatId} handleClose={() => setShowModal(false)}/>    
    </Stack>
  )
}

export default HomePage