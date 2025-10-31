import uuid
from django.db import models
from commons.utils.model_utils import CommonsModel

# Create your models here.
class Language(CommonsModel):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=12)
    icon = models.CharField(max_length=10, blank=True, null=True)

class LanguageCategory(CommonsModel):
    name = models.TextField()
    
class LanguageKeyWord(CommonsModel):
    key = models.TextField()
    category = models.ForeignKey(LanguageCategory, on_delete=models.CASCADE)
    
class LanguageTranslation(CommonsModel):
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    category = models.ForeignKey(LanguageCategory, on_delete=models.CASCADE)
    key = models.ForeignKey(LanguageKeyWord, on_delete=models.CASCADE)
    value = models.TextField()