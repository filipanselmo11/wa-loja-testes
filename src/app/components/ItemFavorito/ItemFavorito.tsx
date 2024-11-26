import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import Image from "next/image";

interface IItemFavoritoProps {
  itemFavorito: Produto;
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export default function ItemFavorito({
  itemFavorito,
  setFavoritos,
}: IItemFavoritoProps) {

  const removerFavorito = (id: string) => {
    setFavoritos((favoritos) =>
      favoritos.filter((item) => item.id !== id)
    );
  };

  const precoComDesconto = calculaValorComPorcentagemDeDesconto(itemFavorito.preco,itemFavorito.desconto);

  return (
    <tr key={itemFavorito.id}>
      <td className="d-flex flex-row">
        <Image
          className="rounded"
          src={itemFavorito.fotos[0].src}
          alt={itemFavorito.fotos[0].titulo}
          width={50}
          height={50}
        />
        <div className="d-flex flex-column ms-2">
          <span>{itemFavorito.nome}</span>
          <small className="text-muted">{itemFavorito.descricao}</small>
        </div>
      </td>

      <td>
        R${" "}
        {precoComDesconto.toFixed(2)}
      </td>

      <td>{itemFavorito.desconto}%</td>

      <td>
        <button
          onClick={() => removerFavorito(itemFavorito.id)}
          className="btn btn-outline-danger btn-sm"
        >
          Remover
        </button>
      </td>
    </tr>
  );
}