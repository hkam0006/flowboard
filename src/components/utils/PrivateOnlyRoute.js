import { Navigate } from "react-router-dom"
import useStore from "../../store"

export default function PrivateOnlyRoute({Component}) {
  const {isLogin} = useStore()
  return isLogin ? <Component /> : <Navigate to="/" replace/>
}
