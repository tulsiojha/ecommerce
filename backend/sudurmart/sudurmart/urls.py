"""sudurmart URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('register', views.SignupViewSet.as_view(), name="register"),
    path('list', views.ProductList, name="list"),
    path('add_product', views.AddProduct, name="add"),
    path('get_product/<str:pk>/', views.GetProduct.as_view(), name="get"),
    path('add_to_cart', views.AddToCart.as_view(), name="add_to_cart"),
    path('get_cart', views.GetCart.as_view(), name="get_cart"),

    # path('test', views.test, name="test"),

]
