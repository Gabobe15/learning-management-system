from django.db import models
from userauths.models import User, Profile
from moviepy.editor import VideoFileClip
from django.utils.text import slugify
from shortuuid.django_fields import ShortUUIDField
from django.utils import timezone
import math

LANGUAGE = (
    ('English', 'English'), #key value pair
    ('Spanish', 'Spanish'),
    ('French', 'French'),
)

LEVEL = (
    ('Beginner', 'Beginner'), #key value pair
    ('Intermediate', 'Intermediate'),
    ('Advanced', 'Advanced'),
)

TEACHER_STATUS = (
    ('Draft', 'Draft'), #key value pair
    ('Disabled', 'Disabled'),
    ('Published', 'Published'),
)

PAYMENT_STATUS = (
    ('Paid', 'Paid'), #key value pair
    ('Processing', 'Processing'),
    ('Failed', 'Failed'),
)

PLATFORM_STATUS = (
    ('Review', 'Review'), #key value pair
    ('Rejected', 'Rejected'), #key value pair
    ('Disabled', 'Disabled'),
    ('Draft', 'Draft'),
    ('Published', 'Published'),
)

RATING = (
    (1, '1 Star'), 
    (2, '2 Star'), 
    (3, '3 Star'), 
    (4, '4 Star'), 
    (5, '5 Star'), 
)

NOTI_TYPE = (
    ('New Order', 'New Order'), 
    ('New Review', 'New Review'), 
    ('New Course Question', 'New Course Question'),
    ('Draft', 'Draft'),
    ('Course Published', 'Course Published'),
    ('Course Enrollment Completed', 'Course Enrollment Completed'),
)

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) # teacher can have only one account unless registering with different email
    image = models.FileField(upload_to='course-file', blank=True, null=True, default='default.jpg')
    full_name = models.CharField(max_length=100)
    bio = models.TextField(max_length=100, blank=True, null=True,)
    facebook = models.URLField(blank=True, null=True,)
    twitter = models.URLField(blank=True, null=True,)
    linkedin = models.URLField(blank=True, null=True,)
    about = models.TextField(blank=True, null=True,)
    country = models.CharField(max_length=100, blank=True, null=True,)

    def __str__(self):
        return self.full_name
    
    def students(self):
        return CartOrderItem.objects.filter(teacher=self) #get all students of teacher
    
    def courses(self):
        return Course.objects.filter(teacher=self) #total courses of a teacher
    
    def review(self):
        return Course.objects.filter(teacher=self).count() #reviews

class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.FileField(upload_to='course-file', default='category.jpg', null=True, blank=True)
    active = models.BooleanField(default=True)
    slug = models.SlugField(unique=True, null=True, blank=True)
    class Meta:
        verbose_name_plural = 'Category'
        ordering = ['title'] #acc / dec(['-title']) we use -ve sign before to indicate it is descending order
        
    def __str__(self):
        return self.title 
    
    def course_count(self):
        return Course.objects.filter(category=self).count() #count course category
    
    def save(self, *args, **kwargs): #if slug field is empty use the title as slug
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title)
        super(Category,self).save(*args, **kwargs) #save model
        
class Course(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE) #delete the course as we delete the teacher 
    file = models.FileField(upload_to='course-file',blank=True, null=True) #intro video
    image = models.FileField(upload_to='course-file',blank=True, null=True) #thumbnail
    title = models.CharField(max_length=100,)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2,default=0.00)
    language = models.CharField(max_length=100,choices=LANGUAGE, default='English')
    level = models.CharField(max_length=100, choices=LEVEL, default='Beginner')
    platform_status = models.CharField(max_length=100, choices=PLATFORM_STATUS, default='Published')
    teacher_course_status = models.CharField(choices=TEACHER_STATUS, default='Published', max_length=100)
    featured = models.BooleanField(default=False) #the course appeared as feature in the course
    course_id = ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    slug = models.SlugField(unique=True, null=True, blank=True)
    date = models.DateTimeField(default=timezone.now) #indicate when the course is published
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title)
        super(Course, self).save(*args, **kwargs)
    
    def students(self): #all student for the course
        return EnrolledCourse.objects.filter(course=self)
    
    def curriculum(self): #hold each curriculum related to course
        return Variant.objects.filter(course=self) # when we user '__' double underscore -we grabbing any filed in the variant and querying it by something
    
    def lectures(self): 
        return VariantItem.objects.filter(variant__course=self)
    
    def average_rating(self):
        average_rating = Review.objects.filter(course=self, active=True).aggregate(avg_rating=models.Avg('rating'))
        return average_rating['avg_rating']
        
    def rating_count(self):
        return Review.objects.filter(course=self, active=True).count()
    
    def reviews(self):
        return Review.objects.filter(course=self, active=True)
    
class Variant(models.Model):#section
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=1000)
    variant_id = ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title 
    
    def variant_items(self):
        return VariantItem.objects.filter(variant=self)
    
class VariantItem(models.Model): #model in section 
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name='variant_items')
    title = models.CharField(max_length=1000)
    description = models.TextField(null=True, blank=True)
    file = models.FileField(upload_to='course-file', null=True, blank=True)
    duration = models.DurationField(null=True,blank=True) #duration will be only calculated when mp4 file is uploaded.
    content_duration = models.CharField(max_length=1000, null=True, blank=True)
    preview = models.BooleanField(default=False)#video can be viewed for free
    variant_item_id = ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    
    def __str__(self):
        return f"{self.variant.title} - {self.title}"  #return variant title - variant item title
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        if self.file: # we are grabbing the file
            clip = VideoFileClip(self.file.path) #path to the file
            duration_seconds = clip.duration  #duration in seconds
            # divmod divide the first number by the second number
            minutes, remainder = divmod(duration_seconds, 60) #return tuple minute and seconds(divide seconds by 60 to 1 minute) --- converting time minutes and seconds --- e.g 3600/60 we get 60 m and remainder 0
            minutes = math.floor(minutes)
            seconds = math.floor(remainder)
            
            duration_text = f"{minutes}m {seconds}s" #write time in human readable way 20m 30s
            self.content_duration = duration_text 
            super().save(update_fields=['content_duration']) #updated field is content duration
            
class Question_Answer(models.Model):#question and answer section.
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)#we don't want question to be deleted.
    title = models.CharField(max_length=1000, null=True, blank=True)
    qa_id = ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.user.username} - {self.course.title}"  #user.username -- the person posting the question
    class Meta:
        ordering = ['-date'] # arranging question from newest to the oldest
        
    def messages(self): # message
        return Question_Answer_Message.objects.filter(question=self)
    
    def profile(self): # we can grab the profile of the person asking the question
        return Profile.objects.get(user=self.user)
    
class Question_Answer_Message(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    question = models.ForeignKey(Question_Answer, on_delete=models.CASCADE) #question they going to interact with
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    message = models.TextField(null=True, blank=True)#actual message user is going to send
    qam_id = ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    qa_id = ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.user.username} - {self.course.title}"  #user.username -- the person posting the question
    class Meta:
        ordering = ['date']
        
    def profile(self):
        return Profile.objects.get(user=self.user) 

class Cart(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2,default=0.00)
    tax_fee = models.DecimalField(max_digits=12, decimal_places=2,default=0.00)
    total = models.DecimalField(max_digits=12, decimal_places=2,default=0.00)
    country = models.CharField(max_length=100, null=True, blank=True)
    cart_id = ShortUUIDField(length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.course.title 
    
class CartOrder(models.Model):
    student = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    teachers = models.ManyToManyField(Teacher, blank=True)# we can have many teacher
    sub_total = models.DecimalField(max_digits=12,default=0.00, decimal_places=2)
    tax_fee = models.DecimalField(max_digits=12,default=0.00, decimal_places=2)
    total = models.DecimalField(max_digits=12,default=0.00, decimal_places=2)
    initial_total = models.DecimalField(max_digits=12, decimal_places=2,default=0.00)
    saved = models.DecimalField(max_digits=12, decimal_places=2,default=0.00)
    payment_status = models.CharField(choices=PAYMENT_STATUS, default="Processing", max_length=1000)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    coupons = models.ManyToManyField('api.Coupon', blank=True) #we will create coupon down but we are referencing it here
    stripe_session_id = models.CharField(max_length=1000, null=True, blank=True)
    oid =  ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-date']
    
    def order_items(self):
        return CartOrderItem.objects.filter(order=self)
    
    def __str__(self):
        return self.oid
    
class CartOrderItem(models.Model):
    order = models.ForeignKey(CartOrder, on_delete=models.CASCADE, related_name='orderitem')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='order_item')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=12, decimal_places=12, default=0.00)
    tax_fee = models.DecimalField(max_digits=12, decimal_places=12, default=0.00)
    total = models.DecimalField(max_digits=12, default=0.00, decimal_places=2)
    initial_total = models.DecimalField(max_digits=12, default=0.00, decimal_places=2)
    saved = models.DecimalField(max_digits=12,default=0.00, decimal_places=2)
    coupons = models.ManyToManyField("api.Coupon", blank=True)
    applied_coupon = models.BooleanField(default=False)
    oid =  ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-date']
    
    def order_id(self):
        return f"Order ID #{self.order.oid}" # this does not need to be serialized it is going to the admin same with payment_status -- we are field to the admin
    
    def payment_status(self):
        return f"{self.order.payment_status}"
    
    def __str__(self):
        return self.oid
    
class Certificate(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    certificate_id = ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.course.title

class CompletedLesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    variant_item = models.ForeignKey(VariantItem, on_delete=models.CASCADE) #the course that was completed
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.course.title
    
class EnrolledCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True)
    order_item = models.ForeignKey(CartOrderItem, on_delete=models.CASCADE) #the actual student enrolled in
    enrollment_id =  ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.course.title 
    
    def lectures(self):
        return VariantItem.objects.filter(variant__course=self.course)
    
    def completed_lesson(self):
        return CompletedLesson.objects.filter(course=self.course, user=self.user) #completed lesson count
    
    def curriculum(self):
        return Variant.objects.filter(course=self.course) #course we are taking e.g programming
    
    def note(self):
        return Note.objects.filter(course=self.course, user=self.user)
    
    def question_answer(self):
        return Question_Answer.objects.filter(course=self.course)
    
    def review(self):
        return Review.objects.filter(course=self.course, user=self.user).first() #we want to get the updated review
    
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=1000, null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    note_id =  ShortUUIDField(unique=True, length=6, max_length=20, alphabet='1234567890')
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    review = models.TextField()
    rating = models.IntegerField(choices=RATING, default=None)
    reply = models.CharField(null=True, blank=True, max_length=1000)#reply of the teacher
    active = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return self.course.title 
    
    def profile(self):
        return Profile.objects.get(user=self.user)

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(CartOrder, on_delete=models.SET_NULL, null=True, blank=True)
    order_item = models.ForeignKey(CartOrderItem, on_delete=models.SET_NULL, null=True, blank=True)
    review = models.ForeignKey(Review, on_delete=models.SET_NULL, null=True, blank=True)
    type = models.CharField(max_length=100, choices=NOTI_TYPE)
    seen = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.type

class Coupon(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True)
    used_by = models.ManyToManyField(User, blank=True)
    code = models.CharField(max_length=50)
    discount = models.IntegerField(default=1)
    active = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.code
    
class WishList(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.course.title)
    
class Country(models.Model):
    name = models.CharField(max_length=100)
    tax_rate = models.IntegerField(default=5)
    active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name_plural = 'Country'
    def __str__(self):
        return self.name
    
    

    
    
    