import { render, screen, fireEvent } from "@testing-library/react";
import ItemFavorito from "../ItemFavorito";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";

jest.mock("../../../helpers", () => ({
  calculaValorComPorcentagemDeDesconto: jest.fn(),
}));

const mockProduto = {
  id: "1",
  nome: "Produto Teste",
  descricao: "Descrição do produto de teste",
  preco: 100,
  desconto: 10,
  fotos: [{ src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/notebook-2.jpg", titulo: "Foto do Produto" }],
  vendido: "false",
  usuario_id: "maria@email.com"
};

const mockSetFavoritos = jest.fn();

describe("ItemFavorito", () => {
  beforeEach(() => {
    (calculaValorComPorcentagemDeDesconto as jest.Mock).mockReturnValue(90);
  });

  it("deve renderizar corretamente o item favorito", () => {
    render(
      <table>
        <tbody>
          <ItemFavorito
            itemFavorito={mockProduto}
            setFavoritos={mockSetFavoritos}
          />
        </tbody>
      </table>
    );

    // Verificar se os dados estão sendo exibidos corretamente
    expect(screen.getByText(mockProduto.nome)).toBeInTheDocument();
    expect(screen.getByText(mockProduto.descricao)).toBeInTheDocument();
    expect(screen.getByText("R$ 90.00")).toBeInTheDocument(); // Preço com desconto
    expect(screen.getByText(`${mockProduto.desconto}%`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduto.fotos[0].titulo)).toBeInTheDocument();
  });

  it("deve chamar a função setFavoritos ao clicar em 'Remover'", () => {
    render(
      <table>
        <tbody>
          <ItemFavorito
            itemFavorito={mockProduto}
            setFavoritos={mockSetFavoritos}
          />
        </tbody>
      </table>
    );

    // Encontrar o botão "Remover" e clicar
    const botaoRemover = screen.getByText("Remover");
    fireEvent.click(botaoRemover);

    // Verificar se a função setFavoritos foi chamada com o ID correto
    expect(mockSetFavoritos).toHaveBeenCalledWith(expect.any(Function));

    // Verificar se a função removeu o item da lista
    expect(mockSetFavoritos).toHaveBeenCalledTimes(1);
  });
});