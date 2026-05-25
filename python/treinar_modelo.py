import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import classification_report
import joblib

# 1. Carrega os dados
df = pd.read_csv('dados_clientes.csv')

# 2. Remove duplicados
df = df.drop_duplicates()
print(f"Registros após remover duplicados: {len(df)}")

# 3. Remove outliers com Z-Score
from scipy import stats
z_scores = np.abs(stats.zscore(df[['total_pedidos', 'valor_total_gasto', 'dias_sem_comprar']]))
df = df[(z_scores < 3).all(axis=1)]
print(f"Registros após remover outliers: {len(df)}")

# 4. Normalização Min-Max
scaler = MinMaxScaler()
features = ['total_pedidos', 'valor_total_gasto', 'dias_sem_comprar']
df[features] = scaler.fit_transform(df[features])

# 5. Separa features e target
X = df[features]
y = df['churn']

# 6. Divide treino e teste (80% treino, 20% teste)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 7. Treina o Random Forest
modelo = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
modelo.fit(X_train, y_train)

# 8. Avalia o modelo
y_pred = modelo.predict(X_test)
print("\nResultados do modelo:")
print(classification_report(y_test, y_pred))

# 9. Salva o modelo e o scaler
joblib.dump(modelo, 'modelo_churn.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("\nModelo salvo em modelo_churn.pkl")