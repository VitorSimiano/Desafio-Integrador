import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpa o banco
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.cliente.deleteMany();

  // 1. Categorias
  const categorias = await Promise.all([
    prisma.categoria.create({ data: { nome: 'Eletrônicos' } }),
    prisma.categoria.create({ data: { nome: 'Roupas' } }),
    prisma.categoria.create({ data: { nome: 'Alimentos' } }),
    prisma.categoria.create({ data: { nome: 'Móveis' } }),
    prisma.categoria.create({ data: { nome: 'Livros' } }),
  ]);
  console.log(`✅ ${categorias.length} categorias criadas`);

  // 2. Produtos
  const produtos = await Promise.all([
    prisma.produto.create({ data: { nome: 'Notebook', preco: 3500, estoque: 999, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Smartphone', preco: 1800, estoque: 999, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Monitor', preco: 1200, estoque: 999, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Teclado', preco: 250, estoque: 999, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Mouse', preco: 120, estoque: 999, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Camiseta', preco: 59, estoque: 999, categoriaId: categorias[1].id } }),
    prisma.produto.create({ data: { nome: 'Calça Jeans', preco: 120, estoque: 999, categoriaId: categorias[1].id } }),
    prisma.produto.create({ data: { nome: 'Tênis', preco: 280, estoque: 999, categoriaId: categorias[1].id } }),
    prisma.produto.create({ data: { nome: 'Arroz 5kg', preco: 28, estoque: 999, categoriaId: categorias[2].id } }),
    prisma.produto.create({ data: { nome: 'Feijão 1kg', preco: 12, estoque: 999, categoriaId: categorias[2].id } }),
    prisma.produto.create({ data: { nome: 'Azeite 500ml', preco: 35, estoque: 999, categoriaId: categorias[2].id } }),
    prisma.produto.create({ data: { nome: 'Sofá 3 lugares', preco: 2200, estoque: 999, categoriaId: categorias[3].id } }),
    prisma.produto.create({ data: { nome: 'Mesa de Escritório', preco: 850, estoque: 999, categoriaId: categorias[3].id } }),
    prisma.produto.create({ data: { nome: 'Clean Code', preco: 89, estoque: 999, categoriaId: categorias[4].id } }),
    prisma.produto.create({ data: { nome: 'The Pragmatic Programmer', preco: 95, estoque: 999, categoriaId: categorias[4].id } }),
  ]);
  console.log(`✅ ${produtos.length} produtos criados`);

  // 3. Clientes
  const dadosClientes = [
    // PR
    { nome: 'João Silva', email: 'joao@email.com', cidade: 'Curitiba', estado: 'PR' },
    { nome: 'Maria Santos', email: 'maria@email.com', cidade: 'Guarapuava', estado: 'PR' },
    { nome: 'Rafael Gomes', email: 'rafael@email.com', cidade: 'Londrina', estado: 'PR' },
    { nome: 'Aline Souza', email: 'aline@email.com', cidade: 'Maringá', estado: 'PR' },
    // SP
    { nome: 'Pedro Oliveira', email: 'pedro@email.com', cidade: 'São Paulo', estado: 'SP' },
    { nome: 'Ana Costa', email: 'ana@email.com', cidade: 'Campinas', estado: 'SP' },
    { nome: 'Patrícia Nunes', email: 'patricia@email.com', cidade: 'Ribeirão Preto', estado: 'SP' },
    { nome: 'Marcos Vieira', email: 'marcos@email.com', cidade: 'Santos', estado: 'SP' },
    // RJ
    { nome: 'Carlos Souza', email: 'carlos@email.com', cidade: 'Rio de Janeiro', estado: 'RJ' },
    { nome: 'Beatriz Lima', email: 'beatriz@email.com', cidade: 'Niterói', estado: 'RJ' },
    // MG
    { nome: 'Julia Lima', email: 'julia@email.com', cidade: 'Belo Horizonte', estado: 'MG' },
    { nome: 'Rodrigo Almeida', email: 'rodrigo@email.com', cidade: 'Uberlândia', estado: 'MG' },
    // RS
    { nome: 'Lucas Ferreira', email: 'lucas@email.com', cidade: 'Porto Alegre', estado: 'RS' },
    { nome: 'Gabriela Ramos', email: 'gabriela@email.com', cidade: 'Caxias do Sul', estado: 'RS' },
    // SC
    { nome: 'Fernanda Rocha', email: 'fernanda@email.com', cidade: 'Florianópolis', estado: 'SC' },
    { nome: 'Eduardo Pinto', email: 'eduardo@email.com', cidade: 'Joinville', estado: 'SC' },
    // BA
    { nome: 'Bruno Alves', email: 'bruno@email.com', cidade: 'Salvador', estado: 'BA' },
    { nome: 'Tatiane Moura', email: 'tatiane@email.com', cidade: 'Feira de Santana', estado: 'BA' },
    // PE
    { nome: 'Camila Martins', email: 'camila@email.com', cidade: 'Recife', estado: 'PE' },
    { nome: 'Felipe Barros', email: 'felipe@email.com', cidade: 'Caruaru', estado: 'PE' },
    // CE
    { nome: 'Diego Cardoso', email: 'diego@email.com', cidade: 'Fortaleza', estado: 'CE' },
    { nome: 'Isabela Freitas', email: 'isabela@email.com', cidade: 'Caucaia', estado: 'CE' },
    // AM
    { nome: 'Larissa Pereira', email: 'larissa@email.com', cidade: 'Manaus', estado: 'AM' },
    // DF
    { nome: 'Thiago Barbosa', email: 'thiago@email.com', cidade: 'Brasília', estado: 'DF' },
    { nome: 'Vanessa Castro', email: 'vanessa@email.com', cidade: 'Brasília', estado: 'DF' },
    // GO
    { nome: 'Anderson Lima', email: 'anderson@email.com', cidade: 'Goiânia', estado: 'GO' },
    // PA
    { nome: 'Renata Figueiredo', email: 'renata@email.com', cidade: 'Belém', estado: 'PA' },
    // MT
    { nome: 'Gustavo Henrique', email: 'gustavo@email.com', cidade: 'Cuiabá', estado: 'MT' },
    // ES
    { nome: 'Mônica Teixeira', email: 'monica@email.com', cidade: 'Vitória', estado: 'ES' },
    // RN
    { nome: 'Sandro Nogueira', email: 'sandro@email.com', cidade: 'Natal', estado: 'RN' },
  ];

  const clientes = await Promise.all(
    dadosClientes.map((c) =>
      prisma.cliente.create({ data: { ...c, pais: 'Brasil' } })
    )
  );
  console.log(`✅ ${clientes.length} clientes criados`);

  // Helper — data aleatória entre dois períodos
  function dataAleatoria(inicio: string, fim: string): Date {
    const start = new Date(inicio).getTime();
    const end = new Date(fim).getTime();
    return new Date(start + Math.random() * (end - start));
  }

  // Helper — produtos aleatórios
  function produtosAleatorios(quantidade: number) {
    return [...produtos]
      .sort(() => 0.5 - Math.random())
      .slice(0, quantidade)
      .map((p) => ({
        produtoId: p.id,
        quantidade: Math.floor(Math.random() * 3) + 1,
      }));
  }

  // 4. Pedidos com quantidade variada por cliente
  // Define quantos pedidos cada cliente vai ter
  const pedidosPorCliente = [
    // Clientes muito ativos (10-13 pedidos) — baixo churn
    { idx: 0,  qtd: 13, periodo: ['2025-01-01', '2026-05-01'] },
    { idx: 1,  qtd: 11, periodo: ['2025-03-01', '2026-05-15'] },
    { idx: 4,  qtd: 12, periodo: ['2025-02-01', '2026-04-20'] },
    { idx: 5,  qtd: 10, periodo: ['2025-04-01', '2026-05-10'] },
    { idx: 8,  qtd: 11, periodo: ['2025-01-15', '2026-05-20'] },
    { idx: 14, qtd: 10, periodo: ['2025-06-01', '2026-05-25'] },
    // Clientes moderados (4-7 pedidos)
    { idx: 2,  qtd: 7, periodo: ['2025-01-01', '2026-03-01'] },
    { idx: 3,  qtd: 6, periodo: ['2025-05-01', '2026-02-01'] },
    { idx: 6,  qtd: 5, periodo: ['2025-03-01', '2026-01-01'] },
    { idx: 7,  qtd: 6, periodo: ['2025-07-01', '2026-04-01'] },
    { idx: 9,  qtd: 4, periodo: ['2025-08-01', '2026-03-15'] },
    { idx: 10, qtd: 5, periodo: ['2025-02-01', '2026-02-28'] },
    { idx: 11, qtd: 7, periodo: ['2025-04-01', '2026-04-30'] },
    { idx: 15, qtd: 6, periodo: ['2025-06-01', '2026-03-01'] },
    { idx: 23, qtd: 5, periodo: ['2025-05-01', '2026-04-01'] },
    { idx: 24, qtd: 4, periodo: ['2025-09-01', '2026-05-01'] },
    // Clientes em risco (1-2 pedidos, datas antigas) — alto churn
    { idx: 12, qtd: 2, periodo: ['2024-01-01', '2024-06-01'] },
    { idx: 13, qtd: 1, periodo: ['2024-02-01', '2024-04-01'] },
    { idx: 16, qtd: 2, periodo: ['2024-03-01', '2024-08-01'] },
    { idx: 17, qtd: 1, periodo: ['2024-01-01', '2024-05-01'] },
    { idx: 18, qtd: 2, periodo: ['2024-04-01', '2024-09-01'] },
    { idx: 19, qtd: 1, periodo: ['2024-06-01', '2024-10-01'] },
    { idx: 20, qtd: 2, periodo: ['2024-02-01', '2024-07-01'] },
    { idx: 21, qtd: 1, periodo: ['2024-05-01', '2024-11-01'] },
    { idx: 22, qtd: 2, periodo: ['2024-03-01', '2024-08-01'] },
    { idx: 25, qtd: 1, periodo: ['2024-07-01', '2024-12-01'] },
    { idx: 26, qtd: 2, periodo: ['2024-01-01', '2024-06-01'] },
    { idx: 27, qtd: 1, periodo: ['2024-04-01', '2024-09-01'] },
    { idx: 28, qtd: 2, periodo: ['2024-02-01', '2024-07-01'] },
    { idx: 29, qtd: 1, periodo: ['2024-05-01', '2024-10-01'] },
  ];

  let totalPedidos = 0;
  for (const config of pedidosPorCliente) {
    for (let i = 0; i < config.qtd; i++) {
      const categoria = categorias[Math.floor(Math.random() * categorias.length)];
      const numProdutos = Math.floor(Math.random() * 3) + 1;

      await prisma.pedido.create({
        data: {
          clienteId: clientes[config.idx].id,
          categoriaId: categoria.id,
          criadoEm: dataAleatoria(config.periodo[0], config.periodo[1]),
          itens: {
            create: produtosAleatorios(numProdutos),
          },
        },
      });
      totalPedidos++;
    }
  }

  console.log(`✅ ${totalPedidos} pedidos criados`);
  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });