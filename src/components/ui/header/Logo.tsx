import NextImage from 'next/image';
import {Box, Container, Image, Text} from "@mantine/core";

const Logo = () => {
    return (
        <Box>
            <Image component={NextImage} src="./images/logo.svg" width={180} height={46} alt=""/>
        </Box>
    )
}

export default Logo;