from django.db import models

class MediaStatus(models.IntegerChoices):
    DRAFT = 100
    PUBLISHED = 101
    ARCHIVED = 102
    
class MediaCategoryDisplayOn(models.IntegerChoices):
    HOME = 100

class MediaType(models.IntegerChoices):
    VIDEO = 100
    IMAGE = 101
    AUDIO = 102
    DOCUMENT = 103

class ImageType(models.IntegerChoices):
    NEWS = 100
    PETITION = 101
    ABOUT_EOTC = 102
    ECONOMY = 103

class NewsImageSubType(models.IntegerChoices):
    HOME_CENTER = 100
    HOME_RIGHT = 101
    CARD_THUMBNAIL = 102
    DETAIL_THUMBNAIL = 103
    FEATURE_IMAGE = 104

class AboutEOTCImageSubType(models.IntegerChoices):
    HOME_CENTER = 100
    HOME_RIGHT = 101
    CARD_THUMBNAIL = 102
    DETAIL_THUMBNAIL = 103
    FEATURE_IMAGE = 104

class EconomyImageSubType(models.IntegerChoices):
    HOME_CENTER = 100
    HOME_RIGHT = 101
    CARD_THUMBNAIL = 102
    DETAIL_THUMBNAIL = 103
    FEATURE_IMAGE = 104

class PetitionImageSubType(models.IntegerChoices):
    CARD_THUMBNAIL = 100
    DETAIL_THUMBNAIL = 101