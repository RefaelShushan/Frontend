import { Box, Input } from '@mui/material'

type Props = {}

const NavBar = (props: Props) => {
    return (
        <Box sx={{
            width: 1150,
            height: 70,
            background: 'blue',
            color: 'gold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>
            <Input sx={{ background: 'white',width: 500, padding: '0px 3px' }} placeholder='Search...' />
        </Box>
    )
}

export default NavBar