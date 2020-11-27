#!/usr/bin/env python
# coding: utf-8

# In[1]:

import sys
import pandas as pd
from pandas import json_normalize
import numpy as np
import json
from numpy import random


# ## Carga de datos de terminales

# In[2]:

def init():
	with open('/Users/eduiglesias/dev/hackathon2020/back/python/terminalDetails.json', encoding='utf-8') as json_file:
	    rawData = json.load(json_file)

	# ## Limpieza de datos
	# #### Transformación de datos

	# In[3]:
	filterData = []
	rawList = rawData["list"]

	rawDf = []
	for model in rawList:
	    if "listTerminals" in model:
	        for terminal in model["listTerminals"]:
	            row = []
	            columnName = []
	            if "nombre" in model:
	                row.append(model["nombre"])
	                columnName.append("nombre")
	            if "capacidadBateria" in terminal:
	                row.append(terminal["capacidadBateria"])
	                columnName.append("capacidadBateria")
	            if "camaraTrasera" in terminal:
	                row.append(terminal["camaraTrasera"])
	                columnName.append("camaraTrasera")
	            if "camaraFrontal" in terminal:
	                row.append(terminal["camaraFrontal"])
	                columnName.append("camaraFrontal")
	            if "memoriaInterna" in terminal:
	                row.append(terminal["memoriaInterna"])
	                columnName.append("memoriaInterna")
	            if "resolucionPantalla" in terminal:
	                row.append(terminal["resolucionPantalla"])
	                columnName.append("resolucionPantalla")
	            if "tamanoPantalla" in terminal:
	                row.append(terminal["tamanoPantalla"])
	                columnName.append("tamanoPantalla")
	            if "marca" in terminal:
	                row.append(terminal["marca"])
	                columnName.append("marca")
	            if "pagoAlContadoConIva" in terminal:
	                row.append(terminal["pagoAlContadoConIva"])
	                columnName.append("pagoAlContadoConIva")
	            if "ram" in terminal:
	                row.append(terminal["ram"])
	                columnName.append("ram")
	            if "versionProcesador" in terminal:
	                row.append(terminal["versionProcesador"])
	                columnName.append("versionProcesador")
	            if "mobileNetwork" in terminal:
	                row.append(terminal["mobileNetwork"])
	                columnName.append("mobileNetwork")
	            if "sap" in terminal:
	                row.append(terminal["sap"])
	                columnName.append("sap")
	            if "imagenFrontal" in terminal:
	        		    row.append(terminal["imagenFrontal"])
	        		    columnName.append("imagenFrontal")


	            rawDf.append(row)

	df = pd.DataFrame(rawDf, columns = columnName)


	# #### Eliminación de filas con datos incorrectos

	# In[4]:
	df = df[df['memoriaInterna'].str.find('MB') < 0]
	df = df[df['capacidadBateria'].str.find('Mp') < 0]
	df = df[df['camaraFrontal'].str.find('GB') < 0]
	df = df[df['camaraFrontal'].str.find('240 x 320') < 0]
	df = df[df['memoriaInterna'].str.find('x') < 0]
	df = df[df['tamanoPantalla'].str.find('Samsung') < 0]
	df = df[df['tamanoPantalla'].str.find('Nokia') < 0]
	df = df[df['ram'].str.find('SDM855 + X50 Modem') < 0]
	df = df[df['ram'].str.find('Exynos 9810') < 0]
	df = df[df['ram'].str.find('5G') < 0]
	df = df[df['ram'].str.find('4G') < 0]
	df = df[df['ram'].str.find('Dual 2.2 GHz + Hexa 1.8 GHz') < 0]
	df = df[df['ram'].str.find('Qualcomm 730G') < 0]
	df = df[df['ram'].str.find('Snapdragon 855+') < 0]
	df = df[df['resolucionPantalla'].str.find('FHD+') < 0]


	# #### Limpieza en datos para dejarlos de tipo numérico

	# In[5]:
	df['capacidadBateria'] = df['capacidadBateria'].str.replace(' mAh', '')
	df['camaraTrasera'] = df['camaraTrasera'].str.replace(' Mp', '')
	df['camaraFrontal'] = df['camaraFrontal'].str.replace(' Mp', '')
	df['memoriaInterna'] = df['memoriaInterna'].str.replace(' GB', '')
	df['resolucionPantalla'] = df['resolucionPantalla'].str.replace('px', '')
	df['resolucionPantalla'] = df['resolucionPantalla'].str.replace(' ', '')
	df['tamanoPantalla'] = df['tamanoPantalla'].str.replace('"', '')
	df['tamanoPantalla'] = df['tamanoPantalla'].str.replace(',', '.')
	df['tamanoPantalla'] = df['tamanoPantalla'].str.replace('Tactil ', '')
	df['tamanoPantalla'] = df['tamanoPantalla'].str.replace(' ', '')
	df['tamanoPantalla'] = df['tamanoPantalla'].str.replace('¨', '')
	df['tamanoPantalla'] = df['tamanoPantalla'].str.replace('HD+', '')
	df['tamanoPantalla'] = df['tamanoPantalla'].str.replace('DotDrop', '')
	df['tamanoPantalla'] = df['tamanoPantalla'].str.replace('OLED', '')

	df["resolucionPantalla"].replace('FHD+', '1920x1080')

	df['ram'] = df['ram'].str.replace(' GB', '')


	# In[6]:


	df['capacidadBateria'] = df['capacidadBateria'].astype(int)
	df['camaraTrasera'] = df['camaraTrasera'].astype(int)
	df['camaraFrontal'] = df['camaraFrontal'].astype(int)
	df['memoriaInterna'] = df['memoriaInterna'].astype(int)

	df['tamanoPantalla'] = df['tamanoPantalla'].astype(float)
	df['pagoAlContadoConIva'] = df['pagoAlContadoConIva'].astype(int)
	df['ram'] = df['ram'].astype(int)


	# In[7]:


	# #### Resolución de pantalla separada en componente vertical y horizontal

	# In[8]:
	df['resolucionPantalla'] = df['resolucionPantalla'].astype(str)
	df[['resolucionX','resolucionY']] = df['resolucionPantalla'].str.split("x",expand=True,)


	# ## Estadísticas del dataframe de teléfonos móviles

	# In[9]:
	dfStats = df.describe()



	# ## Creación de Dataframe sintético de usuarios

	# In[10]:
	# cliPantalla = [0, 1, 2]
	# cliApps = ["trabajo", "redes", "foto-vídeo", "softgaming", "hardgaming", "streaming"]
	# cliPrecio = [0, 1, 2]
	# cliHardUser = [0, 1, 2]

	# userList = []

	# for i in range(50):
	#     pantalla = random.choice(cliPantalla)
	#     precio = random.choice(cliPrecio)
	#     hardUser = random.choice(cliHardUser)
	#     random.shuffle(cliApps)

	#     user = [pantalla, precio, hardUser, 0, 0, 0, 0, 0, 0]
	#     userList.append(user)

	# dfUsers = pd.DataFrame(userList, columns = ["pantalla", "precio", "hardUser", "trabajo", "redes", "foto-vídeo", "softgaming", "hardgaming", "streaming"])
	# dfUsers


	# In[11]:


	# useChoices = random.choice(range(6), p=[0.15, 0.2, 0.35, 0.15, 0.1, 0.05], size=(50))
	# count = 0
	# for numChoices in useChoices:
	#     random.shuffle(cliApps)
	#     for i in range(numChoices):
	#         #dfUsers[numChoices, cliApps[i]] = 1
	#         dfUsers.iloc[count].loc[cliApps[i]] = 1
	#     count += 1
	# dfUsers


	# ### Percentil de corte de características según las preferencias de usuarios

	# In[12]:
	zeroData = np.zeros([1, 7])
	userQuantile = pd.DataFrame(zeroData, columns = ["capacidadBateria", "camaraTrasera", "camaraFrontal", "memoriaInterna", "tamanoPantalla", "pagoAlContadoConIva", "ram"])

	# sys.argv[0] = cliPantalla = [0, 1, 2]
	# sys.argv[1] = cliPrecio = [0, 1, 2]
	# sys.argv[2] = cliHardUser = [0, 1, 2]
	# sys.argv[3-8] = cliApps = ["trabajo", "redes", "foto-vídeo", "softgaming", "hardgaming", "streaming"]

	userQuantile["tamanoPantalla"] += int(sys.argv[1])
	userQuantile["pagoAlContadoConIva"] += int(sys.argv[2])
	userQuantile["capacidadBateria"] += int(sys.argv[3])

	userQuantile["ram"] += int(sys.argv[4])
	userQuantile["memoriaInterna"] += int(sys.argv[4])

	userQuantile["ram"] += int(sys.argv[5])
	userQuantile["camaraTrasera"] += int(sys.argv[5])
	userQuantile["camaraFrontal"] += int(sys.argv[5])
	userQuantile["memoriaInterna"] += int(sys.argv[5])

	userQuantile["camaraTrasera"] += int(sys.argv[6])
	userQuantile["memoriaInterna"] += int(sys.argv[6])

	userQuantile["memoriaInterna"] += int(sys.argv[7])

	userQuantile["ram"] += int(sys.argv[8])
	userQuantile["tamanoPantalla"] += int(sys.argv[8])
	userQuantile["memoriaInterna"] += int(sys.argv[8])
	userQuantile["capacidadBateria"] += int(sys.argv[8])

	userQuantile["tamanoPantalla"] += int(sys.argv[9])
	userQuantile["capacidadBateria"] += int(sys.argv[9])
	userQuantile["ram"] += int(sys.argv[9])


	userQuantile["tamanoPantalla"] /= 4
	userQuantile["pagoAlContadoConIva"] /= 2
	userQuantile["capacidadBateria"] /= 4
	userQuantile["ram"] /= 4
	userQuantile["camaraTrasera"] /= 2
	userQuantile["camaraFrontal"] /= 2
	userQuantile["memoriaInterna"] /= 5

	# normalized_df=(dfFoo-dfFoo.min())/(dfFoo.max()-dfFoo.min())
	# normalized_df


	# In[13]:
	# randUser = random.randint(0, 49)
	# userQuantile = normalized_df.iloc[randUser]
	# userQuantile


	# In[14]:
	userPreferences = pd.DataFrame(zeroData, columns = ["capacidadBateria", "camaraTrasera", "camaraFrontal", "memoriaInterna", "tamanoPantalla", "pagoAlContadoConIva", "ram"])
	userPreferences["capacidadBateria"] = df["capacidadBateria"].quantile(float(userQuantile["capacidadBateria"]))
	userPreferences["camaraTrasera"] = df["camaraTrasera"].quantile(float(userQuantile["camaraTrasera"]))
	userPreferences["camaraFrontal"] = df["camaraFrontal"].quantile(float(userQuantile["camaraFrontal"]))
	userPreferences["memoriaInterna"] = df["memoriaInterna"].quantile(float(userQuantile["memoriaInterna"]))
	userPreferences["tamanoPantalla"] = df["tamanoPantalla"].quantile(float(userQuantile["tamanoPantalla"]))
	userPreferences["pagoAlContadoConIva"] = df["pagoAlContadoConIva"].quantile(float(userQuantile["pagoAlContadoConIva"])/2 + 0.15)
	userPreferences["ram"] = df["ram"].quantile(float(userQuantile["ram"]))


	userPreferences = userPreferences.iloc[0]


	# In[15]:
	df["percBateria"] = (df["capacidadBateria"] - userPreferences["capacidadBateria"]) / (df["capacidadBateria"].max()-df["capacidadBateria"].min())
	df["percBateria"] = abs(df["percBateria"])

	df["percCamaraTrasera"] = (df["camaraTrasera"] - userPreferences["camaraTrasera"]) / (df["camaraTrasera"].max()-df["camaraTrasera"].min())
	df["percCamaraTrasera"] = abs(df["percCamaraTrasera"])

	df["percCamaraFrontal"] = (df["camaraFrontal"] - userPreferences["camaraFrontal"]) / (df["camaraFrontal"].max()-df["camaraFrontal"].min())
	df["percCamaraFrontal"] = abs(df["percCamaraFrontal"])

	df["percMemoriaInterna"] = (df["memoriaInterna"] - userPreferences["memoriaInterna"]) / (df["memoriaInterna"].max()-df["memoriaInterna"].min())
	df["percMemoriaInterna"] = abs(df["percMemoriaInterna"])

	df["percPantalla"] = (df["tamanoPantalla"] - userPreferences["tamanoPantalla"]) / (df["tamanoPantalla"].max()-df["tamanoPantalla"].min())
	df["percPantalla"] = abs(df["percPantalla"])

	df["percPrecio"] = (df["pagoAlContadoConIva"] - userPreferences["pagoAlContadoConIva"]) / (df["pagoAlContadoConIva"].max()-df["pagoAlContadoConIva"].min())
	df["percPrecio"] = abs(df["percPrecio"])

	df["percRam"] = (df["ram"] - userPreferences["ram"]) / (df["ram"].max()-df["ram"].min())
	df["percRam"] = abs(df["percRam"])

	df["match"] = df["percBateria"]*10 + df["percCamaraTrasera"]*15 + df["percCamaraFrontal"]*15 + df["percMemoriaInterna"]*10 + df["percPrecio"]*30 + df["percPantalla"]*10 + df["percRam"]*10
	df["match"] = 100 - df["match"]

	df.sort_values(by = ["match", "pagoAlContadoConIva"], ascending = [False, True])

	dfMatch = df.sort_values(by = ["match"], ascending = False).drop_duplicates(subset = ["nombre"])


	# In[19]:
	dfMatch.filter(["marca", "nombre", "pagoAlContadoConIva", "match", "sap","imagenFrontal"]).head(10)
	dfMatch.head(15).to_json(r'python/tusMovilesGracias.json')

if (__name__ == "__main__"):
	init()
