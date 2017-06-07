from django.shortcuts import render
from django.core.context_processors import csrf
from .models import ListOfCategory

def landing(request):
    context = {}
    return render(request, 'website/templates/landing.html', context)

def app(request):
    catg = ListOfCategory.objects.all().order_by('category_name')
    context = {'catg':catg,}
    return render(request, 'website/templates/index.html', context)
