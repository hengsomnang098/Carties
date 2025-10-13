import {  Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import { HiCog } from "react-icons/hi2";


type Props = {
    user: User
}

export default function UserAction({ user }: Props) {
    return (
        <>
            <Dropdown inline label={`Welcome, ${user ? user.name : 'Guest'}`} className="cursor-pointer">
                <DropdownItem icon={HiUser}>
                    My Auctions
                </DropdownItem>
                <DropdownItem icon={AiFillTrophy}>
                    My Won
                </DropdownItem>
                <DropdownItem icon={AiFillCar}>
                    Sell my car
                </DropdownItem>
                <DropdownItem icon={HiCog}>
                    <Link href="/session">
                        Session (dev only!)
                    </Link>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem icon={AiOutlineLogout} onClick={() => signOut({ redirectTo: '/' })}>
                    Sign Out
                </DropdownItem>
            </Dropdown>
        </>
    )
}
