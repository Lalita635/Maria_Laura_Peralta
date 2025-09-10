# ===========================================
# 📊 Proyecto de Visualización de Datos Tabulares
# Dataset: Iris 🌸
# Autor: Lalita635
# Web: http://bit.ly/45BE8TF
# Colaborá: http://bit.ly/4fS0yUa
# ===========================================

# ===========================================
# ENGLISH VERSION:
# 📊 Data Visualization Project
# Dataset: Iris 🌸
# Author: Lalita635
# Website: http://bit.ly/45BE8TF
# Contribute: http://bit.ly/4fS0yUa
# ===========================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
from sklearn.datasets import load_iris


iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)


print("📌 Primeras filas del dataset / First rows of dataset:")
print(df.head())

print("📌 Información general / Dataset info:")
print(df.info())

print("📌 Estadísticas descriptivas / Descriptive statistics:")
print(df.describe())


# Histograma / Histogram
df.hist(figsize=(10,8), edgecolor="black")
plt.suptitle("Distribución de las variables / Variables distribution", fontsize=16, weight="bold")
plt.show()

# Dispersión / Scatterplot
plt.figure(figsize=(7,5))
sns.scatterplot(data=df, x="sepal length (cm)", y="sepal width (cm)", hue="species", palette="Set2")
plt.title("Relación entre largo y ancho del sépalo / Sepal length vs width", fontsize=14, weight="bold")
plt.xlabel("Largo del sépalo (cm) / Sepal length (cm)")
plt.ylabel("Ancho del sépalo (cm) / Sepal width (cm)")
plt.show()

# Matriz de correlación / Correlation matrix
plt.figure(figsize=(8,6))
sns.heatmap(df.drop("species", axis=1).corr(), annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Matriz de correlación / Correlation matrix", fontsize=14, weight="bold")
plt.show()

# Pairplot
sns.pairplot(df, hue="species", diag_kind="hist", palette="Set2")
plt.suptitle("Comparación de variables / Variable comparison", y=1.02, fontsize=16, weight="bold")
plt.show()

# Gráfico 3D interactivo / Interactive 3D scatter
fig = px.scatter_3d(
    df,
    x="sepal length (cm)",
    y="sepal width (cm)",
    z="petal length (cm)",
    color="species",
    size="petal width (cm)",
    symbol="species",
    title="🌸 Visualización 3D interactiva / Interactive 3D visualization"
)
fig.show()

# Boxplot interactivo / Interactive boxplot
fig2 = px.box(
    df, 
    x="species", 
    y="petal length (cm)", 
    color="species",
    title="📦 Distribución del largo de pétalos / Petal length distribution"
)
fig2.show()


print("""
✅ Conclusiones / Conclusions:
- La especie *Setosa* se diferencia claramente por sus pétalos cortos.
- *Versicolor* y *Virginica* presentan mayor superposición, aunque mantienen diferencias en el largo del pétalo.
- El dataset Iris es ideal para practicar clasificación multiclase y visualización de datos.

- The *Setosa* species is clearly distinguished by its short petals.
- *Versicolor* and *Virginica* overlap more, but still show differences in petal length.
- The Iris dataset is ideal for practicing multiclass classification and data visualization.
""")
