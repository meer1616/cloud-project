/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaStar, FaHeart } from "react-icons/fa";

const TestimonialOuter = () => {
    const { spaceId } = useParams();
    const [testimonials, setTestimonials] = useState([]);
    const [spaceObj, setSpaceObj] = useState({});
    const [changedIsLove, setChangedIsLove] = useState(false);
    const [activeTab, setActiveTab] = useState("testimonials");
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);

    const handleGenerateIframe = (testimonial) => {
        setSelectedTestimonial(testimonial);

        const iframeCode = `<iframe src="${window.location.origin}/individual/testimonials/${testimonial.id}" width="100%" height="600px" frameBorder="0"></iframe>`;
        navigator.clipboard.writeText(iframeCode);
        alert('Iframe code copied to clipboard!');
    };

    useEffect(() => {
        const fetchData = async () => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/get-testimonial-of-space`, { spaceId })
                .then(resp => {
                    setTestimonials(JSON.parse(resp.data.body));
                }).catch(err => {
                    console.log(err);
                });
        };
        fetchData();
    }, [changedIsLove]);

    useEffect(() => {
        const fetchSpaceData = async () => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/get-space-by-id`, { id: spaceId })
                .then(resp => {
                    setSpaceObj(JSON.parse(resp.data.body));
                }).catch(err => {
                    console.log(err);
                });
        };
        fetchSpaceData();
    }, [spaceId]);

    const handleLovedUpdate = (id, isLoved) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/update-testimonial`, { id, isLoved: !isLoved }).then(resp => {
            setChangedIsLove((old) => !old);
        }).catch(err => {
            console.log(err);
        });
    };

    console.log("selectedTestimonial", selectedTestimonial);

    return (
        <Flex justifyContent="center" alignItems="center" h="100vh" flexDir="column">
            <Flex justifyContent="center" alignItems="center" borderBottom="1px solid gray" my="5">
                <Image src={spaceObj.imageFile} w="10%" p="5"></Image>
                <Flex flexDir="column">
                    <Text fontWeight="bolder">{spaceObj.spaceName}</Text>
                    <Flex>
                        Space public URL:
                        <Text color='blue' ml="1">
                            <Link to={{ pathname: `/${spaceObj.id}` }}>{process.env.REACT_APP_RUNNING_ENVIROMENT}{spaceObj.id}</Link>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w="95%" m="auto">
                <Box fontSize="xl">
                    <Box my="4">
                        <Text color="grey">Inbox</Text>
                        <Text mt="1" onClick={() => setActiveTab('testimonials')} backgroundColor={activeTab === 'testimonials' ? "lightgray" : ""} p="2" borderRadius="5px" _hover={{ cursor: "pointer" }}>
                            All Testimonials
                        </Text>
                    </Box>
                    <Box my="4">
                        <Text color="grey">Embeds</Text>
                        <Text mt="1" onClick={() => setActiveTab('walloflove')} backgroundColor={activeTab === 'walloflove' ? "lightgray" : ""} p="2" borderRadius="5px" _hover={{ cursor: "pointer" }}>
                            Wall of Love
                        </Text>
                    </Box>
                </Box>
                <Flex w="80%" m="auto" fontSize="large" flexWrap="wrap">
                    {testimonials
                        .filter(testimonial => activeTab === 'testimonials' || (activeTab === 'walloflove' && testimonial.isLoved))
                        .map((testimonial, index) => (
                            <Box key={index} border="1px solid lightgray" mx="5" boxShadow="xl" p="7" borderRadius="xl" w="28%" position="relative">
                                <Box position="absolute" top="3" right="3" _hover={{ cursor: "pointer" }} onClick={() => handleLovedUpdate(testimonial.id, testimonial.isLoved)}>
                                    {activeTab === 'testimonials' && <FaHeart color={testimonial.isLoved ? "red" : "gray"} />}
                                </Box>
                                <Flex my="3">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Box key={index} color={index < testimonial.rating ? 'yellow' : 'gray'}>
                                            <FaStar />
                                        </Box>
                                    ))}
                                </Flex>
                                <Image borderRadius="5px" m="auto" src={testimonial.imageFile} alt="Image" h="30vh" w="100%"></Image>
                                <Text my="3">{testimonial.testimonial}</Text>
                                <Text my="3" textAlign="left">Name: {testimonial.name}</Text>
                                <Text textAlign="left">Email: {testimonial.email}</Text>
                                <Box>
                                    <Button onClick={() => handleGenerateIframe(testimonial)}>Generate Iframe</Button>
                                    {/* <Input value={<iframe src="${window.location.origin}/testimonial/selected-testimonial-id" width="100%" height="600px" frameBorder="0"></iframe>} readOnly /> */}
                                </Box>
                            </Box>
                        ))}
                </Flex>
                {/* {selectedTestimonial && (
                    <IndividualTestimonial testimonial={selectedTestimonial} />
                )} */}
            </Flex>
        </Flex>
    );
};

export default TestimonialOuter;
