'use client';


import { Auction } from "@/types";
import { Button, FileInput, Spinner } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../actions/auctionActions";
import toast from "react-hot-toast";
import InputFile from "../components/InputFile";

type Props = {
    auction?: Auction;
}

export default function AuctionForm({ auction }: Props) {

    const pathname = usePathname();
    const router = useRouter();
    const { control, handleSubmit, setFocus, reset, formState: { isSubmitting, isValid, isDirty } } = useForm({
        mode: 'onTouched'
    });

    useEffect(() => {
        if (auction) {
            const { make, model, color, year, mileage, imageUrl } = auction;
            reset({ make, model, color, year, mileage, imageUrl });
        }
        setFocus('make');
    }, [setFocus])

    const onSubmit = useCallback(async (data: FieldValues) => {
        try {
            // ✅ Convert numbers
            data.year = parseInt(data.year);
            data.mileage = parseInt(data.mileage);

            if (pathname.includes('create')) {
                data.reservePrice = parseInt(data.reservePrice);
                data.auctionEnd = new Date(data.auctionEnd).toISOString();
            }
            let id = '';
            let res;
            if (pathname.includes('create')) {
                res = await createAuction(data);
                id = res.id;
            }
            else {
                if (auction) {
                    res = await updateAuction(auction.id, data);
                    id = auction.id;
                }
            }
            if (res.error) {
                throw new Error(res.error.message);
            }
            router.push(`/auctions/details/${id}`);
        } catch (error: any) {
            toast.error(error.status + ' ' + error.message);
        }
    }, [router]);

    return (
        <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
            <Input name="make" label="Make" control={control}
                rules={{ required: 'Make is required' }} />
            <Input name="model" label="Model" control={control}
                rules={{ required: 'Model is required' }} />
            <Input name="color" label="Color" control={control}
                rules={{ required: 'Color is required' }} />

            <div className="grid grid-cols-2 gap-3">
                <Input name="year" label="Year" type='number' control={control}
                    rules={{ required: 'Year is required' }} />
                <Input name="mileage" label="Mileage" control={control}
                    rules={{ required: 'Mileage is required' }} />
            </div>

            <InputFile
                name="imageUrl"
                control={control}
                rules={{ required: "Image is required" }}
                showLabel
            />

            {
                pathname.includes('create') && (
                    <div className="grid grid-cols-2 gap-3">
                        <Input name="reservePrice" label="Reserve price (enter 0 if no reserve)"
                            type='number' control={control}
                            rules={{ required: 'Reserve price is required' }} />
                        <DateInput
                            name="auctionEnd"
                            label="Auction end date/time"
                            control={control}
                            showTimeSelect
                            dateFormat='dd MMMM yyyy h:mm a'
                            rules={{ required: 'Auction end date is required' }}
                        />
                    </div>
                )
            }

            <div className="flex justify-between">
                <Button outline color="gray" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button
                    outline
                    color='green'
                    type="submit"
                    disabled={!isValid || !isDirty}
                >
                    {isSubmitting && <Spinner size="sm" />}
                    Submit
                </Button>
            </div>
        </form>
    )
}