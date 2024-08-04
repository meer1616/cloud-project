import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { logout } from '../services/authenticate';

const Navbar = () => {

    const handleLogOut = () => {
        console.log('logout')
        logout();
    };

    return (
        <Box p="5" background="lightgray">
            <Flex justifyContent="space-between" alignItems="center" w="95%" m="auto">
                <Text fontSize="2xl">Testimonials</Text>
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