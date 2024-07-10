
interface ParkingPageProps {
  params: { id: string }
}

export default function ParkingPage(props: ParkingPageProps) {

  return (
    <h1>Parking {props.params.id}</h1>
  )

}