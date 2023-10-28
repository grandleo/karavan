import {ScrollArea} from "@mantine/core";
import classes from './page.module.css';

interface Props {
    children: React.ReactNode,
    fullHeight?: boolean,
    noPadding?: boolean
}

const PageContent = ({children, fullHeight, noPadding = false}: Props) => {
    return (
        <ScrollArea className={`${classes.pageContent} ${fullHeight ? classes.pageContentFullHeight : null} ${noPadding ? classes.pageWrapperNoPadding : '214'}`}>
            {children}
        </ScrollArea>
    )
}

export default PageContent;