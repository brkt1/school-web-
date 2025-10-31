from django.urls import path
from .views import LanguageListCreateView, LanguageDetail, LanguageCategoryListCreateView, LanguageCategoryDetail, LanguageKeyWordListCreateView , LanguageKeyWordDetail, LanguageTranslationListCreateView, LanguageTranslationDetail

urlpatterns = [
    path('languages', LanguageListCreateView.as_view(), name='language-list'),
    path('languages/<uuid:pk>/', LanguageDetail.as_view(), name='language-detail'),
    path('language_category', LanguageCategoryListCreateView.as_view(), name='language_category-list'),
    path('language_category/<uuid:pk>/', LanguageCategoryDetail.as_view(), name='language_category-detail'),
    path('language_keyword', LanguageKeyWordListCreateView.as_view(), name='language_keyword-list'),
    path('language_keyword/<uuid:pk>/', LanguageKeyWordDetail.as_view(), name='language_keword-detail'),
    path('language_translation', LanguageTranslationListCreateView.as_view(), name='language_translation-list'),
    path('language_tanslation/<uuid:pk>/', LanguageTranslationDetail.as_view(), name='language_translation-detail'),
]
