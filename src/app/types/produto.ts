interface Foto {
  titulo: string;
  src: string;
}

interface Produto {
  id: string;
  fotos: Foto[];
  nome: string;
  preco: number;
  desconto: number;
  descricao: string;
  vendido: string;
  usuario_id: string;
}
