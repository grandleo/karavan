import {createTheme, NumberInput, TextInput} from "@mantine/core";
import {Inter} from "next/font/google";
import classes from "./global.module.css";

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
            classNames: {
                root: classes.textInputRoot,
                input: classes.textInput,
                label: classes.textInputLabel,
                description: classes.textInputDescription,
            },
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
        NumberInput: NumberInput.extend({
            classNames: {
                root: classes.textInputRoot,
                input: classes.textInput,
                label: classes.textInputLabel,
                description: classes.textInputDescription,
            },
        }),
    },
})

export default Theme