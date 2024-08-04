/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom';

const IndividualTestimonial = () => {
    const { testimonialId } = useParams();
    const [testimonial, setTestimonial] = useState(null);

    useEffect(() => {
        // Fetch testimonial data based on id
        axios.post(`${process.env.REACT_APP_BASE_URL}/get-testimonial-by-id`, { id: testimonialId }).then(resp => {

            console.log("resp.data", resp.data);
            setTestimonial(JSON.parse(resp.data.body))
        }).catch(err => {
            console.log(err);
        })
    }, []);

    if (!testimonial) {
        return <div>Loading...</div>;
    }

    return (
        <Box width="30vw" m="auto">
            <Box border="1px solid lightgray" boxShadow="xl" p="7" borderRadius="xl" w="100%" h="100%" position="relative">
                <Box position="absolute" top="3" right="3" _hover={{ cursor: "pointer" }} >
                    {/* {activeTab === 'testimonials' && <FaHeart color={testimonial.isLoved ? "red" : "gray"} />} */}
                </Box>
                <Flex justifyContent="start" alignItems="center">
                    <Image borderRadius="5px" src={testimonial.imageFile} alt="Image" h="10vh" w="20%" style={{ borderRadius: "50%" }}></Image>
                    <Text ml="5" fontWeight="bold">{testimonial.name}</Text>
                </Flex>
                <Flex my="5">
                    {Array.from({ length: 5 }, (_, index) => (
                        <Box key={index} >
                            <FaStar size="25px" color={index + 1 <= testimonial.rating ? "yellow" : ""} />
                        </Box>
                    ))}
                </Flex>
                <Image borderRadius="5px" m="auto" src={testimonial.imageFile} alt="Image" h="45vh" w="100%"></Image>
                <Text my="3" fontSize="large">{testimonial.testimonial}</Text>
                {/* <Text textAlign="left">Email: {testimonial.email}</Text> */}
                {/* <Box>
                    <Button >Generate Iframe</Button> */}
                {/* <Input value={<iframe src="${window.location.origin}/testimonial/selected-testimonial-id" width="100%" height="600px" frameBorder="0"></iframe>} readOnly /> */}
                {/* </Box> */}
            </Box>
        </Box>
    )
}

export default IndividualTestimonial