"use client";

import { useEffect, useState } from "react";

import {
  vendasPorEstado,
  vendasPorCidade,
  vendasPorPais,
  topClientes,
  produtoMaisVendido,
  produtoMaiorValor,
  clientesResumo,
  historicoPorCliente,
  tempoMedioCompras,
} from "../../services/relatorio.service";

import { DashboardCard } from "../../components/relatorios/DashboardCard";

import { RelatorioSection } from "../../components/relatorios/RelatorioSection";

import { ExportPdfButton } from "../../components/relatorios/ExportPdfButton";

import { BarChartComponent } from "../../components/relatorios/charts/BarChartComponent";

import { PieChartComponent } from "../../components/relatorios/charts/PieChartComponent";

import { LineChartComponent } from "../../components/relatorios/charts/LineChartComponent";

export default function RelatoriosPage() {
  const [estadoData, setEstadoData] = useState([]);

  const [cidadeData, setCidadeData] = useState([]);

  const [paisData, setPaisData] = useState([]);

  const [topClientesData, setTopClientesData] = useState([]);

  const [produtoMaisVendidoData, setProdutoMaisVendidoData] =
    useState<any>(null);

  const [produtoMaiorValorData, setProdutoMaiorValorData] = useState<any>(null);

  const [clientesResumoData, setClientesResumoData] = useState([]);

  const [historicoClientesData, setHistoricoClientesData] = useState([]);

  const [tempoComprasData, setTempoComprasData] = useState([]);

  async function carregarDados() {
    const [
      estados,
      cidades,
      paises,
      topClientesResult,
      produtoMaisVendidoResult,
      produtoMaiorValorResult,
      clientesResumoResult,
      historicoResult,
      tempoResult,
    ] = await Promise.all([
      vendasPorEstado(),
      vendasPorCidade(),
      vendasPorPais(),
      topClientes(),
      produtoMaisVendido(),
      produtoMaiorValor(),
      clientesResumo(),
      historicoPorCliente(),
      tempoMedioCompras(),
    ]);

    setEstadoData(estados);
    setCidadeData(cidades);
    setPaisData(paises);

    setTopClientesData(topClientesResult);

    setProdutoMaisVendidoData(produtoMaisVendidoResult);

    setProdutoMaiorValorData(produtoMaiorValorResult);

    setClientesResumoData(clientesResumoResult);

    setHistoricoClientesData(historicoResult);

    setTempoComprasData(tempoResult);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div id="dashboard" className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Relatórios & Analytics
            </h1>

            <p className="text-slate-500">Painel gerencial e estratégico.</p>
          </div>

          <ExportPdfButton
            clientesResumo={clientesResumoData}
            produtoMaisVendido={produtoMaisVendidoData?.nome}
            produtoMaiorValor={produtoMaiorValorData?.nome}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <DashboardCard
            title="Produto Mais Vendido"
            value={produtoMaisVendidoData?.nome || "-"}
          />

          <DashboardCard
            title="Produto de Maior Valor"
            value={produtoMaiorValorData?.nome || "-"}
          />
        </div>

        <RelatorioSection title="Vendas por Estado">
          <BarChartComponent data={estadoData} />
        </RelatorioSection>

        <RelatorioSection title="Vendas por Cidade">
          <BarChartComponent data={cidadeData} />
        </RelatorioSection>

        <RelatorioSection title="Vendas por País">
          <PieChartComponent data={paisData} />
        </RelatorioSection>

        <RelatorioSection title="Top Clientes">
          <BarChartComponent data={topClientesData} />
        </RelatorioSection>

        <RelatorioSection title="Tempo Médio Entre Compras">
          <LineChartComponent data={tempoComprasData} />
        </RelatorioSection>

        <RelatorioSection title="Resumo de Clientes">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">Cliente</th>

                  <th className="text-left p-4">Pedidos</th>

                  <th className="text-left p-4">Total Gasto</th>
                </tr>
              </thead>

              <tbody>
                {clientesResumoData.map((cliente: any, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4">{cliente.cliente}</td>

                    <td className="p-4">{cliente.totalPedidos}</td>

                    <td className="p-4">
                      R$ {Number(cliente.totalGasto || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RelatorioSection>

        <RelatorioSection title="Histórico por Cliente">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">Cliente</th>

                  <th className="text-left p-4">Compras</th>
                </tr>
              </thead>

              <tbody>
                {historicoClientesData.map((cliente: any, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4">{cliente.cliente}</td>

                    <td className="p-4">{cliente.quantidadeCompras}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RelatorioSection>
      </div>
    </main>
  );
}
