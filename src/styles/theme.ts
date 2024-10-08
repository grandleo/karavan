import {
    ActionIcon,
    Button, Checkbox,
    CloseButton,
    createTheme,
    Divider,
    Drawer,
    Modal, Radio,
    Select,
    Switch,
    TextInput
} from "@mantine/core";

const Theme = createTheme({
    components: {
        Modal: Modal.extend({
            styles: {
                title: {
                    fontSize: '24px',
                    fontWeight: 800,
                    lineHeight: '28px',
                    textAlign: 'center'
                },
            }
        }),
        CloseButton: CloseButton.extend({
            defaultProps: {
                classNames: {
                    root: 'custom-close-button-root',
                },
            },
        }),
        Button: Button.extend({
            vars: (theme, props) => {
                // if (props.variant === 'filled') {
                //     return {
                //         root: {'--button-bg': '#436CFB'}
                //     }
                // }

                if (props.variant === 'outline') {
                    return {
                        root: {'--button-bd': '2px solid #436CFB'}
                    }
                }

                return {root: {}};
            },

            defaultProps: {
                variant: 'filled',
            },
        }),
        ActionIcon: ActionIcon.extend({
            vars: (theme, props) => {
                return {root: {}}
            },

            defaultProps: {
                variant: 'filled',
            }
        }),
        Divider: Divider.extend({
            styles: {
                label: {
                    color: '#1B1F3BE5',
                    fontSize: '15px',
                    fontWeight: 500,
                    lineHeight: '24px',
                }
            }
        }),
        Drawer: Drawer.extend({
            styles: (theme, props) => ({
                header: {
                    borderBottom: "1px solid #EAEDF4",
                },

                title: {
                    color: "#1B1F3BE5",
                    fontSize: "28px",
                    lineHeight: "32px",
                    fontWeight: 800,
                    paddingLeft: '20px'
                },

                content: {
                    ...(props.position === 'right' && {
                        borderTopLeftRadius: 24,
                        borderBottomLeftRadius: 24,
                    }),

                    ...(props.position === 'left' && {
                        borderTopRightRadius: 24,
                        borderBottomRightRadius: 24,
                    })
                }
            }),

            defaultProps: {
                position: 'right',
            },
        }),
        TextInput: TextInput.extend({
            styles: {
                label: {
                    color: "#1B1F3BA6",
                    fontSize: "11px",
                    fontWeight: 500,
                    fontHeight: "16px",
                    letterSpacing: "0.4px"
                }
            }
        }),
        Select: Select.extend({
            styles: {
                label: {
                    color: "#1B1F3BA6",
                    fontSize: "11px",
                    fontWeight: 500,
                    fontHeight: "16px",
                    letterSpacing: "0.4px"
                }
            }
        }),
        Switch: Switch.extend({
            styles: {
                label: {
                    color: "#1B1F3BE5",
                    fontSize: "15px",
                    lineHeight: "24px",
                    fontWeight: 500
                }
            }
        }),
        Radio: Radio.extend({
            styles: {
                label: {
                    color: "#1B1F3BE5",
                    fontSize: "13px",
                    lineHeight: "20px",
                    fontWeight: 500
                }
            }
        }),
        Checkbox: Checkbox.extend({
            styles: {
                body: {
                    alignItems: "center",
                },

                label: {
                    color: "#1B1F3BE5",
                    fontSize: "15px",
                    lineHeight: "24px",
                    fontWeight: 500
                }
            }
        }),
    },
});


export default Theme;