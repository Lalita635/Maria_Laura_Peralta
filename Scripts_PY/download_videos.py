from pytube import YouTube      #pip install pytube
import os

def Download(ytObj):
    ytObj = ytObj.streams.get_highest_resolution()      #busca la mejor resolución
    print('Aguarde un momento, su video se está descargando...')
    try:
        ytObj.download()        #descarga el video
    except:
        print("Ocurrió un error al descargar!!")
    print("Se ha descargado exitosamente")
    os.system('pause')


link = input("Ingrese la URL del video: ")
youtubeObject = YouTube(link)       #arma el objeto

Download(youtubeObject)