import pandas as pd
import numpy as np

np.random.seed(42)
quantidade = 500

# Gera dados aleatórios mas com lógica real
total_pedidos = np.random.randint(1, 50, quantidade)
valor_total_gasto = np.random.uniform(100, 50000, quantidade)
dias_sem_comprar = np.random.randint(0, 365, quantidade)

# Lógica de churn — cliente some se compra pouco e sumiu há muito tempo
churn = []
for i in range(quantidade):
    if dias_sem_comprar[i] > 180 and total_pedidos[i] < 5:
        churn.append(1)  # churn = sim
    elif dias_sem_comprar[i] > 90 and valor_total_gasto[i] < 500:
        churn.append(1)
    else:
        churn.append(0)  # churn = não

df = pd.DataFrame({
    'total_pedidos': total_pedidos,
    'valor_total_gasto': valor_total_gasto,
    'dias_sem_comprar': dias_sem_comprar,
    'churn': churn
})

df.to_csv('dados_clientes.csv', index=False)
print(f"Dataset gerado: {len(df)} registros")
print(f"Churn: {df['churn'].sum()} clientes ({df['churn'].mean()*100:.1f}%)")