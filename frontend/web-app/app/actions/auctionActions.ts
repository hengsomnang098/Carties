'use server';
import { FetchWrapper } from "@/lib/FetchWrapper";
import { Auction, PagedResult } from "@/types";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PagedResult<Auction>> {
    return FetchWrapper.get(`search${query}`);
}

export async function getDetailedViewData(id:string):Promise<Auction> {
  return FetchWrapper.get(`auctions/${id}`);
}


// testing auction with auth
export async function updateAuctionTest():Promise<{status:number,message:string}> {
  const data ={
    mileage:Math.floor(Math.random() * 100000)+1,
  }

  return FetchWrapper.put('auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c',data);

}

export async function createAuction(data:FieldValues){
  return FetchWrapper.post('auctions',data);
}

export  async function updateAuction(id:string,data:FieldValues){
  return FetchWrapper.put(`auctions/${id}`,data);
}

export async function deleteAuction(id: string) {
    return FetchWrapper.del(`auctions/${id}`);
}
