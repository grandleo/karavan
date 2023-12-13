import {useState} from "react";
import {Box, Collapse, Group, rem, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import classes from "@/components/ui/NavBar/navbar.module.css";
import {IconChevronRight} from "@tabler/icons-react";
import Icons from "@/components/ui/Icons/Icons";
import Link from "next/link";

interface LinksGroupProps {
    icon: string;
    name: string;
    initiallyOpened?: boolean;
    children?: { name: string; url: string }[];
    url: string;
    theme: string;
}

const LinksGroupNB = ({name, url, icon, children,initiallyOpened, theme}: LinksGroupProps) => {
    const hasChildren = Array.isArray(children) && children.length > 0;
    const [opened, setOpened] = useState(initiallyOpened || false);

    const child = (hasChildren ? children : []).map((link, index: number) => (
        <Text
            component={Link}
            className={classes.link}
            href={link.url}
            key={index}
            // onClick={(event) => event.preventDefault()}
        >
            {link.name}
        </Text>
    ));

    return (
        <>
            {hasChildren ? (
                <>
                <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                    <Group justify="space-between" gap={0}>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <ThemeIcon variant="light" size={30} color={theme === 'dark' ? '#fff' : "#3B9F98"} className={classes.navIcon}>
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
                <Collapse in={opened}>{child}</Collapse>
                </>
            ): (<>
                <Text
                    component={Link}
                    className={`${classes.control} ${classes.simpleLink}`}
                    href={url}
                >
                    <ThemeIcon variant="light" size={30} color={theme === 'dark' ? '#fff' : "#3B9F98"} className={classes.navIcon}>
                        <Icons iconName={icon}/>
                    </ThemeIcon>
                    {name}
                </Text>
            </>)}
        </>
    )
}

export default LinksGroupNB;