from userauths.models import Profile,User
from rest_framework import serializers

class ProfileSerailizer(serializers.modelSerializer):
    class Meta:
        model = Profile 
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = '__all__'