"use client";

import { useEffect, useState } from "react";

import {
  preverTodosClientes,
  scoringClientes,
} from "../../services/churn.service";

import {
  ChurnCliente,
  ScoringCliente,
} from "../../types/churn";

import { ChurnCard } from "../../components/churn/ChurnCard";
import { ChurnTable } from "../../components/churn/ChurnTable";
import { ScoreBadge } from "../../components/churn/ScoreBadge";

export default function ChurnPage() {
  const [clientes, setClientes] = useState<ChurnCliente[]>([]);
  const [scores, setScores] = useState<ScoringCliente[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    try {
      const churnData = await preverTodosClientes();
      const scoringData = await scoringClientes();

      setClientes(churnData);
      setScores(scoringData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const clientesRiscoAlto = clientes.filter(
    (c) => c.probabilidade >= 0.7
  ).length;

  const mediaScore =
    scores.reduce((acc, item) => acc + item.score, 0) /
      scores.length || 0;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Inteligência Estratégica
          </h1>

          <p className="text-slate-500">
            Monitoramento de churn e scoring de clientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ChurnCard
            title="Clientes com Alto Risco"
            value={clientesRiscoAlto}
            danger
          />

          <ChurnCard
            title="Score Médio"
            value={mediaScore.toFixed(0)}
          />
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Previsão de Churn
          </h2>

          {loading ? (
            <div className="bg-white p-6 rounded-2xl shadow-md">
              Carregando...
            </div>
          ) : (
            <ChurnTable clientes={clientes} />
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Ranking de Clientes
          </h2>

          <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">
                    Cliente
                  </th>

                  <th className="text-left p-4">
                    Score
                  </th>
                </tr>
              </thead>

              <tbody>
                {scores.map((cliente) => (
                  <tr
                    key={cliente.clienteId}
                    className="border-t border-slate-200"
                  >
                    <td className="p-4 font-medium">
                      {cliente.nome}
                    </td>

                    <td className="p-4">
                      <ScoreBadge
                        score={cliente.score}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}