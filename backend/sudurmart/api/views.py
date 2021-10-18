from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import mixins, viewsets
from api.models import Cart, Product
from api.serializer import CartReceiveSerializer, CartSerializer, ProductSerializer, SignupSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny  # <-- Here
from rest_framework import generics
import requests


@api_view(['GET'])
def ProductList(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# class ProductList(generics.CreateAPIView):
#     permission_classes = (AllowAny,)

#     def get(self, request, pk):
#         products = Product.objects.all()
#         serializer = ProductSerializer(products, many=True)
#         return Response(serializer.data)


class GetProduct(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        products = Product.objects.get(id=pk)
        serializer = ProductSerializer(products, many=False)
        return Response(serializer.data)


@api_view(['POST'])
def AddProduct(request):
    print(request.data)
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response("error inserting product")


# class SignupViewSet(generics.CreateAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = SignupSerializer


# @api_view(['GET'])
# def test(request):
#     apikey = "AIzaSyB3yIBn1xRke0CmxVoRAxSLOvZ5p3FZMgA"
#     r = requests.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/sendVerificationCode?key='+apikey, data={'phoneNumber': '+9779863085433'})
#     print(r.text)
#     return Response(r.text)


class AddToCart(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        data = request.data
        data['user'] = request.user.id
        
        serializer = CartSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response("error adding to cart")

    def get_serializer_class(self):
        return CartSerializer


class GetCart(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        cart = Cart.objects.filter(user=request.user.id)
        serializer = CartReceiveSerializer(cart, many=True)
        
        return Response(serializer.data)

    def get_serializer_class(self):
        return CartReceiveSerializer