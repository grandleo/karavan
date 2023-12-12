'use client'

import {Group, Code, ScrollArea, rem, Text, UnstyledButton, Box, ThemeIcon, Collapse} from '@mantine/core';
import {
    IconNotes,
    IconCalendarStats,
    IconGauge,
    IconPresentationAnalytics,
    IconFileAnalytics,
    IconAdjustments,
    IconLock, IconChevronRight, IconLogout, IconSettings,
} from '@tabler/icons-react';

import classes from "./navbar.module.css";
import {useState} from "react";
import {useGetMenuItemsQuery} from "@/store/api/menu.api";
import Icons from "@/components/ui/Icons/Icons";
import LinksGroupNB from "@/components/ui/Links/LinksGroupNB";

const mockdata = [
    { label: 'Dashboard', icon: IconGauge },
    {
        label: 'Market news',
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Forecasts', link: '/' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
        ],
    },
    {
        label: 'Releases',
        icon: IconCalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', icon: IconPresentationAnalytics },
    { label: 'Contracts', icon: IconFileAnalytics },
    { label: 'Settings', icon: IconAdjustments },
    {
        label: 'Security',
        icon: IconLock,
        links: [
            { label: 'Enable 2FA', link: '/' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },
];

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
}

const LinksGroup = ({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) => {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <Text
            component="a"
            className={classes.link}
            href={link.link}
            key={link.label}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Text>
    ));

    return (
        <>



            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon style={{ width: rem(18), height: rem(18) }} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
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
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}

const NavBar = () => {
    const {data: menuItems} = useGetMenuItemsQuery('');
    console.log('menuItems', menuItems)
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    const menu = menuItems?.map((item) => <LinksGroupNB {...item} key={item.label} />);

    console.log(menu)

    return (
        <>
            <nav className={classes.navbar}>
                <div className={classes.header}>
                    <Group justify="space-between">
                        {/*<Logo style={{ width: rem(120) }} />*/}
                        <Code fw={700}>v3.1.2</Code>
                    </Group>
                </div>

                <ScrollArea className={classes.links}>
                    <div className={classes.linksInner}>{menu}</div>
                </ScrollArea>

                <div className={classes.footer}>
                    {/*<UserButton />*/}
                    <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                        <IconLogout className={classes.linkIcon} stroke={1.5} />
                        <span>Logout</span>
                    </a>
                </div>
            </nav>
        </>
    );
}

export default NavBar;