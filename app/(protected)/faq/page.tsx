'use client'
import { Container, Title, Accordion } from '@mantine/core'
import classes from './styles.module.css'

import Link from 'next/link'

export default function Page() {
    return (
        <Container size="sm" className={classes.wrapper}>
            <Title ta="center" className={classes.title}>
                Frequently Asked Questions
            </Title>

            <Accordion variant="separated">
                <Accordion.Item className={classes.item} value="reset-password">
                    <Accordion.Control>
                        How can I reset my password?
                    </Accordion.Control>
                    <Accordion.Panel>
                        If you&apos;ve forgotten your password, you can reset it
                        by clicking the &apos;Forgot Password&apos; link on the
                        login page. Instructions for resetting your password
                        will be sent to your registered email address.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                    className={classes.item}
                    value="another-account"
                >
                    <Accordion.Control>
                        Can I create more than one account?
                    </Accordion.Control>
                    <Accordion.Panel>
                        Yes, you can create multiple accounts if they represent
                        different organizations. However, each account must have
                        a unique email address.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="newsletter">
                    <Accordion.Control>
                        How can I subscribe to the monthly newsletter?
                    </Accordion.Control>
                    <Accordion.Panel>
                        You can subscribe to our newsletter by entering your
                        email in the subscription form located at the footer of
                        our homepage. You&apos;ll receive updates on new
                        features, tips, and upcoming events.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="credit-card">
                    <Accordion.Control>
                        Do you store credit card information securely?
                    </Accordion.Control>
                    <Accordion.Panel>
                        All credit card information is processed securely using
                        PCI-compliant payment gateways. We do not store your
                        credit card details on our servers.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="payment">
                    <Accordion.Control>
                        What payment systems do you work with?
                    </Accordion.Control>
                    <Accordion.Panel>
                        We support several payment methods, including major
                        credit cards (Visa, MasterCard, American Express),
                        PayPal, and direct bank transfers in certain regions.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="tech-support">
                    <Accordion.Control>
                        How do I contact technical support?
                    </Accordion.Control>
                    <Accordion.Panel>
                        Technical support can be reached via our support email
                        (support@clubware.io) or through the support chat
                        feature directly in the app during business hours.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="privacy-policy">
                    <Accordion.Control>
                        Where can I find your privacy policy?
                    </Accordion.Control>
                    <Accordion.Panel>
                        Our privacy policy is available at the bottom of our
                        website. You can directly access it through the link
                        labeled &apos;Privacy Policy&apos; in the footer.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                    className={classes.item}
                    value="feature-request"
                >
                    <Accordion.Control>
                        How can I suggest a new feature or improvement?
                    </Accordion.Control>
                    <Accordion.Panel>
                        We value user feedback and encourage you to submit any
                        feature requests or improvements via our feedback form,
                        accessible from your account dashboard.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="data-export">
                    <Accordion.Control>
                        How can I export data from the system?
                    </Accordion.Control>
                    <Accordion.Panel>
                        You can export data such as reports, member lists, and
                        transaction histories from the &apos;Export&apos;
                        section in your account settings. Formats available
                        include CSV and Excel.
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="cancel-service">
                    <Accordion.Control>
                        What is the process for canceling my service?
                    </Accordion.Control>
                    <Accordion.Panel>
                        To cancel your service, please contact our customer
                        service team through your account interface. They will
                        guide you through the process and inform you about any
                        necessary steps or final billings.
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}
