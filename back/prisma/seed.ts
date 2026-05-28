import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpa o banco antes de popular
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
    prisma.produto.create({ data: { nome: 'Notebook', preco: 3500, estoque: 50, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Smartphone', preco: 1800, estoque: 100, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Monitor', preco: 1200, estoque: 30, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Teclado', preco: 250, estoque: 80, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Mouse', preco: 120, estoque: 90, categoriaId: categorias[0].id } }),
    prisma.produto.create({ data: { nome: 'Camiseta', preco: 59, estoque: 200, categoriaId: categorias[1].id } }),
    prisma.produto.create({ data: { nome: 'Calça Jeans', preco: 120, estoque: 150, categoriaId: categorias[1].id } }),
    prisma.produto.create({ data: { nome: 'Tênis', preco: 280, estoque: 80, categoriaId: categorias[1].id } }),
    prisma.produto.create({ data: { nome: 'Arroz 5kg', preco: 28, estoque: 500, categoriaId: categorias[2].id } }),
    prisma.produto.create({ data: { nome: 'Feijão 1kg', preco: 12, estoque: 400, categoriaId: categorias[2].id } }),
    prisma.produto.create({ data: { nome: 'Azeite 500ml', preco: 35, estoque: 200, categoriaId: categorias[2].id } }),
    prisma.produto.create({ data: { nome: 'Sofá 3 lugares', preco: 2200, estoque: 20, categoriaId: categorias[3].id } }),
    prisma.produto.create({ data: { nome: 'Mesa de Escritório', preco: 850, estoque: 15, categoriaId: categorias[3].id } }),
    prisma.produto.create({ data: { nome: 'Clean Code', preco: 89, estoque: 60, categoriaId: categorias[4].id } }),
    prisma.produto.create({ data: { nome: 'The Pragmatic Programmer', preco: 95, estoque: 40, categoriaId: categorias[4].id } }),
  ]);
  console.log(`✅ ${produtos.length} produtos criados`);

  // 3. Clientes — variados por estado pra alimentar os relatórios
  const clientes = await Promise.all([
    prisma.cliente.create({ data: { nome: 'Vitor', email: 'Vitor@gmail.com', cidade: 'Guarapuava', estado: 'PR', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Pedro', email: 'pedro@email.com', cidade: 'Guarapuava', estado: 'PR', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Gustavo', email: 'gustavo@email.com', cidade: 'Guarapuava', estado: 'PR', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Ana Costa', email: 'ana@email.com', cidade: 'Campinas', estado: 'SP', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Carlos Souza', email: 'carlos@email.com', cidade: 'Rio de Janeiro', estado: 'RJ', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Julia Lima', email: 'julia@email.com', cidade: 'Belo Horizonte', estado: 'MG', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Lucas Ferreira', email: 'lucas@email.com', cidade: 'Porto Alegre', estado: 'RS', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Fernanda Rocha', email: 'fernanda@email.com', cidade: 'Florianópolis', estado: 'SC', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Bruno Alves', email: 'bruno@email.com', cidade: 'Salvador', estado: 'BA', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Camila Martins', email: 'camila@email.com', cidade: 'Recife', estado: 'PE', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Rafael Gomes', email: 'rafael@email.com', cidade: 'Londrina', estado: 'PR', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Patrícia Nunes', email: 'patricia@email.com', cidade: 'Ribeirão Preto', estado: 'SP', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Diego Cardoso', email: 'diego@email.com', cidade: 'Fortaleza', estado: 'CE', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Larissa Pereira', email: 'larissa@email.com', cidade: 'Manaus', estado: 'AM', pais: 'Brasil' } }),
    prisma.cliente.create({ data: { nome: 'Thiago Barbosa', email: 'thiago@email.com', cidade: 'Brasília', estado: 'DF', pais: 'Brasil' } }),
  ]);
  console.log(`✅ ${clientes.length} clientes criados`);

  // 4. Pedidos com datas variadas pra alimentar a IA
  // Clientes ativos — pedidos recentes (baixo risco de churn)
  const pedidosAtivos = await Promise.all([
    prisma.pedido.create({ data: { clienteId: clientes[0].id, categoriaId: categorias[0].id, criadoEm: new Date('2026-01-10'), itens: { create: [{ produtoId: produtos[0].id, quantidade: 1 }, { produtoId: produtos[3].id, quantidade: 2 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[0].id, categoriaId: categorias[0].id, criadoEm: new Date('2026-03-20'), itens: { create: [{ produtoId: produtos[1].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[0].id, categoriaId: categorias[1].id, criadoEm: new Date('2026-05-01'), itens: { create: [{ produtoId: produtos[5].id, quantidade: 3 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[1].id, categoriaId: categorias[2].id, criadoEm: new Date('2026-02-14'), itens: { create: [{ produtoId: produtos[8].id, quantidade: 2 }, { produtoId: produtos[9].id, quantidade: 3 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[1].id, categoriaId: categorias[0].id, criadoEm: new Date('2026-04-10'), itens: { create: [{ produtoId: produtos[2].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[2].id, categoriaId: categorias[3].id, criadoEm: new Date('2026-03-05'), itens: { create: [{ produtoId: produtos[11].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[2].id, categoriaId: categorias[0].id, criadoEm: new Date('2026-05-15'), itens: { create: [{ produtoId: produtos[0].id, quantidade: 1 }, { produtoId: produtos[4].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[3].id, categoriaId: categorias[4].id, criadoEm: new Date('2026-04-22'), itens: { create: [{ produtoId: produtos[13].id, quantidade: 2 }, { produtoId: produtos[14].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[4].id, categoriaId: categorias[1].id, criadoEm: new Date('2026-05-10'), itens: { create: [{ produtoId: produtos[6].id, quantidade: 2 }, { produtoId: produtos[7].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[14].id, categoriaId: categorias[0].id, criadoEm: new Date('2026-05-20'), itens: { create: [{ produtoId: produtos[1].id, quantidade: 2 }] } } }),
  ]);

  // Clientes em risco — pedidos antigos (alto risco de churn)
  const pedidosRisco = await Promise.all([
    prisma.pedido.create({ data: { clienteId: clientes[5].id, categoriaId: categorias[2].id, criadoEm: new Date('2024-06-10'), itens: { create: [{ produtoId: produtos[8].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[6].id, categoriaId: categorias[1].id, criadoEm: new Date('2024-03-22'), itens: { create: [{ produtoId: produtos[5].id, quantidade: 2 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[7].id, categoriaId: categorias[4].id, criadoEm: new Date('2024-08-15'), itens: { create: [{ produtoId: produtos[13].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[8].id, categoriaId: categorias[3].id, criadoEm: new Date('2024-05-30'), itens: { create: [{ produtoId: produtos[12].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[9].id, categoriaId: categorias[0].id, criadoEm: new Date('2024-11-05'), itens: { create: [{ produtoId: produtos[3].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[10].id, categoriaId: categorias[2].id, criadoEm: new Date('2024-07-18'), itens: { create: [{ produtoId: produtos[9].id, quantidade: 4 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[11].id, categoriaId: categorias[1].id, criadoEm: new Date('2024-04-25'), itens: { create: [{ produtoId: produtos[6].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[12].id, categoriaId: categorias[0].id, criadoEm: new Date('2024-09-12'), itens: { create: [{ produtoId: produtos[2].id, quantidade: 1 }] } } }),
    prisma.pedido.create({ data: { clienteId: clientes[13].id, categoriaId: categorias[4].id, criadoEm: new Date('2024-02-28'), itens: { create: [{ produtoId: produtos[14].id, quantidade: 2 }] } } }),
  ]);

  console.log(`✅ ${pedidosAtivos.length + pedidosRisco.length} pedidos criados`);
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