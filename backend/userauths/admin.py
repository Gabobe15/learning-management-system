from django.contrib import admin # type: ignore
from userauths.models import User, Profile,  Reset

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'country', 'date']
    
admin.site.register(User)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Reset)
# admin.site.register(RoleSex)
