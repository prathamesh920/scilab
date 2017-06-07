from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'website.views.landing', name='landing'),
    url(r'^app', 'website.views.app', name='app')
)
