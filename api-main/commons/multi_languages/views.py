from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import generics
from django.db import transaction
from commons.multi_languages.models import Language, LanguageCategory, LanguageKeyWord, LanguageTranslation
from commons.multi_languages.serializer import CustomLanguageKeyWordSerializer, LanguageSerializer, LanguageCategorySerializer, LanguageKeyWordSerializer, LanguageTranslationSerializer
from rest_framework import generics, serializers
from rest_framework.filters import OrderingFilter, SearchFilter
from django.db.models import Q, Case, When, CharField, Subquery, OuterRef
from rest_framework.pagination import PageNumberPagination

# Create your views here.


class LanguageListCreateView(generics.ListCreateAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = []
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ['name']
    ordering_fields = ['name']

    def get_queryset(self):
        code = self.request.query_params.get('code')
        if code is not None:
            self.queryset = self.queryset.filter(code=code)
        return self.queryset

class LanguageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class LanguageCategoryListCreateView(generics.ListCreateAPIView):
    queryset = LanguageCategory.objects.all()
    serializer_class = LanguageCategorySerializer
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ['name']
    ordering_fields = ['name']


class LanguageCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LanguageCategory.objects.all()
    serializer_class = LanguageCategorySerializer


class LanguageKeyWordListCreateView(generics.ListCreateAPIView):
    queryset = LanguageKeyWord.objects.all()
    serializer_class = CustomLanguageKeyWordSerializer
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ['original']
    ordering_fields = ['original']

    def get_queryset(self):
        category = self.request.query_params.get('category')
        original_language = self.request.query_params.get('original_language')
        translated_language = self.request.query_params.get('translated_language')
        
        original_query = LanguageTranslation.objects.filter(
            key_id=OuterRef('pk'),
            language_id=original_language
        ).values('value')[:1]
        
        translated_query = LanguageTranslation.objects.filter(
            key_id=OuterRef('pk'),
            language_id=translated_language
        ).values('value')[:1]
        
        queryset = LanguageKeyWord.objects.filter(category=category).annotate(
            original=Subquery(original_query, output_field=CharField()),
            translated=Subquery(translated_query, output_field=CharField())
        )
        return queryset


class LanguageKeyWordDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LanguageKeyWord.objects.all()
    serializer_class = LanguageKeyWordSerializer

class UnlimitedPagination(PageNumberPagination):
    page_size = 1000000  # Set an arbitrarily large page size

class LanguageTranslationListCreateView(generics.ListCreateAPIView):
    queryset = LanguageTranslation.objects.all()
    serializer_class = LanguageTranslationSerializer
    permission_classes = []
    pagination_class = UnlimitedPagination

    def get_queryset(self):
        params = self.request.query_params
        language = params.get("language")
        category = params.get("category")
        locale = params.get("locale")
        if language is not None:
            self.queryset = self.queryset.filter(language=language)
        if category is not None:
            self.queryset = self.queryset.filter(category=category)
        if locale is not None:
            self.queryset = self.queryset.filter(language__code=locale)
        return self.queryset

    def perform_create(self, serializer):
        LanguageTranslation.objects.update_or_create(language=serializer.validated_data["language"], category=serializer.validated_data["category"], key=serializer.validated_data["key"], defaults={"value": serializer.validated_data["value"]})
        return HttpResponse({'status': 201})

    def put(self, request):
        categories = request.data['translations']
        name = request.data["name"]
        code = request.data["code"]
        with transaction.atomic():
            language, _ = Language.objects.get_or_create(name=name, code=code)
            for category in categories:
                keys = categories[category]
                cat, _ = LanguageCategory.objects.get_or_create(name=category)
                for key in keys:
                    k, _ = LanguageKeyWord.objects.get_or_create(
                        key=key, category=cat)
                    translation = keys[key]
                    if (not isinstance(translation, (int, float, complex, str))):
                        raise serializers.ValidationError(
                            "Please Insert valid Data")
                    t = LanguageTranslation.objects.get_or_create(
                        language=language, category=cat, key=k, defaults={'value': translation})
        return HttpResponse({'status': 200})


class LanguageTranslationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LanguageTranslation.objects.all()
    serializer_class = LanguageTranslationSerializer
