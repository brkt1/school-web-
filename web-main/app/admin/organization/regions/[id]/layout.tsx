import RegionDetail from "@/modules/organization/region/components/region.detail";

export default async function RegionLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}>) {
  const { id } = await params
  return (
    <div className="flex flex-col gap-10">
      <RegionDetail id={id} />
      {children}
    </div>
  );
}
