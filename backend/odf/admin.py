from django.contrib import admin
from .models import Donor
# Register your models here.
class Admin(admin.ModelAdmin):
    list_display = ('firstName', 'lastName', 'email', 'processed')

admin.site.register(Donor, Admin)
