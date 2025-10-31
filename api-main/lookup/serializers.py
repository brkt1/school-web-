from rest_framework import serializers
from lookup.models import Level
from lookup.models import Package
from lookup.models import ClassType
from lookup.models import Shift

class LevelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Level
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Package
        fields = '__all__'

class ClassTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ClassType
        fields = '__all__'

class ShiftSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Shift
        fields = '__all__'

