'use client';
import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Auction } from '@/types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';


export default  function Listings() {
  const [auctions,setAuctions] = useState<Auction[]>([]);
  const [pageCount,setPageCount] = useState(0);
  const [pageNumber,setPageNumber] = useState(1);
  const [pageSize,setPageSize] = useState(4);

  useEffect(()=>{
    getData(pageNumber, pageSize).then((res)=>{
      setAuctions(res.results);
      setPageCount(res.pageCount);
    }); 
  },[pageNumber, pageSize]);

  if(auctions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Filters pageSize={pageSize} setPageSize={setPageSize}/>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {auctions && auctions.map((auction: Auction, index: number) => (
          <AuctionCard
            key={auction.id}
            auction={auction}
            priority={index < 4} // Prioritize first 4 cards for LCP optimization
          />
        ))}
      </div>
      {/* pagination */}
      <div className='flex justify-center mt-8'>
        <AppPagination currentPage={pageNumber} pageCount={pageCount} pageChanged ={setPageNumber} />
      </div>
    </>
  );
}
