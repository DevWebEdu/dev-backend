from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from .models import Tarea



class PruebaSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length=40)
    apellido = serializers.CharField(max_length=40)

class  TareaSerializer(serializers.ModelSerializer):
    ...
    class Meta:
        model =  Tarea
        #fields> sirve para indicar que atributos voy a necesitar / mostrar al cliente
        #en el fields podemos setear una lista de todos los atributos que vamos a utilizar o si vamos a usar todos entoncesvamos a usar '__ all __'
        fields = '__all__'