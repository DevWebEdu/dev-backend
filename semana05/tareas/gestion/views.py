
from cgi import print_directory
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.generics import  ListAPIView,ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import PruebaSerializer, TareaSerializer
from .models import Tarea

@api_view(http_method_names=['GET','POST'])
def inicio(request:Request):
    print(request)
    return Response(data={
        'message' : 'Endpoint de un decorador'
    })


class PruebaView(ListAPIView):
    # en cualquiera de las clases genericas se necesita declarar los atributos 
    #queryset > resultado de la consulta de nuestra iteraccion con nuestro ORM y este se una para los metodos de devolucion(GET)
    queryset = [{
        'nombre': 'eduardo',
        'apellido':'de rivero'
    },{
        'nombre': 'roxana',
        'apellido': 'gonzales'
    }]
    # serializador es un DTO (Data Transfer Object)
    #serializer_class > lo que va convertir nuestra informacion que llega desde el cliente y tambien la informacion que retornamos hacia el cliente
    serializer_class = PruebaSerializer

#admite un GET y un POST
class TareasView(ListCreateAPIView):
    queryset = Tarea.objects.all() # Select * from  tareas
    serializer_class= TareaSerializer 
    permission_classes = [IsAuthenticated]

    def get(self,request :Request):
        #cuando se modifica el metodo por algun comportamiento diferente entonces DRF ya ahora obedecera a este comportamiento  y es ahi cuando ya podemos utilizar todos los atributos del queryset y  serializer_class
        #get_queryset()> manda a llamar a la ejecucion de nuestro queryset
        usuarioId = request.user.id
        tareas = Tarea.object.filter(usuarioId= usuarioId). all()
        tareasSerializadas = self.serializer_class(tareas,many=True)
        return Response(data={

            'message':'Las tareas Son',
            'content': tareasSerializadas.data
        },status =status.HTTP_200_OK)

    def post(self,request: Request):
        body = request.data
        
        print(request)
        body['usuarioId'] = request.user.id
        #con esto agrego el id del usuario que esta generando la tarea
        instanciaSerializador = self.serializer_class(data=body)
        validacion = instanciaSerializador.is_valid(raise_exception=True)

        if validacion == True: 
            #save> guarda la informacion en la base de datos
            instanciaSerializador.save()
        
            return Response(data=instanciaSerializador.data, status=status.HTTP_201_CREATED)