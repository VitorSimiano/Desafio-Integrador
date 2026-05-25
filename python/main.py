from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Carrega o modelo e o scaler quando o servidor sobe
modelo = joblib.load('modelo_churn.pkl')
scaler = joblib.load('scaler.pkl')

# Define o formato dos dados que vão chegar do NestJS
class ClienteData(BaseModel):
    total_pedidos: int
    valor_total_gasto: float
    dias_sem_comprar: int

@app.get('/')
def health_check():
    return { 'status': 'ok' }

@app.post('/prever-churn')
def prever_churn(cliente: ClienteData):
    # Monta os dados no formato que o modelo espera
    dados = np.array([[
        cliente.total_pedidos,
        cliente.valor_total_gasto,
        cliente.dias_sem_comprar
    ]])

    # Normaliza com o mesmo scaler usado no treino
    dados_normalizados = scaler.transform(dados)

    # Faz a previsão
    probabilidade = modelo.predict_proba(dados_normalizados)[0][1]
    classificacao = modelo.predict(dados_normalizados)[0]

    # Define o risco
    if probabilidade > 0.7:
        risco = 'alto'
    elif probabilidade > 0.4:
        risco = 'médio'
    else:
        risco = 'baixo'

    return {
        'churn': bool(classificacao),
        'probabilidade': round(float(probabilidade) * 100, 2),
        'risco': risco
    }