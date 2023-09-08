import { DropzoneState, useDropzone } from "react-dropzone";
import { useCallback, Dispatch, SetStateAction } from "react";
import { UploadIcon } from "@/icons/Uploadicon";
import { FileIcon } from "@/icons/Fileicon";
import { CloseIcon } from "@/icons/CloseIcon";

import api from "@/services/api";

interface InputProps {
  dropzone: DropzoneState;
}

interface HasFileProps {
  file?: File;
  removeFile: () => void;
  verifyFileData: (file: File) => Promise<void>;
}

interface UploarderProps {
  file: File | null;
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

export const Uploader = ({ file, setFile, setFileData }: UploarderProps) => {
  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const removeFile = useCallback(() => {
    setFile(null);
    setFileData(null);
  }, [file]);

  const verifyFileData = async (file: File): Promise<void> => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const fd = new FormData();

    fd.append("file", file);

    await api
      .post("/products/upload", fd, config)
      .then((res) => setFileData(res.data))
      .catch((err) => console.log(err));
  };

  if (file)
    return (
      <HasFile
        file={file}
        removeFile={removeFile}
        verifyFileData={verifyFileData}
      />
    );

  return <Input dropzone={dropzone} />;
};

const Input = ({ dropzone }: InputProps) => {
  const { getInputProps, getRootProps, isDragActive } = dropzone;

  return (
    <div
      {...getRootProps()}
      className={`w-1/2 h-full border-4 border-dashed hover:border-gray-300 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-50 transition-all
      ${isDragActive ? "border-green-500" : "border-gray-400"}`}
    >
      <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 h-full w-full">
          <UploadIcon
            className={`w-10 h-10 mb-3 ${
              isDragActive ? "text-green-500" : "text-gray-400"
            }`}
          />
          {isDragActive ? (
            <p className="font-bold text-lg text-green-500">
              Solte para adicionar
            </p>
          ) : (
            <>
              <p className="mb-2 text-lg text-gray-400">
                <span className="font-bold">Clique para enviar</span> ou arraste
                até aqui seu arquivo CSV
              </p>
            </>
          )}
        </div>
      </label>
      <input {...getInputProps()} className="hidden" />
    </div>
  );
};

const HasFile = ({ file, removeFile, verifyFileData }: HasFileProps) => {
  return (
    <div className="w-1/2 h-full border-4 border-dashed border-gray-400 bg-gray-100 rounded-lg flex justify-center items-center flex-col">
      <div className="bg-white w-[80%] rounded-md shadow-md flex gap-3 items-center justify-center">
        <FileIcon className="w-5 h-5 my-4 ml-4" />
        <span className="text-sm text-gray-500 my-4">{file?.name}</span>
        <button
          type="button"
          onClick={removeFile}
          className="place-self-start mt-1 p-1"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
      <button
        className="mt-7 p-4 rounded-md bg-white text-blue-950 shadow-md"
        type="button"
        onClick={() => verifyFileData(file!)}
      >
        VALIDAR
      </button>
    </div>
  );
};
