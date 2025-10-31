import InstitutionDetail from "@/modules/organization/institution/components/institution.detail";

export default async function InstitutionLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}>) {
  const { id } = await params
  return (
    <div className="flex flex-col gap-10">
      <InstitutionDetail id={id} />
      {children}
    </div>
  );
}
