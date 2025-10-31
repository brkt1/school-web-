from django.db import models

from commons.utils.model_utils import CommonsModel
from commons.utils.enums import FeedbackType
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.urls import reverse

User = settings.AUTH_USER_MODEL

# Create your models here.

class Feedbacks(CommonsModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey("self",related_name="replies", null=True, on_delete=models.CASCADE)
    feedback = models.TextField()
    feedback_type = models.IntegerField(choices=FeedbackType.choices)

    class Meta:
        ordering = ('-create_date',)

    @property
    def submission_date(self):
        return self.create_date

    @property
    def username(self):
        return self.user.first_name + ' ' + self.user.middle_name + ' ' + self.user.last_name

    @property
    def no_of_replies(self):
        return Feedbacks.objects.filter(parent=self).count()
        


class ContactUs(CommonsModel):
    full_name = models.CharField(max_length=300)
    email = models.EmailField()
    phone_number = models.TextField(_(""), null=True, blank=True)
    subject  = models.TextField()
    message = models.TextField()

    def __str__(self):
        return self.full_name

    def get_absolute_url(self):
        return reverse("contact_us-detail", kwargs={"pk": self.pk})
    
    @property
    def detail_url(self):
        return self.get_absolute_url()