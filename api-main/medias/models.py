from django.db import models
from django.forms import ValidationError

from commons.utils.model_utils import CommonsModel
from commons.utils.enums import FeedbackType
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.urls import reverse

from commons.multi_languages.models import Language
from commons.file.models import File
from .enums import MediaStatus, MediaType
from .enums import MediaCategoryDisplayOn
from .enums import AboutEOTCImageSubType, EconomyImageSubType, ImageType, NewsImageSubType, PetitionImageSubType

User = settings.AUTH_USER_MODEL

# Create your models here.

class MediaCategory(CommonsModel):
    name = models.CharField(max_length=50)
    media_type = models.IntegerField(choices=MediaType.choices)
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.RESTRICT)
    language = models.ForeignKey(Language, on_delete=models.RESTRICT)
    media_category_tag = models.CharField(max_length=10, null=True, blank=True)
    display_on = models.IntegerField(choices=MediaCategoryDisplayOn.choices, blank=True, null=True)
    order = models.IntegerField()

    def save(self, *args, **kwargs):
        if not self.media_category_tag:
            last_media_category = MediaCategory.objects.all().order_by('media_category_tag').last()
            if last_media_category and last_media_category.media_category_tag:
                last_media_category_tag = last_media_category.media_category_tag
                media_category_tag_int = int(last_media_category_tag.split('-')[-1])
                new_media_category_tag_int = media_category_tag_int + 1
                new_media_category_tag = f"VC-{new_media_category_tag_int:03d}"
            else:
                new_media_category_tag = "VC-001"
            self.serial_number = new_media_category_tag
        super(MediaCategory, self).save(*args, **kwargs)
    
    def clean(self):
        if self.category_tag and MediaCategory.objects.filter(language=self.language, category_tag=self.category_tag).exists():
            raise ValidationError('A Category with this language already exists.')
        
    class Meta:
        unique_together = ('order', 'language', 'media_type')


class Media(CommonsModel):
    user = models.ForeignKey(User, on_delete=models.RESTRICT)
    language = models.ForeignKey(Language, null=True, on_delete=models.RESTRICT)
    media_category = models.ForeignKey(MediaCategory,null=True, on_delete=models.RESTRICT)
    title = models.TextField()
    status = models.IntegerField(choices=MediaStatus.choices, default=MediaStatus.DRAFT)
    published_at = models.DateTimeField(null=True, blank=True)
    published_by = models.ForeignKey(User, on_delete=models.RESTRICT, null=True, blank=True, related_name='media_published_by')
    media_tag = models.CharField(max_length=10, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    file = models.ForeignKey(File, null=True, on_delete=models.RESTRICT)
    url = models.URLField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if not self.media_tag:
            last_media = Media.objects.all().order_by('media_tag').last()
            if last_media and last_media.media_tag:
                last_media_tag = last_media.media_tag
                media_tag_int = int(last_media_tag.split('-')[-1])
                new_media_tag_int = media_tag_int + 1
                new_media_tag = f"V-{new_media_tag_int:03d}"
            else:
                new_media_tag = "V-001"
            self.serial_number = new_media_tag
        super(Media, self).save(*args, **kwargs)
        
    def clean(self):
        if self.media_tag and Media.objects.filter(language=self.language, media_tag=self.media_tag).exists():
            raise ValidationError('A Media with this language already exists.')
    class Meta:
        unique_together = ('language', 'media_category', 'file')
        
class MediaSetting(CommonsModel):
    file = models.ForeignKey(File, on_delete=models.RESTRICT, related_name="media_settings")
    image_type = models.IntegerField(choices=ImageType.choices)
    image_subtype = models.IntegerField()
    value = models.JSONField(blank=True, null=True)
    created_file = models.FileField(upload_to="media/", null=True, blank=True)

    def get_image_subtype_display(self):
        if self.type == ImageType.NEWS:
            return NewsImageSubType(self.subtype).label
        if self.type == ImageType.PETITION:
            return PetitionImageSubType(self.subtype).label
        if self.type == ImageType.ABOUT_EOTC:
            return AboutEOTCImageSubType(self.subtype).label
        if self.type == ImageType.ECONOMY:
            return EconomyImageSubType(self.subtype).label
        return "Unknown Subtype"
    
    def clean(self):
        super().clean()
        valid_subtypes = {
            ImageType.NEWS: [choice[0] for choice in NewsImageSubType.choices],
            ImageType.PETITION: [choice[0] for choice in PetitionImageSubType.choices],
            ImageType.ABOUT_EOTC: [choice[0] for choice in AboutEOTCImageSubType.choices],
            ImageType.ECONOMY: [choice[0] for choice in EconomyImageSubType.choices]
        }
        if self.type in valid_subtypes and self.subtype not in valid_subtypes[self.type]:
            raise ValidationError(f"Invalid subtype {self.subtype} for type {self.get_type_display()}.")
        
    
    class Meta:
        unique_together = ('file', 'image_type', 'image_subtype')
    