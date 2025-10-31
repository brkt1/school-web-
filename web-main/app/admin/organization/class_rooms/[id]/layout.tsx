import ClassRoomDetail from "@/modules/organization/class_room/components/class_room.detail";

export default async function ClassRoomLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}>) {
  const { id } = await params
  return (
    <div className="flex flex-col gap-10">
      <ClassRoomDetail id={id} />
      {children}
    </div>
  );
}
