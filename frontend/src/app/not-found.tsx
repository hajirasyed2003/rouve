import Link from "next/link";
import { Container, Section } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <h1>This page isn’t available yet</h1>
        <p className="mt-6 max-w-lg text-lg text-ink-muted">
          The page you opened is not part of the site yet, or the address is wrong. Return to the home page to
          continue.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-10" })}>
          Back to home
        </Link>
      </Container>
    </Section>
  );
}
