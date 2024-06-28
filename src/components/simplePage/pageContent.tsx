import {Box, ScrollArea} from "@mantine/core";
import classes from './page.module.css';

interface Props {
    children: React.ReactNode,
    fullHeight?: boolean,
    noPadding?: boolean
}

const PageContent = ({children, fullHeight, noPadding = false}: Props) => {

    return (
            <ScrollArea
                className={classes.pageContent}
            >
                {children}
            </ScrollArea>
    )
}

export default PageContent;