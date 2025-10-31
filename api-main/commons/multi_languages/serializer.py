from rest_framework import serializers

from commons.multi_languages.models import Language, LanguageCategory, LanguageKeyWord, LanguageTranslation

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'
        
class LanguageCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageCategory
        fields = '__all__'

class LanguageKeyWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageKeyWord
        fields = '__all__'
        
class LanguageTranslationSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(queryset=LanguageCategory.objects.all(), source='category', required=False, write_only=True)
    category = LanguageCategorySerializer(read_only=True)
    key = LanguageKeyWordSerializer(read_only=True)
    key_id = serializers.PrimaryKeyRelatedField(queryset=LanguageKeyWord.objects.all(), source='key', required=False, write_only=True)
    language = LanguageSerializer(read_only=True)
    language_id = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all(), source='language', required=False, write_only=True)
        
    class Meta:
        model = LanguageTranslation
        fields = '__all__'

class CustomLanguageKeyWordSerializer(serializers.ModelSerializer):
    original = serializers.CharField(read_only=True)
    translated = serializers.CharField(read_only=True)
    category = LanguageCategorySerializer(read_only=True)

    class Meta:
        model = LanguageKeyWord
        fields = ['id','key', 'original', 'translated', 'category']