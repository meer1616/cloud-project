// ConfirmUser.js
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmUser } from '../services/confirmuser';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';
const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    confirmationCode: yup.string().required('Confirmation code is required'),
});

const ConfirmEmail = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate()
    const onSubmit = data => {
        confirmUser(data.email, data.confirmationCode)
            .then(response => {
                alert('User confirmed successfully!');
                console.log(response);
                if (response === "SUCCESS") {
                    navigate('/login')
                }
                // Optionally, redirect to the login page or another page
            })
            .catch(err => {
                console.error('Error confirming user:', err);
                alert('Failed to confirm user. Please check the confirmation code and try again.');
            });
    };

    return (
        <Flex justifyContent="center" alignItems="center" h="100vh">


            <Box border="1px solid lightgray" borderRadius="2xl" w="30%" m="0 auto" p="5" boxShadow="xl">
                <Text textAlign="center" fontSize="xl" my="5">Check your inbox to confirm the email </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Text mt="3">Email</Text>
                        <Input type="email" {...register('email')} />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div>
                        <Text mt="3">Confirmation Code</Text>
                        <Input type="text" {...register('confirmationCode')} />
                        {errors.confirmationCode && <p>{errors.confirmationCode.message}</p>}
                    </div>
                    <br />

                    <Button type="submit" colorScheme='blue' w="100%">Confirm</Button>
                </form>
            </Box>
        </Flex>

    );
};

export default ConfirmEmail;
