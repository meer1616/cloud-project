import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { logout } from '../services/authenticate';

const Navbar = () => {

    const handleLogOut = () => {
        console.log('logout')
        logout();
    };

    return (
        <Box p="4" background="lightgray">
            <Flex justifyContent="space-between" alignItems="center">
                <Box>logo</Box>
                <Box>
                    <Button backgroundColor="black" color="white" onClick={handleLogOut}>
                        Logout
                    </Button>
                </Box>
            </Flex>

        </Box>
    )
}

export default Navbar