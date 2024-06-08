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
import { NavMenu } from "@/enums/NavMenu"

export function NavigationBar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem  >
                    <Link href={"/"}>
                        <Button className="flex-col" size="sm" variant="ghost"> <Pentagon /> {NavMenu.HOME}</Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href={"/list"}>
                        <Button className="flex-col" size="sm" variant="ghost"> <SquareCheck /> {NavMenu.LISTS}</Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href={"/"}>
                        <Button className="flex-col" size="sm" variant="ghost"> <CalendarFold /> {NavMenu.AGENDA}</Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href={"/"}>
                        <Button className="flex-col" size="sm" variant="ghost"><Folder /> {NavMenu.SAFE}</Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href={"/"}>
                        <Button className="flex-col" size="sm" variant="ghost"> <MessageSquare /> {NavMenu.MESSAGES}</Button>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
