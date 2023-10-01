import {createTheme, TextInput} from "@mantine/core";
import {Inter} from "next/font/google";

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    weight: ['300', '400', '600'],
    variable: '--font-inter',
});

const Theme = createTheme({
    fontFamily: inter.style.fontFamily,

    a: {
        color: 'red'
    },

    components: {
        TextInput: TextInput.extend({
            styles: {
                root: {
                    marginBottom: '24px'
                },
                input: {
                    backgroundColor: '#fff',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #D4D4D8'
                },
            },
        }),
    },
})

export default Theme