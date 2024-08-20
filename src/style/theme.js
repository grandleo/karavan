import {
    Autocomplete,
    Button,
    Checkbox,
    Container,
    createTheme, Drawer, MultiSelect,
    NumberInput, Paper,
    SegmentedControl, Select,
    Switch, Table,
    TextInput
} from "@mantine/core";
import {Inter, Manrope} from "next/font/google";
import classes from "./global.module.css";

const manrope = Manrope({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    weight: ['300', '400', '600'],
    variable: '--font-manrope',
});

const Theme = createTheme({
    fontFamily: manrope.style.fontFamily,

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
                label: {
                    fontSize: '14px',
                    lineHeight: '16px',
                    letterSpacing: '0.4px',
                    color: 'rgba(27, 31, 59, 0.65)'
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
                color: "#436CFB"
            }
        }),
        Switch: Switch.extend({
            defaultProps: {
                color: "#436CFB"
            }
        }),
        Checkbox: Checkbox.extend({
            defaultProps: {
                color: "#436CFB"
            }
        }),
        SegmentedControl: SegmentedControl.extend({
            defaultProps: {
                color: "#436CFB"
            }
        }),
        Table: Table.extend({
            styles: {
                tr: {
                    // borderBottom: '1px solid rgba(246, 246, 246, 1)',
                },
                th: {
                    color: 'rgba(25, 28, 48, 0.45)',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '18px',
                    whiteSpace: 'nowrap',
                },
                td: {
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '18px',
                    whiteSpace: 'nowrap',
                },
            },
        }),
        Paper: Paper.extend({
            styles: {
                root: {}
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
        MultiSelect: MultiSelect.extend({
            styles: {
                label: {
                    fontSize: '14px',
                    lineHeight: '16px',
                    letterSpacing: '0.4px',
                    color: 'rgba(27, 31, 59, 0.65)'
                },
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