import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
export default function MainPage() {
  return (
    <div>
      <Link to={"/signUp"} className="linkButton">
        signUp
      </Link>
      <Link to={"SignIn"} className="linkButton">
        signIn
      </Link>
      <Link to={"productScreen"} className="linkButton">
        ProductScreen
      </Link>
      <h1>main page</h1>
    </div>
  );
}
