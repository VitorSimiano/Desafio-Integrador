"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ClienteResumo {
  cliente: string;
  totalPedidos: number;
  totalGasto: number;
}

interface Props {
  clientesResumo?: ClienteResumo[];
  produtoMaisVendido?: string;
  produtoMaiorValor?: string;
}

export function ExportPdfButton({
  clientesResumo = [],
  produtoMaisVendido = "-",
  produtoMaiorValor = "-",
}: Props) {
  function exportPdf() {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("Relatório Gerencial", 14, 20);

    pdf.setFontSize(12);

    pdf.text(
      `Produto mais vendido: ${produtoMaisVendido}`,
      14,
      40
    );

    pdf.text(
      `Produto de maior valor: ${produtoMaiorValor}`,
      14,
      50
    );

    autoTable(pdf, {
      startY: 70,
      head: [
        [
          "Cliente",
          "Pedidos",
          "Total Gasto (R$)",
        ],
      ],
      body: clientesResumo.map(
        (cliente) => [
          cliente.cliente,
          cliente.totalPedidos,
          Number(
            cliente.totalGasto || 0
          ).toFixed(2),
        ]
      ),
    });

    pdf.save("relatorio-gerencial.pdf");
  }

  return (
    <button
      onClick={exportPdf}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
    >
      Exportar PDF
    </button>
  );
}