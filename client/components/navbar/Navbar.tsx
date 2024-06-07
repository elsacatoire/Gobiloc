"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarFold, Pentagon, SquareCheck, Folder, MessageSquare } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function NavigationBar() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="">
                <NavigationMenuItem  >
                    <Link href={"/"}>
                        <Button className="flex-col" size="sm" variant="ghost"> <Pentagon /> Home</Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href={"/list"}>
                        <Button className="flex-col" size="sm" variant="ghost"> <SquareCheck /> Lists</Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href={"/"}>
                        <Button className="flex-col" size="sm" variant="ghost"> <CalendarFold /> Agenda</Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href={"/"}>
                        <Button className="flex-col" size="sm" variant="ghost"><Folder /> Safe</Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href={"/"}>
                        <Button className="flex-col" size="sm" variant="ghost"> <MessageSquare /> Message</Button>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
