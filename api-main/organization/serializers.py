from rest_framework import serializers
from accounts.enums import ShiftDays
from commons.utils.serializers import CommonSerializer
from lookup.serializers import PackageSerializer, ShiftSerializer, LevelSerializer, ClassTypeSerializer
from organization.models import Region
from organization.models import City
from organization.models import Institution
from organization.models import ClassRoom
from organization.models import ClassRoomShift
from organization.models import TeamMember
from lookup.models import Level

class RegionSerializer(CommonSerializer):
    
    class Meta:
        model = Region
        fields = '__all__'

class CitySerializer(CommonSerializer):
    region_detail = RegionSerializer(source='region', read_only=True)

    class Meta:
        model = City
        fields = '__all__'

class InstitutionSerializer(CommonSerializer):
    region_detail = RegionSerializer(source='region', read_only=True)
    city_detail = CitySerializer(source='city', read_only=True)
    region = serializers.PrimaryKeyRelatedField(read_only=True)
    level = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Level.objects.all(),
        required=False
    )
    level_detail = LevelSerializer(source='level', many=True, read_only=True)

    class Meta:
        model = Institution
        fields = '__all__'
    
    def create(self, validated_data):
        levels = validated_data.pop('levels', [])
        city   = validated_data.get('city')
        if city and not validated_data.get('region'):
            validated_data['region'] = city.region

        inst = super().create(validated_data)
        if levels:
            inst.levels.set(levels)
        return inst

    def update(self, instance, validated_data):
        levels = validated_data.pop('levels', None)
        city   = validated_data.get('city')
        if city:
            validated_data['region'] = city.region

        inst = super().update(instance, validated_data)
        if levels is not None:
            inst.levels.set(levels)
        return inst
    
class ShiftDaysSerializer(serializers.Serializer):
    value = serializers.IntegerField()
    label = serializers.SerializerMethodField()

    def get_label(self, obj):
        return ShiftDays(obj['value']).label


class TimeSlotSerializer(serializers.Serializer):
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()

class ClassRoomSerializer(CommonSerializer):
    institution_detail = InstitutionSerializer(source='institution', read_only=True)
    class_type_detail = ClassTypeSerializer(source='class_type', read_only=True)

    class Meta:
        model = ClassRoom
        fields = '__all__'

class ClassRoomShiftSerializer(CommonSerializer):
    class_room_detail = ClassRoomSerializer(source='class_room', read_only=True)
    package_detail = PackageSerializer(source='package', read_only=True)
    shift_times_detail = ShiftSerializer(source='shift_times', read_only=True)

    class Meta:
        model = ClassRoomShift
        fields = '__all__'

class TeamMemberSerializer(CommonSerializer):
    
    class Meta:
        model = TeamMember
        fields = '__all__'

