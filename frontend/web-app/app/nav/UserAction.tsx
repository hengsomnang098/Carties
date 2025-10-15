import { useParamsStore } from "@/hooks/useParamStore";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import { HiCog } from "react-icons/hi2";


type Props = {
    user: User
}

export default function UserAction({ user }: Props) {
    const router = useRouter();
    const pathName = usePathname();

    const setParam = useParamsStore(state => state.setParams);

    const setWinner = useCallback(() => {
        setParam({ winner: user.username, seller: undefined });
        if (pathName !== '/') return router.push('/');
    }, [pathName, router, setParam, user.username])

    const setSeller = useCallback(() => {
        setParam({ seller: user.username, winner: undefined })
        if (pathName !== '/') return router.push('/');
    }, [pathName, router, setParam, user.username])

    return (
        <>
            <Dropdown inline label={`Welcome, ${user ? user.name : 'Guest'}`} className="cursor-pointer">
                <DropdownItem icon={HiUser} onClick={setSeller}>
                    My Auctions
                </DropdownItem>
                <DropdownItem icon={AiFillTrophy} onClick={setWinner}>
                    Auction Won
                </DropdownItem>
                <DropdownItem icon={AiFillCar}>
                    <Link href="/auctions/create">
                        Sell my car
                    </Link>
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
