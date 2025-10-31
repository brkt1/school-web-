from django.db import models


class COURSE_TYPE(models.IntegerChoices):
    FREE = 100
    PREMIUM = 101
    SPONSORED = 102

class COURSE_LEVEL(models.IntegerChoices):
    BEGINNER = 100
    INTERMEDIATE = 101
    ADVANCED = 102

class CART_STATUS(models.IntegerChoices):
    ORDERED = 100
    ENROLLED = 101

class RATING_VALUES(models.IntegerChoices):
    EXCELENT = 5 
    VERY_GOOD = 4 
    GOOD = 3
    NOT_BAD = 2 
    BAD = 1

class REVIEW_TYPE(models.IntegerChoices):
    COURSE = 100
    TUTOR = 101

class PROGRESS_STATUS(models.IntegerChoices):
    STARTED = 100
    ON_PROGRESS = 101
    FINISHED = 102


class CONTENT_TYPE(models.IntegerChoices):
    VIDEO = 100
    IMAGE = 101
    DOCUMENT = 102
    # QUESTION = 103
    # YOUTUBE_VIDEO = 104

class File_TYPE(models.IntegerChoices):
    TEMPORARY = 100
    PERMANENT = 101

# class CONTENT_TYPE(models.IntegerChoices):
#     IMAGE = 100
    
class COURSE_STATUS(models.IntegerChoices):
    DRAFT = 100
    READY_FOR_PUBLISHING = 101
    PUBLISHED = 102


class EDUCATIONAL_LEVEL(models.IntegerChoices):
    Elementary = 100
    Secondary = 101
    Level_III_Diploma_TVET = 102
    Bachelor_of_Education = 103
    Bachelor_of_Arts_or_Science = 104
    Master = 105
    Doctorate = 106

class FeedbackType(models.IntegerChoices):
    SEND = 100
    REPLAY = 101

class UserType(models.IntegerChoices):
    STUDENT=100
    TEACHER=101
    ADMIN=102

class LanguageType(models.TextChoices):
    ENGLISH = 'eng'
    AMHARIC = 'amh'
    OROMIFFA = 'oro'

class ActionStatus(models.IntegerChoices):
    SUBMITTED = 100
    APPROVED = 101
    REJECTED = 102

class GenderType(models.IntegerChoices):
    MALE = 100
    FEMALE = 101
class TutorType(models.TextChoices):
    G1_4="1-4"
    G5_8="5-8"
    G9_10="9-10"
    G11_12="11-12"

   

class ContractStatus(models.IntegerChoices):
    REQUESTED = 100
    ACCEPTED = 101
    SUSPEND = 102
    TERMINATED = 103
    REJECTED= 104
    

class PaymentStatus(models.IntegerChoices):
    NOT_PAID = 100
    PAID = 101
    CANCLED = 102
    REFENDED = 103
    NEED_APPROVAL = 104

class PaymentType(models.IntegerChoices):
    CASH = 100
    BANK = 101

class AdvertPosition(models.IntegerChoices):
    TOP = 100
    MIDDLE = 101
    BOTTEM = 102
    LEFT = 103 
    RIGHT = 104   
class AdvertStatus(models.IntegerChoices):
    ACTIVE = 100
    INACTIVE = 101
     

class Days(models.IntegerChoices):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    TJURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7

class LocationType(models.IntegerChoices):
    REGION = 100
    ZONE = 101
    WOREDA = 102

class AnswerType(models.IntegerChoices):
    SINGLE = 100
    MULTIPLE = 101
    
class AttendanceStatus(models.IntegerChoices):
    SUBMITTED = 100
    RESUBMITTED = 101
    ACCEPTED = 102
    REJECTED = 103