import Link from 'next/link';
import CarImage from './CarImage';
import CountdownTimer from './CountdownTimer';
import { Auction } from '@/types';

type Props = {
  auction: Auction;
};
export default function AuctionCard({ auction }: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`}>
      <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CarImage imageUrl={auction.imageUrl} />
        <div className="absolute bottom-2 left-2">
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700 text-sm sm:text-base md:text-lg">
          {auction.make} {auction.model}
        </h3>
        <p className="font-semibold text-xs sm:text-sm md:text-base">
          {auction.year}
        </p>
      </div>
    </Link>
  );
}