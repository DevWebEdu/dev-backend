from django.urls import path
from .views import CategoriasView, ProductoView








urlpatterns = [
    path('productos', ProductoView.as_view()),
    path('categorias', CategoriasView.as_view())
]
