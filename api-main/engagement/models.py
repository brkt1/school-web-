from django.db import models
from commons.utils.model_utils import CommonsModel

# Create your models here.
class News(CommonsModel):
    def uploadFiles(instance, file_name):
        url = f"news/{instance}/{file_name}"
        return url
    title = models.TextField()
    main_content = models.TextField()
    short_description = models.TextField()
    image = models.FileField(upload_to=uploadFiles, blank=True)

    def __str__(self):
        return self.title

class Blog(CommonsModel):
    def uploadFiles(instance, file_name):
        url = f"blogs/{instance}/{file_name}"
        return url
    title = models.TextField()
    thumbnail = models.FileField(upload_to=uploadFiles, blank=True)
    short_description = models.TextField()
    main_content = models.TextField()


    def __str__(self):
        return self.title
    
class Testimonial(CommonsModel):
    def uploadFiles(instance, file_name):
        url = f"testimonial/{instance}/{file_name}"
        return url
    name = models.TextField()
    profile = models.FileField(upload_to=uploadFiles, blank=True)
    job = models.TextField()
    review = models.TextField()


    def __str__(self):
        return self.name
    
class Gallery(CommonsModel):
    def uploadFiles(instance, file_name):
        url = f"gallery/{instance}/{file_name}"
        return url
    title = models.TextField()
    image = models.FileField(upload_to=uploadFiles, null=True)
    url = models.URLField(null=True, blank=True)


    def __str__(self):
        return self.title