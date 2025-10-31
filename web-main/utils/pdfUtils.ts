export const generatePdf = (values: any) => {
    let binaryString = window.atob(values.data);

      let binaryLen = binaryString.length;
      
      let bytes = new Uint8Array(binaryLen);
      
      for (let i = 0; i < binaryLen; i++) {
          let ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
      }
      
      let blob = new Blob([bytes], {type: "application/pdf"});

      let url = window.URL.createObjectURL(blob);

        // Open the PDF content in a new tab
        window.open(url, '_blank');
}