import { Tracker, type TrackerBlockProps } from "./tracker-bikes";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { getBikesAvailableFromStation } from "@/fetch-data/data-bikes";
import { revalidateStation } from "@/lib/actions";
import { RefreshCache } from "./refresh-cache";
import { CopyButton } from "./copy-button";
import { Skeleton } from "./ui/skeleton";

type CardBikeStationProps = {
  station: {
    name: string;
    resource: string;
  };
};

export async function CardBikeStation({ station }: CardBikeStationProps) {
  const data = await getBikesAvailableFromStation(station.resource);

  if ("error" in data) {
    throw new Error(data.error);
  }

  const { last_seen, name, bikes_in_use, bikes_available } = data.data;

  const revalidateStationAction = revalidateStation.bind(null, station.resource, last_seen);
  const dataTracker = getBikesDataTracker(bikes_available, bikes_in_use);

  return (
    <>
      <RefreshCache refresh={revalidateStationAction} />
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="font-light text-lg text-wrap">{name}</CardTitle>
          <CopyButton text={name} toastMessage="Station name copied!" />
        </CardHeader>
        <CardContent className="flex flex-col w-full h-full gap-3">
          <div className="justify-between items-center flex">
            <div>
              <p className="text-muted-foreground">Available Bikes</p>
              <p className="text-2xl font-bold">{bikes_available}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Bikes</p>
              <p className="text-2xl font-bold">{bikes_available + bikes_in_use}</p>
            </div>
          </div>
          <Tracker className="hidden w-full lg:flex" data={dataTracker} />
        </CardContent>
      </Card>
    </>
  );
}

function getBikesDataTracker(
  availableBikes: number,
  unavailableBikes: number
): TrackerBlockProps[] {
  const availableBikesData = Array.from({ length: availableBikes }, () => ({
    color: "bg-emerald-600",
    tooltip: "Available Bike",
  }));
  const unavailableBikesData = Array.from({ length: unavailableBikes }, () => ({
    color: "bg-red-600",
    tooltip: "Bike not available",
  }));

  return [...availableBikesData, ...unavailableBikesData];
}

// FIXME: Nice use of compound components here
CardBikeStation.Skeleton = function CardBikeStationSkeleton() {
  return (
    <div className="p-8 border rounded-md">
      <div className="h-44 space-y-3 divide-border-200 divide-y rounded-md">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};

CardBikeStation.Error = function CardBikeStationError() {
  return (
    <div className="p-8 border rounded-md">
      <div className="h-44 space-y-3 divide-border-200 divide-y rounded-md">
        <p className="text-red-700">Error in downloading the data from the station!</p>
      </div>
    </div>
  );
};
