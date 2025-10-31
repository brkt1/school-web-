from django.apps import AppConfig
from watson import search


class FileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'commons.file'

    def ready(self):
        FolderModel = self.get_model("Folder")
        search.register(FolderModel, field_overrides=("folder_name",))

        FileModel = self.get_model("File")
        search.register(FileModel, field_overrides=("file_name",))