import CityDetail from "@/modules/organization/city/components/city.detail";

export default async function CityLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}>) {
  const { id } = await params
  return (
    <div className="flex flex-col gap-10">
      <CityDetail id={id} />
      {children}
    </div>
  );
}
