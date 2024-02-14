import {
    Button,
    Checkbox,
    Container,
    createTheme,
    NumberInput, Paper,
    SegmentedControl,
    Switch, Table,
    TextInput
} from "@mantine/core";
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
        Container: Container.extend({
            defaultProps: {
                size: 'xl'
            }
        }),
        TextInput: TextInput.extend({
            classNames: {
                root: classes.textInputRoot,
                input: classes.textInput,
                label: classes.textInputLabel,
                description: classes.textInputDescription,
            },
            styles: {
                root: {
                    marginBottom: '24px',
                    position: "relative"
                },
                input: {
                    backgroundColor: '#fff',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #D4D4D8'
                },
                error: {
                    position: "absolute",
                    left: 0,
                    bottom: "-20px"
                }
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
        Button: Button.extend({
            defaultProps: {
                color: "#1470C6"
            }
        }),
        Switch: Switch.extend({
            defaultProps: {
                color: "#1470C6"
            }
        }),
        Checkbox: Checkbox.extend({
            defaultProps: {
                color: "#1470C6"
            }
        }),
        SegmentedControl: SegmentedControl.extend({
            defaultProps: {
                color: "#1470C6"
            }
        }),
        Table: Table.extend({
            styles: {
                thead: {
                    backgroundColor: 'rgb(239 239 239)',
                },
                th: {
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    letterSpacing: 0,
                    textAlign: 'left',
                    height: '45px',
                    whiteSpace: 'nowrap',
                },
            },
        }),
        Paper: Paper.extend({
            styles: {
                root: {
                    boxShadow: '0px 0px 7px 0px rgba(0, 0, 0, 0.2)',
                    // boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.12)',
                }
            }
        })
    },
})

export default Theme