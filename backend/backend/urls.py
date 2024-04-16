from django.contrib import admin # type: ignore
from django.urls import path, include # type: ignore

# media and static 
from django.conf import settings # type: ignore
from django.conf.urls.static import static # type: ignore

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include("api.urls"))
]

# adding media & static to main url 
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)