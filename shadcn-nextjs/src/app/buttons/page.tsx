import { Button } from "@/components/ui/button"; 


export default function ButtonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="destructive" size="sm">Shadcn Button</Button>
      <Button variant="outline" size="sm">Shadcn Button</Button>
      <Button variant="ghost" size="sm">Shadcn Button</Button>
      <Button asChild size="sm">Shadcn Button</Button>
    </main>
  );
}