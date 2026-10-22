from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    # DJANGO ADMIN
    path('admin/', admin.site.urls),

    # YOUR APP ROUTES
    path('api/', include('manfood.urls')),

    # AUTHENTICATION
    path('api/login/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# MEDIA FILES
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )