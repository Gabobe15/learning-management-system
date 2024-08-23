from django.db import models # type: ignore
from django.contrib.auth.models import AbstractUser, BaseUserManager # type: ignore
from django.db.models.signals import post_save #type: ignore
from django.utils import timezone

Role = (
    ('student', 'Student'), #key value pair
    ('teacher', 'Teacher'),
    ('admin', 'Admin'),
)

SEX_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]



#level = models.CharField(max_length=100, choices=LEVEL, default='Beginner')


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email,password=None, **extra_field):
        if not email:
            raise ValueError('Email is a required field')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_field)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_field):
        extra_field.setdefault('is_staff', True)
        extra_field.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_field)


class User(AbstractUser):
    username = models.CharField(unique=True, max_length=100)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    tel_no = models.CharField(max_length=256, blank=True, null=True)
    sex = models.CharField(max_length=10, choices=SEX_CHOICES)
    role = models.CharField(max_length=20, choices=Role, default='student')
    otp = models.CharField(max_length=1000, null=True, blank=True)
    refresh_token = models.CharField(max_length=1000, null=True, blank=True,)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','full_name']
    
    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        email_username, full_name = self.email.split('@')
        if self.full_name == "" or self.full_name == None:
            self.full_name = email_username
        if self.username == "" or self.username == None:
            self.username = email_username
        super(User, self).save(*args, **kwargs)
        


# class RoleSex(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     sex = models.CharField(max_length=20, choices=Sex, default='male')
#     role = models.CharField(max_length=20, choices=Role, default='student')
    
#     def __str__(self):
#         return self.role
    
#     def save(self, *args, **kwargs):
#         super(RoleSex, self).save(*args, **kwargs)
    
# def create_user_role_sex(sender,instance, created, **kwargs):
#     if created:
#         RoleSex.objects.create(user=instance)

# def save_user_role_sex(sender, instance, **kwargs):
#     instance.role.save()
    
# post_save.connect(create_user_role_sex, sender=User)
# post_save.connect(save_user_role_sex, sender=User)
        
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to="user_folder",default="default-user.jpg", null=True, blank=True)
    full_name = models.CharField(max_length=100)
    country = models.CharField(max_length=100, null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        if self.full_name:
            return str(self.full_name)
        else:
            return str(self.user.full_name)
        
    def save(self, *args, **kwargs):
        if self.full_name == "" or self.full_name == "None":
            self.full_name = self.user.username
        super(Profile, self).save(*args, **kwargs)
    
def create_user_profile(sender,instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    
post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)



# class PasswordResetOTP(models.Model):
#     email = models.EmailField(max_length=254)
#     otp = models.CharField(max_length=15, unique=True)
#     date_created = models.DateTimeField(default=timezone.now)
#     status = models.EmailField(max_length=254, default='')
    
class Reset(models.Model):
    email = models.EmailField(max_length=255)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True) 