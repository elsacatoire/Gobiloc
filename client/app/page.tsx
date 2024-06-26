import LogoFullName from "@/components/design/LogoFullName"
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/enums/NavMenu";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <Header title={NavMenu.HOME} />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl mb-4">Bienvenue dans Gobiloc</h2>
        <LogoFullName />
        <p>Coucou Next</p>

        <div className="flex">
          <Link href="/register">
            <Button className='mr-3' variant='defaultSecondary'>Créer mon compte</Button>
          </Link>
          <Link href="/login">
            <Button>Se connecter</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
