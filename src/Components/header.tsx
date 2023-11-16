// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SvgIconsSize from '../Icon/IconHome';


// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           <SvgIconsSize/>
//           </Typography>
//           {/* <Button color="inherit"></Button> */}
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SvgIconsSize from '../Icon/IconHome';
import { Link } from "react-router-dom";

import { useContext } from 'react';
import { Name } from '../Context/loginContext';

import IconCart from '../Icon/IconCart';

function DisplayUserName() {
  const userContext = useContext(Name);
  

  const name = userContext?.name || "guest";

  return (
    <div>
      <p>User Name: {name}</p>
    </div>
  );
}


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ width: '100%', top: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <SvgIconsSize />
          </Typography>
          <Button><Link to={"/cart"} className="linkButton" style={{ color: 'white' }}> <IconCart /> </Link></Button>
         <Button><Link to={"/signUp"} className="linkButton" style={{ color: 'white' }}>signUp </Link></Button><Button><Link to={"/signIn"} className="linkButton"style={{ color: 'white' }}> signIn </Link>  </Button>
           {DisplayUserName()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
