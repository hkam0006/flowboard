import { Navigate } from "react-router-dom";
import useStore from "../../store"

export default function PublicOnlyRoute({Component}) {
  const { isLogin } = useStore();
  return isLogin ? <Navigate to="/boards" replace/> : <Component />
}
