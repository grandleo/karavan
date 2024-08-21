import {Box, Flex, Image, Text, Tooltip} from "@mantine/core";
import NextImage from "next/image";
import classes from "@/components/externalItems/styles.module.css";

const ProductNameItem = ({item}: ProductNameItemProps) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Flex align="center" gap={5}>
                <Tooltip label={item.producer_country_data.name}>
                    <Image
                        component={NextImage}
                        src={item.producer_country_data.image_url}
                        alt={item.producer_country_data.name}
                        width={20}
                        height={20}
                        fit="contain"
                    />
                </Tooltip>
                <Box>
                    <Text className={classes.productName}>
                        {item.name}
                    </Text>
                </Box>
            </Flex>
            <Text className={classes.productSpecifications}>
                <Text span className={classes.productSpecificationLabel}>Артикул:</Text> {item.article}
            </Text>
            {item.card_specifications?.length > 0 && item.card_specifications.map((spec, idx) => (
                <Text key={idx} className={classes.productSpecifications}>
                    <Text span className={classes.productSpecificationLabel}>{spec.label}:</Text> {spec.value}
                </Text>
            ))}
            {item?.period_validity && (
                <Text className={classes.productSpecifications}>
                    <Text span className={classes.productSpecificationLabel}>Срок годности до:</Text> {formatDate(item.period_validity)}
                </Text>
            )}
        </>
    )
}

export default ProductNameItem;