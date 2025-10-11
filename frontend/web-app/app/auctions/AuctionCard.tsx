import Link from "next/link";
import CarImage from "./CarImage";
import CountdownTimer from "./CountdownTimer";
import { Auction } from "@/types";

type Props ={
    auction:Auction;
    priority?: boolean; // For LCP optimization
}
export default function AuctionCard({ auction, priority = false }: Props) {
    return (
        <Link href={`/auctions/details/${auction.id}`}>
            <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden">
                <CarImage imageUrl={auction.imageUrl} priority={priority} />
                <div className="absolute bottom-2 left-2">
                    <CountdownTimer auctionEnd={auction.auctionEnd} />
                </div>
                {/* <div className='absolute top-2 right-2'>
                        <CurrentBid reservePrice={auction.reservePrice} amount={auction.currentHighBid} />
                    </div> */}
            </div>
            <div className="flex justify-between items-center mt-4">
                <h3 className="text-gray-700">{auction.make} {auction.model}</h3>
                <p className="font-semibold text-sm">{auction.year}</p>
            </div>
        </Link>
    )
}