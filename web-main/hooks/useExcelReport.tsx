export interface ReportProps {
  data: any;
  name: string;
  fieldsToBeRemoved: string[];
}

const useExcelReport = () => {
  const handleExcelExport = ({
    data,
    name,
    fieldsToBeRemoved,
  }: ReportProps): void => {
    // define header row
    let excelContent = "";
    const image = "public/images/faq.png";
    // Define the data
    const header = [
      ["public/images/faq.png"],
      [""], // Add an empty row for spacing
    ];

    // Add the header to the content
    header.forEach((row) => {
      const headerRow = row.join("\t") + "\n";
      excelContent += headerRow;
    });
    if (data?.length > 0) {
      let models = Object.keys(data[0]);
      if (fieldsToBeRemoved?.length > 0)
        models = models.filter((x) => !fieldsToBeRemoved.includes(x));
      let headerRow = models.join("\t") + "\n";
      excelContent += headerRow;
      // populate data
      data.forEach((data: any) => {
        const rowData =
          models?.map((key) => data[key as keyof typeof data]).join("\t") + "\n";
        excelContent += rowData;
      });
      // create blob with an excel content
      const blob = new Blob([excelContent], {
        type: "application/vnd.ms-excel",
      });
      // create temporary link
      const url = URL.createObjectURL(blob);
      // recall the blob and remove the temporary link
      const a = document.createElement("a");
      a.href = url;
      a.download = name + ".xlsx";
      document.body.append(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return {
    handleExcelExport,
  };
};

export default useExcelReport;
