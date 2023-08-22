"""
URL configuration for plummycodeChat project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.static import serve as mediaserve
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView,
                                   SpectacularSwaggerView)

from . import settings

urlpatterns = i18n_patterns(
    path('admin/', admin.site.urls),

    path('i18n/', include('django.conf.urls.i18n')),

    # prefix_default_language=False
)

urlpatterns += [
    path('api/v1/users/', include('User.urls')),


    path('api/v1/chat/', include('Chat.urls')),
    path('api/v1/friendlist/', include('FriendList.urls')),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('api/schema/swagger-ui/',
         SpectacularSwaggerView.as_view(url_name='schema'),
         name='swagger-ui'),
]

if settings.DEBUG:
    import mimetypes

    mimetypes.add_type("application/javascript", ".js", True)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += [
        path(f'^{settings.MEDIA_URL.lstrip("/")}(?P<path>.*)$', mediaserve, {'document_root': settings.MEDIA_ROOT}),
        path(f'^{settings.STATIC_URL.lstrip("/")}(?P<path>.*)$',
             mediaserve, {'document_root': settings.STATIC_ROOT}),
    ]
