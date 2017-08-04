from django.shortcuts import render
from django.core.context_processors import csrf
from .models import ListOfCategory, TextbookCompanionProposal, TextbookCompanionPreference

def landing(request):
    context = {}
    return render(request, 'website/templates/landing.html', context)

def app(request):
    categories = ListOfCategory.objects.all().order_by('category_name')
    ids = TextbookCompanionProposal.objects.filter(proposal_status=3).values('id')
    d = {}
    for category in categories:
        books_count = TextbookCompanionPreference.objects.filter(category=category.id).filter(
        approval_status=1).filter(proposal_id__in=ids)
        d[category] = books_count
    print d
    context = {'d':d}
    return render(request, 'website/templates/index.html', context)
