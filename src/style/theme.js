import {
    createTheme,
} from "@mantine/core";
import {Manrope} from "next/font/google";

const manrope = Manrope({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    weight: ['300', '400', '600'],
    variable: '--font-manrope',
});

const Theme = createTheme({
    fontFamily: manrope.style.fontFamily,

    components: {

    },
})

export default Theme