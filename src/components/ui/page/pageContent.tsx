import {ScrollArea} from "@mantine/core";
import classes from './page.module.css';

interface Props {
    children: React.ReactNode,
    fullHeight?: boolean,
}

const PageContent = ({children, fullHeight}: Props) => {
    return (
        <ScrollArea className={`${classes.pageContent} ${fullHeight ? classes.pageContentFullHeight : null}`}>
            {children}
        </ScrollArea>
    )
}

export default PageContent;