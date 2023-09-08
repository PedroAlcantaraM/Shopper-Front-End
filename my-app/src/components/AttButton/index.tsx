import { ProductsFileData } from "@/schemas/products.schema";
import api from "@/services/api";
import { Dispatch, SetStateAction } from "react";

interface AttButtonOrMessageProps {
  filesData: ProductsFileData[] | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  setFileData: Dispatch<
    SetStateAction<
      | {
          code: number;
          name: string;
          sales_price: number;
          new_price: number;
          error: {
            message: string;
            hasError: boolean;
          };
        }[]
      | null
    >
  >;
}
export const AttButtonOrMessage = ({
  filesData,
  setFile,
  setFileData,
}: AttButtonOrMessageProps) => {
  const attBoolean = filesData!.every((e) => e.error.hasError === false);

  const attProducts = async () => {
    await api
      .patch("/products/update")
      .then((res) => null)
      .catch((err) => console.log(err));
    setFile(null);
    setFileData(null);
  };

  if (attBoolean) {
    return (
      <>
        <button
          onClick={attProducts}
          className="bg-white text-blue-950 text-xl font-bold p-4 rounded-md"
        >
          ATUALIZAR
        </button>
      </>
    );
  }

  return (
    <p className="bg-white text-blue-950 text-xl font-bold p-4 rounded-md">
      Para atualizar o arquivo todos os erros devem ser corrigidos, tente
      reenviar após realizar as alterações.
    </p>
  );
};
