'use client'

import { Button, Spinner } from "flowbite-react"
import { useCallback, useState } from "react"
import { updateAuctionTest } from "../actions/auctionActions";

export default function AuthTest() {
    const [loading, setLoading]  = useState(false)
    const [result, setResult] = useState<{status:number,message:string} | null>(null);

    const handleUpdate = useCallback( () => {
        setResult(null);
        setLoading(true);
        updateAuctionTest().then(res=>setResult(res))
        .catch(err=>setResult(err))
        .finally(()=>setLoading(false));
    },[])
  return (
    <div className="flex items-center gap-4">
        <Button outline onClick={handleUpdate}>
            {loading ? <Spinner size="sm" className="me-3" light /> : "test Auth"}
        </Button>
        <div>
            {JSON.stringify(result,null,2)}
        </div>
    </div>
  )
}
