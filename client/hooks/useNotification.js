import {useContext} from "react"
import { NotificationContext } from "../context/NotificationProvider"


export default function useNotification(){ return useContext(NotificationContext)}


