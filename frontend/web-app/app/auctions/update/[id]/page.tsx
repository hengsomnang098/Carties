import { getDetailedViewData } from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import AuctionForm from "../../AuctionForm";

export default async function Update({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getDetailedViewData(id);
  return (
    <>
      <div className="mx-auto max-w-full  md:max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
        <Heading title={`Update ${data.make} - ${data.model}`} subtitle='Please enter the detail car' />
        <AuctionForm auction={data} />
      </div>
    </>
  )
}
