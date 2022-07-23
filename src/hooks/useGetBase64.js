
/*Hook para convertir una URL en base 64*/

export const useGetBase64 = (file) =>

    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

