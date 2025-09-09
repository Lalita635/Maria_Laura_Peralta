import random
import sys

# =========================================
# 🎮 Tic Tac Toe / Ta-Te-Ti
# Autor: Lalita635
# Web: http://bit.ly/45BE8TF
# Colaborá: http://bit.ly/4fS0yUa
# =========================================


tablero = [" "] * 9
idioma = "es"


def mostrar_tablero():
    print()
    for i in range(0, 9, 3):
        print(f" {tablero[i]} | {tablero[i+1]} | {tablero[i+2]} ")
        if i < 6:
            print("---+---+---")
    print()

def verificar_ganador(simbolo):
    combinaciones = [
        [0,1,2], [3,4,5], [6,7,8],  # filas
        [0,3,6], [1,4,7], [2,5,8],  # columnas
        [0,4,8], [2,4,6]            # diagonales
    ]
    for c in combinaciones:
        if tablero[c[0]] == tablero[c[1]] == tablero[c[2]] == simbolo:
            return True
    return False

def verificar_empate():
    return " " not in tablero

def movimiento_jugador(jugador):
    while True:
        try:
            msg = f"Jugador {jugador}, elige una casilla (1-9): " if idioma == "es" else f"Player {jugador}, choose a cell (1-9): "
            movimiento = int(input(msg)) - 1
            if movimiento < 0 or movimiento > 8 or tablero[movimiento] != " ":
                print("❌ Movimiento inválido. Intenta de nuevo." if idioma == "es" else "❌ Invalid move. Try again.")
            else:
                return movimiento
        except ValueError:
            print("❌ Ingresa un número válido." if idioma == "es" else "❌ Enter a valid number.")


def ia_basica():
    posibles = [i for i in range(9) if tablero[i] == " "]
    return random.choice(posibles)

def ia_intermedia():
    # 1. Intentar ganar
    for i in range(9):
        if tablero[i] == " ":
            tablero[i] = "O"
            if verificar_ganador("O"):
                tablero[i] = " "
                return i
            tablero[i] = " "

    # 2. Bloquear al jugador
    for i in range(9):
        if tablero[i] == " ":
            tablero[i] = "X"
            if verificar_ganador("X"):
                tablero[i] = " "
                return i
            tablero[i] = " "

    return ia_basica()

def minimax(tablero, profundidad, es_max):
    if verificar_ganador("O"):
        return 1
    if verificar_ganador("X"):
        return -1
    if verificar_empate():
        return 0

    if es_max:  # Turno de la IA
        mejor_valor = -999
        for i in range(9):
            if tablero[i] == " ":
                tablero[i] = "O"
                valor = minimax(tablero, profundidad + 1, False)
                tablero[i] = " "
                mejor_valor = max(mejor_valor, valor)
        return mejor_valor
    else:  # Turno del jugador
        mejor_valor = 999
        for i in range(9):
            if tablero[i] == " ":
                tablero[i] = "X"
                valor = minimax(tablero, profundidad + 1, True)
                tablero[i] = " "
                mejor_valor = min(mejor_valor, valor)
        return mejor_valor

def ia_experta():
    mejor_mov = None
    mejor_valor = -999
    for i in range(9):
        if tablero[i] == " ":
            tablero[i] = "O"
            valor = minimax(tablero, 0, False)
            tablero[i] = " "
            if valor > mejor_valor:
                mejor_valor = valor
                mejor_mov = i
    return mejor_mov


def mostrar_creditos():
    if idioma == "es":
        print("╔═══════════════════════════════════════════╗")
        print("║  💻   Script creado por Lalita635         ║")
        print("║       Web: http://bit.ly/45BE8TF          ║")
        print("╚═══════════════════════════════════════════╝\n")
        input("Presiona ENTER para volver al menú...")
    else:
        print("╔═══════════════════════════════════════════╗")
        print("║  💻   Script created by Lalita635         ║")
        print("║       Web: http://bit.ly/45BE8TF          ║")
        print("╚═══════════════════════════════════════════╝\n")
        input("Press ENTER to return to menu...")


def jugar(modo, nivel=None):
    global tablero
    tablero = [" "] * 9
    jugador_actual = "X"

    while True:
        mostrar_tablero()

        if modo == "1":  # Jugador vs Jugador
            movimiento = movimiento_jugador(jugador_actual)

        elif modo == "2":  # Jugador vs IA
            if jugador_actual == "X":
                movimiento = movimiento_jugador(jugador_actual)
            else:
                print("🤖 La IA está pensando..." if idioma == "es" else "🤖 AI is thinking...")
                if nivel == "1":
                    movimiento = ia_basica()
                elif nivel == "2":
                    movimiento = ia_intermedia()
                elif nivel == "3":
                    movimiento = ia_experta()

        tablero[movimiento] = jugador_actual

        if verificar_ganador(jugador_actual):
            mostrar_tablero()
            if modo == "2" and jugador_actual == "O":
                print("🤖 ¡La IA gana!" if idioma == "es" else "🤖 AI wins!")
            else:
                print(f"🎉 ¡Jugador {jugador_actual} gana!" if idioma == "es" else f"🎉 Player {jugador_actual} wins!")
            break

        if verificar_empate():
            mostrar_tablero()
            print("🤝 ¡Empate!" if idioma == "es" else "🤝 It's a tie!")
            break

        jugador_actual = "O" if jugador_actual == "X" else "X"


def seleccionar_idioma():
    global idioma
    print("Seleccione el idioma / Select language:")
    print("1 - Español")
    print("2 - English")
    opcion = input("👉 Opción / Choice: ")
    if opcion == "2":
        idioma = "en"
    else:
        idioma = "es"

def menu_principal():
    while True:
        if idioma == "es":
            print("\n=== 🎮 Ta-Te-Ti ===")
            print("1. Jugador vs Jugador 👥")
            print("2. Jugador vs IA 🤖")
            print("3. Créditos")
            print("4. Salir")
            opcion = input("👉 Elige una opción: ")
        else:
            print("\n=== 🎮 Tic Tac Toe ===")
            print("1. Player vs Player 👥")
            print("2. Player vs AI 🤖")
            print("3. Credits")
            print("4. Exit")
            opcion = input("👉 Choose an option: ")

        if opcion == "1":
            jugar("1")
        elif opcion == "2":
            nivel = menu_dificultad()
            jugar("2", nivel)
        elif opcion == "3":
            mostrar_creditos()
        elif opcion == "4":
            print("👋 Adiós" if idioma == "es" else "👋 Goodbye")
            sys.exit()
        else:
            print("❌ Opción inválida." if idioma == "es" else "❌ Invalid option.")

def menu_dificultad():
    while True:
        if idioma == "es":
            print("\n=== Niveles de dificultad de la IA ===")
            print("1. Básico 🎲 (al azar)")
            print("2. Intermedio 🧠 (gana/bloquea)")
            print("3. Experto 🏆 (imbatible)")
            opcion = input("👉 Elige una dificultad: ")
        else:
            print("\n=== AI Difficulty Levels ===")
            print("1. Basic 🎲 (random)")
            print("2. Intermediate 🧠 (win/block)")
            print("3. Expert 🏆 (unbeatable)")
            opcion = input("👉 Choose a difficulty: ")

        if opcion in ["1", "2", "3"]:
            return opcion
        print("❌ Opción inválida." if idioma == "es" else "❌ Invalid option.")


seleccionar_idioma()
menu_principal()
