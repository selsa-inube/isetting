import { LoadingAppUI } from "./interface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface LoadingProps {
  time?: number;
}
function LoadingApp(props: LoadingProps) {
  const { time = 2000 } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, time);

    return () => clearTimeout(timer);
  }, [navigate, time]);

  return <LoadingAppUI />;
}

export { LoadingApp };
