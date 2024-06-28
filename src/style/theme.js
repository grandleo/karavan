import {
    Autocomplete,
    Button,
    Checkbox,
    Container,
    createTheme, Drawer,
    NumberInput, Paper,
    SegmentedControl, Select,
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
        Autocomplete: Autocomplete.extend({
            styles: {
                root: {
                    marginBottom: '16px',
                }
            }
        }),
        Container: Container.extend({
            defaultProps: {
                size: 'xl'
            }
        }),
        TextInput: TextInput.extend({
            styles: {
                root: {
                    marginBottom: '16px',
                    position: "relative"
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
        }),
        Drawer: Drawer.extend({
            styles: {
                content: {
                    borderRadius: '25px 0 0 0'
                },
                header: {
                    borderBottom: '1px solid #E0E0E0',
                },
                title: {
                    fontSize: '28px',
                    fontWeight: 800,
                    lineHeight: '32px'

                }
            }
        }),
        Select: Select.extend({
            styles: {
                label: {
                    fontSize: '14px',
                    lineHeight: '16px',
                    letterSpacing: '0.4px',
                    color: 'rgba(27, 31, 59, 0.65)'
                },
                root: {
                    marginBottom: '10px'
                }
            }
        })
    },
})

export default Theme