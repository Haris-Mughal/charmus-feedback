import {
  Font,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: String;
  otp: String;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontStyle="normal"
          fontWeight={400}
        />
      </Head>

      <Preview>Here&apos;s Your Verification Code: {String(otp)}</Preview>
      <Section>
        <Row>
          <Heading as="h2"> Hello, {username}!</Heading>
        </Row>
        <Row>
          <Text>
            Thankyou for registering. Please use the following verification code
            to complete your registration:
          </Text>
        </Row>
        <Row>{<Text>{otp}</Text>}</Row>
        <Row>
          <Text>
            If you didn&apos;t request this code please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
