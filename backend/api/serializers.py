from django.contrib.auth.password_validation import validate_password
from api import models as api_models
from userauths.models import Profile, User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User 
        fields = ['full_name', 'email', 'password', 'password2']
        
    def validate(self, attr):
        if attr['password'] != attr['password2']:
            raise serializers.ValidationError({"password": "password didn't match."})
        return attr
    
    def create(self, validated_data):
        user = User.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
        )
        
        email_username = user.email.split('@')
        user.username = email_username
        user.set_password(validated_data['password'])
        user.save()
        
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile 
        fields = '__all__'
        # fields = ['id','user','image','full_name','country','about','date',
        # ]
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = '__all__'
        # fields = ["id","username","email", "full_name", "otp","refresh_token"]
        
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ["user","image","full_name","bio","facebook","twitter","linkedin","about", "country","students","courses","review",]
        fields = '__all__'
        model = api_models.Teacher 
            
class VariantItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.VariantItem
        fields = '__all__'
        
    def __init__(self, *args, **kwargs):
        super(VariantItemSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
        # fields = ["variant","title","description","file","duration","content_duration","preview","variant_item_id","date",
        # ]
        
class VariantSerializer(serializers.ModelSerializer):
    variant_items = VariantItemSerializer(many=True)
    class Meta:
        model = api_models.Variant
        fields = '__all__' 
        
    def __init__(self, *args, **kwargs):
        super(VariantSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta: 
        fields = ['id','title', 'image', 'slug', 'course_count']
        model = api_models.Category
                
class Question_Answer_MessageSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = api_models.Question_Answer_Message
        fields = '__all__'
        
        # fields = ['id','course','question','user','message','date','profile']
        
class Question_AnswerSerializer(serializers.ModelSerializer):
    messages = Question_Answer_MessageSerializer(many=True)
    profile = ProfileSerializer(many=False)
    class Meta:
        model = api_models.Question_Answer
        fields = '__all__'
        
        # fields = ['id','course','user','title','qa_id','date', 'profile', 'messages']
        
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = api_models.Cart
        
    def __init__(self, *args, **kwargs):
        super(CartSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
                
class CartOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.CartOrderItem
        fields = '__all__'
    def __init__(self, *args, **kwargs):
        super(CartOrderItemSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
          
        # fields = ['id','order','course','teacher','price','tax_fee','total','initial_amount','saved','coupons','applied_coupon','oid','date']

class CartOrderSerializer(serializers.ModelSerializer):
    order_items = CartOrderItemSerializer(many=True)
    
    class Meta:
        # fields = '__all__' 
        fields =  "__all__"
        model = api_models.CartOrder
        
    def __init__(self, *args, **kwargs):
        super(CartOrderSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
        
class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Certificate
        fields = '__all__'
        
class CompletedLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.CompletedLesson
        fields = '__all__'
        
    def __init__(self, *args, **kwargs):
        super(CompletedLessonSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
        
        # fields = ['id','course','user','variant_item','date',
        # ]  
        
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Note
        fields = '__all__'
        
        # fields = ['id','user','course','title','note','note_id','date',
        # ]
        
class ReviewSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)
    class Meta:
        model = api_models.Review
        fields = '__all__'
        
    def __init__(self, *args, **kwargs):
        super(ReviewSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
        # fields = ['id','user','course','review','rating','reply','date','profile']
        
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Notification
        fields = '__all__'
        
class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Coupon
        fields = '__all__'
        
class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.WishList
        fields = '__all__'
        
    def __init__(self, *args, **kwargs):
        super(WishListSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
        
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Country
        fields = '__all__'

class EnrolledCourseSerializer(serializers.ModelSerializer):
    lectures = VariantItemSerializer(many=True, read_only=True)
    completed_lesson = CompletedLessonSerializer(many=True, read_only=True)
    curriculum = VariantSerializer(many=True, read_only=True)
    note = NoteSerializer(many=True, read_only=True)
    question_answer = Question_AnswerSerializer(many=True, read_only=True)
    review = ReviewSerializer(many=False, read_only=True)
    class Meta:
        model = api_models.EnrolledCourse
        fields = '__all__'
        
        # fields = ["id","course","user","teacher","order_item","enrollment_id","date","lectures","completed_lesson","curriculum","note","question_answer","review",
        # ]
        
    def __init__(self, *args, **kwargs):
        super(EnrolledCourseSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3
            
            
class CourseSerializer(serializers.ModelSerializer):
    students = EnrolledCourseSerializer(many=True, required=False, read_only=True) #we expect many student to be in this course
    curriculum = VariantSerializer(many=True, required=False, read_only=True)
    lectures = VariantItemSerializer(many=True, required=False, read_only=True)
    reviews = ReviewSerializer(many=True, required=False)
    # average_rating = ReviewSerializer()
    # rating_count = ReviewSerializer()
    # rating_count =  ReviewSerializer()
    class Meta:
        # fields = '__all__'
        fields = ["id","category","teacher", "file", "image","title", "description", "price", "language", "level", "platform_status", "teacher_course_status", "featured", "course_id", "slug", "date", "students", "curriculum", "lectures", "average_rating", "rating_count", "reviews"]
        model = api_models.Course
        
    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class StudentSummarySerializer(serializers.Serializer): #we are going to pass information to frontend 
    total_courses = serializers.IntegerField(default=0)
    completed_lessons = serializers.IntegerField(default=0)
    achieved_certificates = serializers.IntegerField(default=0)


class TeacherSummarySerializer(serializers.Serializer): 
    total_courses = serializers.IntegerField(default=0)
    total_students = serializers.IntegerField(default=0)
    total_revenue = serializers.IntegerField(default=0)
    monthly_revenue = serializers.IntegerField(default=0)









