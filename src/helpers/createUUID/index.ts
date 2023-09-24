import { v4 as uuidv4 } from 'uuid'

export const createUUID = () => {
  return uuidv4()
}

export const createNumberID = () => {
  return Math.floor(Math.random() * 6000000000) + 1
}
