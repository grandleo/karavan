import {useState} from "react";
import {Box, Collapse, Group, rem, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import classes from "@/components/ui/NavBar/navbar.module.css";
import {IconChevronRight} from "@tabler/icons-react";
import Icons from "@/components/ui/Icons/Icons";

interface LinksGroupProps {
    icon: string;
    name: string;
    initiallyOpened?: boolean;
    children?: { name: string; url: string }[];
    url: string;
}

const LinksGroupNB = ({name, url, icon, children,initiallyOpened}: LinksGroupProps) => {
    const hasChildren = Array.isArray(children);
    const [opened, setOpened] = useState(initiallyOpened || false);

    const childrens = (hasChildren ? children : []).map((link) => (
        <Text
            component="a"
            className={classes.link}
            href={link.url}
            key={link.name}
            onClick={(event) => event.preventDefault()}
        >
            {link.name}
        </Text>
    ));

    return (
        <>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            {/*<Icon style={{ width: rem(18), height: rem(18) }} />*/}
                            <Icons iconName={icon}/>
                        </ThemeIcon>
                        <Box ml="md">{name}</Box>
                    </Box>
                    {hasChildren && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasChildren ? <Collapse in={opened}>{childrens}</Collapse> : null}
        </>
    )
}

export default LinksGroupNB;