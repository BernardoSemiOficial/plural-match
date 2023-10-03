import {
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { io } from 'socket.io-client'

type cahtProviderProps = {
  children: ReactElement | ReactNode
  // ReactElement<any, string | JSXElementConstructor<any>>'
}

type ChatContext = {
  message: string
  username: string
  room: string
  messagesRoom: MessageRoom[]
  initChatRoom: ({ username, room }: { username: string; room: string }) => void
  updateMessage: (newMessage: string) => void
  handleInputSubmitMessage: (event: any) => void
  handleButtonSubmitMessage: (event: any) => void
}

interface Message {
  username: string
  room: string
  message: string
}

interface MessageRoom {
  username: string
  room: string
  message: string
  createdAt: Date
}

export const chatContext = createContext({} as ChatContext)

const socket = io('http://localhost:3001')
socket.on('connect', () => console.log('[IO] Connect'))

export const ChatProvider = ({ children }: cahtProviderProps) => {
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [messagesRoom, setMessagesRoom] = useState<MessageRoom[]>([])

  useEffect(() => {
    const updateNewMessage = (newMessage: MessageRoom) =>
      setMessagesRoom(currentMessages => [...currentMessages, newMessage])
    socket.on('receive-message', updateNewMessage)

    return function () {
      socket.off('receive-message', updateNewMessage)
    }
  }, [])

  const initChatRoom = useCallback(
    ({ username, room }: { username: string; room: string }) => {
      setUsername(username)
      setRoom(room)
      socket.emit('room', { username, room }, (response: MessageRoom[]) => {
        setMessagesRoom(response)
      })
    },
    []
  )

  const updateMessage = (newMessage: string) => {
    setMessage(newMessage)
  }

  const submitNewMessage = useCallback(() => {
    if (message.length > 0 && room && username) {
      const newMessage: Message = {
        message,
        room,
        username,
      }
      socket.emit('send-message', newMessage)
      setMessage('')
    }
  }, [message, room, username])

  const handleInputSubmitMessage = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      if (event.code !== 'Enter') return
      submitNewMessage()
    },
    [submitNewMessage]
  )

  const handleButtonSubmitMessage = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault()
      submitNewMessage()
    },
    [submitNewMessage]
  )

  const chatContextMemo = useMemo(
    () => ({
      message,
      username,
      room,
      messagesRoom,
      initChatRoom,
      updateMessage,
      handleInputSubmitMessage,
      handleButtonSubmitMessage,
    }),
    [
      message,
      username,
      room,
      messagesRoom,
      initChatRoom,
      handleInputSubmitMessage,
      handleButtonSubmitMessage,
    ]
  )

  return (
    <chatContext.Provider value={chatContextMemo}>
      {children}
    </chatContext.Provider>
  )
}
