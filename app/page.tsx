import { Button } from "@mantine/core";
import { IconPacman } from "@tabler/icons-react";
import { Welcome } from "@/components/Welcome/Welcome";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Welcome />
      <Button variant="filled" className="bg-slate-500">
        Awesome Mantine Button with custom Tailwind color
      </Button>

      <IconPacman stroke={2} />
    </main>
  );
}
