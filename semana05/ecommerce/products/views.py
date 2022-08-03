from email.policy import HTTP
from itertools import product
from django.shortcuts import render

from rest_framework import generics , status
from rest_framework.response import Response
from .models import Categorias, Productos
from .serializers import CategoriasSerializer, ProductoSerializer

# Create your views here.

class ProductoView(generics.ListCreateAPIView):
    queryset  =  Productos.objects.all()
    serializer_class = ProductoSerializer


    def get(self,request):
        productos = self.get_serializer(self.get_queryset(), many = True)
        return Response(data={
                'success':True,
                'message': 'La lista de productos se encontró',
                'content' : productos.data
        }, status =  status.HTTP_200_OK)

    def post(self,request):
        producto = self.get_serializer(data=request.data)
        if producto.is_valid():
            producto.save()
            return Response(data={
                'success' : True,
                'content' : producto.data
            })



class CategoriasView(generics.ListCreateAPIView):
    queryset = Categorias.objects.filter(estado=True).all()
    serializer_class = CategoriasSerializer

    def get(self,request):
        categorias = self.get_serializer(self.get_queryset(),many=True)

        return Response(data = {
            'success' : True,
            'content': categorias.data
        })

    def post(self,request):
        categoria = self.get_serializer(data=request.data)
        if categoria.is_valid():
            categoria.save()
            return Response(data={
                'success' : True ,
                'content' : categoria.data
            })