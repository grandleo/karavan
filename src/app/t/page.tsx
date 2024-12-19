import {Card, Flex, Progress, Text} from "@mantine/core";


export default function Page() {
    return (
        <>
            <Card radius="md" mb={8}>
                <Text
                    style={{
                        color: '#1B1F3BE5',
                        fontSize: '19px',
                        lineHeight: '24px',
                        marginBottom: '28px',
                        textAlign: 'center'
                    }}>Заказ #</Text>
                <Text
                    style={{
                        color: '#1B1F3BE5',
                        fontSize: '19px',
                        lineHeight: '24px',
                        marginBottom: '28px',
                        textAlign: 'center'
                }}
                >Комплектуется</Text>
                <Progress value={30} size="sm" radius="xl" color="green" style={{ marginBottom: '16px' }}/>
                <Flex
                    justify="space-evenly"
                    align="center"
                >
                    <Text
                        style={{
                            color: '#1B1F3B73',
                            fontSize: '15px',
                            lineHeight: '24px',
                        }}
                    >60 шт</Text>
                    <Text
                        style={{
                            color: '#1B1F3B73',
                            fontSize: '15px',
                            lineHeight: '24px',
                        }}>03.06.23</Text>
                    <Text
                        style={{
                            color: '#1B1F3B73',
                            fontSize: '15px',
                            lineHeight: '24px',
                        }}>$ 1 250</Text>
                </Flex>
            </Card>
        </>
    )
}