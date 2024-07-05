import {useState} from "react";
import {ActionIcon, Box, Collapse, Group, rem, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import classes from "@/components/navBar/styles.module.css";
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
            className={`${classes.link}`}
            href={link.url}
            key={index}
        >
            {link.name}
        </Text>
    ));

    return (
        <>
            {hasChildren ? (
                <>
                <UnstyledButton onClick={() => setOpened((o) => !o)} className={`${classes.control}`}>
                    <Group justify="space-between" gap={0}>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <ActionIcon variant="transparent" color={theme === 'dark' ? '#fff' : "#303345"}>
                                <Icons iconName={icon}/>
                            </ActionIcon>
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
                    <ActionIcon variant="transparent" color={theme === 'dark' ? '#fff' : "#303345"}>
                        <Icons iconName={icon}/>
                    </ActionIcon>
                    {name}
                </Text>
            </>)}
        </>
    )
}

export default LinksGroupNB;