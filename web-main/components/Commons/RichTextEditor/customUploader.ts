const customUploadAdapter = (loader: any) => {
    return {
        upload: () => {
            return new Promise<{ default: string; }>((resolve, reject) => {
                const reader = new FileReader();
                loader.file.then((file: File) => {
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        const imageData = reader.result;
                        // Implement your own upload logic here and obtain the URL of the uploaded image
                        // For example, use fetch to upload the imageData to your server and get the image URL
                        fetch('https://example.com/upload', {
                            method: 'POST',
                            body: JSON.stringify({ image: imageData }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                resolve({
                                    default: data.url // Replace with the actual URL of the uploaded image
                                });
                            })
                            .catch(error => {
                                reject(error);
                            });
                    };
                    reader.onerror = () => {
                        reject(reader.error);
                    };
                });
            });
        },
        abort: () => {
            // Handle the abort action if necessary
        }
    };
};

export default customUploadAdapter;