import { Card, Group } from "@mantine/core";
import { SocialMediaLinks } from "../../types/ProfileTypes";

interface SocialMediaCardProps {
  socialMediaLinks: SocialMediaLinks;
  withBorder?: boolean;
}

export function SocialMediaCard({ withBorder }: SocialMediaCardProps) {
  return (
    <Card withBorder={withBorder} radius="md">
      <Group position="apart"></Group>
    </Card>
  );
}
