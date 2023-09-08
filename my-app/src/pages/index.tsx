import { AttButtonOrMessage } from "@/components/AttButton";
import { ProductsInfo } from "@/components/ProductsInfo";
import { Uploader } from "@/components/Updload";
import { ProductsFileData } from "@/schemas/products.schema";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const onSubmit = () => {};
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<ProductsFileData[] | null>(null);

  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-10 p-24 ${inter.className}`}
    >
      <h1 className="font-bold text-white text-4xl">
        ATUALIZAÇÃO DE TABELA DE PREÇO
      </h1>
      <form
        onSubmit={onSubmit}
        className="w-full h-72 flex justify-center items-center"
      >
        <Uploader
          file={file}
          setFile={setFile}
          setFileData={setFileData}
        ></Uploader>
      </form>
      {fileData ? <ProductsInfo filesData={fileData} /> : null}
      {fileData ? (
        <AttButtonOrMessage
          filesData={fileData}
          setFile={setFile}
          setFileData={setFileData}
        />
      ) : null}
    </main>
  );
}
