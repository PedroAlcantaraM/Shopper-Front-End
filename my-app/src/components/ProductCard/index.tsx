import { ProductsFileData } from "@/schemas/products.schema";

interface ProductCardProps {
  e: ProductsFileData;
}

export const ProductCard = ({ e }: ProductCardProps) => {
  return (
    <div className="flex justify-center items-center bg-white p-5 flex-col rounded mb-5">
      <p>
        <strong>Código:</strong> {e.code}
      </p>
      <p>
        <strong>Nome:</strong> {e.name}
      </p>
      <p>
        <strong>Preço de venda:</strong> {e.sales_price}
      </p>
      <p>
        <strong>Novo preço:</strong> {e.new_price}
      </p>
      {e.error.hasError ? (
        <p className="text-red-500">
          <strong>Erro:</strong> {e.error.message}
        </p>
      ) : null}
    </div>
  );
};
