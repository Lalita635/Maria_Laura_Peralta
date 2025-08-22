# Script de ejemplo para consumir una API pública con requests
# Probando PyScript en html

import requests

def main():
    print("Consultando la API JSONPlaceholder...\n")
    
    url = "https://jsonplaceholder.typicode.com/todos/1"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        print("Respuesta recibida:")
        print(data)
    else:
        print("Error en la solicitud:", response.status_code)

if __name__ == "__main__":
    main()
