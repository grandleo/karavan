'use client'

import {List, Text, Title, Container, Box} from "@mantine/core";
import {HeaderHome} from "@/components/ui/header";
import {HomeFooter} from "@/components/ui/Footer";
import {useTranslation} from "@/hooks/useTranslation";

const PrivacyPage = () => {
    const { trans } = useTranslation();
    const title = trans('privacy', 'title');
    const updated = trans('privacy', 'updated', { date: '2025-01-21' });

    return (
        <>
            <HeaderHome/>

            <Container size="md" mt={120}>
                <Title order={1}>{title}</Title>
                <Text size="sm" mt="sm" color="dimmed">
                    {updated}
                </Text>

                {/* Section 1 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section1.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section1.items.operator')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section1.items.personalData')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section1.items.processing')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section1.items.user')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 2 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section2.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section2.items.rule')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section2.items.agreement')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section2.items.refusal')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section2.items.scope')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 3 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section3.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section3.items.obligation')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section3.items.data')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 4 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section4.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section4.items.registration')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section4.items.identification')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section4.items.feedback')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section4.items.improvement')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section4.items.security')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 5 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section5.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section5.items.methods')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section5.items.storage')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section5.items.duration')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 6 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section6.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section6.items.request')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section6.items.update')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section6.items.withdraw')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section6.items.complaint')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 7 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section7.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section7.items.guarantee')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section7.items.cases')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 8 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section8.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section8.items.usage')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section8.items.disable')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 9 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section9.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section9.items.measures')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section9.items.encryption')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 10 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section10.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section10.items.public')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section10.items.known')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section10.items.obtained')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section10.items.consent')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 11 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section11.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section11.items.pretrial')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section11.items.term')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 12 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section12.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section12.items.updates')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section12.items.effective')}</Text>
                        </List.Item>
                    </List>
                </Box>

                {/* Section 13 */}
                <Box mt="lg">
                    <Title order={2} mt="lg" mb="xs">
                        {trans('privacy', 'section13.title')}
                    </Title>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section13.items.company')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section13.items.address')}</Text>
                        </List.Item>
                        <List.Item>
                            <Text size="sm">{trans('privacy', 'section13.items.email')}</Text>
                        </List.Item>
                    </List>
                </Box>
            </Container>

            <HomeFooter/>
            </>
    )
}

export default PrivacyPage;