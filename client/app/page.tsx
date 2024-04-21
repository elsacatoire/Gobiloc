import LogoFullName from "@/components/design/LogoFullName"
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Bienvenue dans Gobiloc</h2>
      <LogoFullName />
      <p>Coucou Next</p>
      <Link href="/register">
        <div className="flex">
          <Button className='mr-3' variant='defaultSecondary'>Créer mon compte</Button>
          <Button>Se connecter</Button>
        </div>
      </Link>
    </div>
  );
}
