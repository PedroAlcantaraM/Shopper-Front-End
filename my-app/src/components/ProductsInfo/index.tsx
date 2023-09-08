import { ProductsFileData } from "@/schemas/products.schema";
import { ProductCard } from "../ProductCard";

interface ProductsInfoProps {
  filesData: ProductsFileData[] | null;
}

export const ProductsInfo = ({ filesData }: ProductsInfoProps) => {
  return (
    <div>
      <div>
        {filesData!.map((e) => {
          return <ProductCard key={e.code} e={e} />;
        })}
      </div>
    </div>
  );
};
