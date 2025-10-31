import mimetypes
from django.db import models
from commons.utils.enums import File_TYPE, CONTENT_TYPE
from commons.utils.model_utils import CommonsModel
from rest_framework import serializers
# Create your models here.

class Folder(CommonsModel):
    folder_name = models.CharField(max_length=1000, blank=True, null=True, unique=True)
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.RESTRICT)

class File(CommonsModel):
    file_name = models.CharField(max_length=1000, blank=True, null=True)
    content_type = models.IntegerField(choices=CONTENT_TYPE.choices, blank=True, null=True)
    target =  models.UUIDField(blank=True,null=True)
    is_downloaded = models.BooleanField(default=False, blank=True, null=True)
    folder = models.ForeignKey(Folder, null=True, blank=True, on_delete=models.RESTRICT)
    url = models.FileField(upload_to="media/",help_text="Enter valid file")
    file_type = models.IntegerField(choices=File_TYPE.choices, blank=True, null=True)
    file_size = models.BigIntegerField(blank=True, null=True)  # Add file_size field

    class Meta:
        unique_together = ('file_name',)
    
    def save(self, *args, **kwargs):
        if self.url and not self.pk:
            # Set file_name from the uploaded file's name
            self.file_name = self.url.name

            # Determine the MIME type of the uploaded file
            mime_type, _ = mimetypes.guess_type(self.url.name)

            # Map MIME type to content_type
            if mime_type:
                if mime_type.startswith('video/'):
                    self.content_type = CONTENT_TYPE.VIDEO
                elif mime_type.startswith('image/'):
                    self.content_type = CONTENT_TYPE.IMAGE
                elif mime_type in ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']:
                    self.content_type = CONTENT_TYPE.DOCUMENT
                # Add more conditions if needed

            # Set file size
            self.file_size = self.url.size

        super().save(*args, **kwargs)  # Save again to update the changes
    
