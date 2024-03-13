import { Button } from "@mantine/core";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <p>Welcome to Clubware!</p>
      <Button variant="filled" className='bg-slate-500'>Awesome Mantine Button with custom Tailwind color</Button>
    </main>
  );
}
