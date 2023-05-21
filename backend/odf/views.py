from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DonationSerializer
from .models import Donor
# Create your views here.

class DonorView(viewsets.ModelViewSet):
    serializer_class = DonationSerializer
    queryset = Donor.objects.all()
