import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// export default function IconCart() {
//   return (
//     <Stack direction="row" spacing={1}>
//       <IconButton  color="primary" aria-label="add to shopping cart">
//         <AddShoppingCartIcon fontSize="large" />
//       </IconButton>
//     </Stack>
//   );
// }
export default function IconCart() {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          style={{ backgroundColor: 'white' }}
          aria-label="add to shopping cart"
        >
          <AddShoppingCartIcon fontSize="large" style={{ color: 'black' }} />
        </IconButton>
      </Stack>
    );
  }