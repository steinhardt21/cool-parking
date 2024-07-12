import { Shell } from "@/components/shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function ParkingIdPageLoading() {

  return (
    <Shell>
      <Skeleton className="h-10 w-1/5" />
      <Skeleton className="h-6 w-3/5" />
      <Skeleton className="h-6 w-3/5" />
      <Skeleton className="h-6 w-3/5" />
      <Skeleton className="h-6 w-3/5" />
      <Skeleton className="h-6 w-3/5" />
      <div className="flex flex-col sm:flex-row gap-6">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </Shell>
  )
}