export default function RoomPage({ params }: { params: { id: string } }) {
  return <div className="p-8 text-white">Chat Room: {params.id} - Segera Hadir</div>;
}
