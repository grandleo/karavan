'use client'

import {HeaderHome} from "@/components/ui/header";
import {HomeFooter} from "@/components/ui/Footer";
import {List, Text, Title, Container, Box} from "@mantine/core";
import {useTranslation} from "@/hooks/useTranslation";

const ProcessingScreen = () => {
    const { trans } = useTranslation();

    const title = trans('processing', 'title');
    const updated = trans('processing', 'updated', { date: '2025-01-21' });

    return (
        <>
            <HeaderHome />
            <Container size="md" mt={120}>
                <Title order={1}>{title}</Title>
                <Text size="sm" mt="sm" color="dimmed">
                    {updated}
                </Text>

                {/* Section 1 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('processing', 'section1.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section1.items.fullName')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section1.items.phone')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section1.items.email')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section1.items.company')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section1.items.language')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 2 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('processing', 'section2.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section2.items.account')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section2.items.services')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section2.items.notifications')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section2.items.personalization')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section2.items.quality')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 3 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('processing', 'section3.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section3.items.methods')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section3.items.storage')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 4 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('processing', 'section4.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section4.items.information')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section4.items.correction')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section4.items.withdrawal')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 5 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('processing', 'section5.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section5.items.consent')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('processing', 'section5.items.notice')}</Text>
                        </List.Item>
                    </List>
                </Box>
            </Container>
            <HomeFooter />
        </>
    );
}

export default ProcessingScreen;