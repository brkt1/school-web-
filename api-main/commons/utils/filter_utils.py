from django.db.models import FileField, JSONField

def safe_all_lookups(model, field_name):
    field = model._meta.get_field(field_name)
    return [lookup for lookup in field.get_lookups().keys() if not lookup.startswith('_')]


def fields_lookups(MyModel):
    lookups = {}

    for field in MyModel._meta.fields:
        # Skip FileFields (and optionally others)
        if isinstance(field, (FileField, JSONField)):
            continue
        lookups[field.name] = list(field.get_lookups().keys())

    return lookups