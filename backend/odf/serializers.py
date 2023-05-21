from rest_framework import serializers
from .models import Donor

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ('firstName', 'lastName', 'email', 'processed')
