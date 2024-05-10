import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

function CreateTeamForm() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const formBackgroundColor = useColorModeValue('gray.100', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'white');
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const teamData = {
            name: name,
            details: details
        };

        try {
            const response = await fetch('http://localhost:3000/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamData),
                credentials: 'include' // cookies
            });
            if (response.status === 200) {
                toast({
                    title: 'チームを作成しました',
                    status:'チームの作成に成功しました！',
                    duration: 5000,
                    isClosable: true,
                });
                router.push('/ChooseProfilePicture');
            } else {
                throw new Error('チームの作成に失敗しました');
            }
        } catch (error) {
                toast({
                    title: 'チームの作成に失敗しました',
                    status: error.message,
                    duration: 5000,
                    isClosable: true,
                });
        }
    };

    return (
        <Box
            p={8}
            maxWidth="500px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            bg={formBackgroundColor}
            mx="auto"
            my={12}
        >
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <FormControl isRequired>
                    <FormLabel htmlFor="name" color={textColor}>チーム名</FormLabel>
                    <Input
                        id="name"
                        placeholder=""
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel htmlFor="details" color={textColor}>チーム詳細</FormLabel>
                    <Textarea
                        id="details"
                        placeholder="東京の江東区を中心に活動中！楽しみながら真剣に野球をしませんか？
                                    20代後半〜30代の初心者・経験者混合チームです。何卒宜しくお願いします。"
                        rows="4"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </FormControl>

                <Button
                    type="submit"
                    colorScheme="teal"
                    width="full"
                    mt={4}
                >
                    チームを作成
                </Button>
            </form>
        </Box>
    );
}

export default CreateTeamForm;