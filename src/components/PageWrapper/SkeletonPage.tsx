import {ReactNode} from "react";
import {Flex, Skeleton} from "@mantine/core";

interface SkeletonPageProps {
    skeleton?: ReactNode;
}

const SkeletonPage = ({skeleton}: SkeletonPageProps) => {
    return (
        <Flex direction="column" gap={8}>
            <Skeleton height={20}/>
            <Skeleton height={20}/>
            <Skeleton height={20}/>
            <Skeleton height={20}/>
        </Flex>
    )
}

export default SkeletonPage;