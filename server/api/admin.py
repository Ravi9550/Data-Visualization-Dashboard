from django.contrib import admin
from import_export import resources, fields
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import DateTimeWidget
from .models import Report
from datetime import datetime

# Define Import/Export Resource
class ReportResource(resources.ModelResource):
    # Explicitly define fields with DateTimeWidget to handle custom formats
    added = fields.Field(
        column_name='added',
        attribute='added',
        widget=DateTimeWidget(format='%B, %d %Y %H:%M:%S')  # Expected format: "July, 03 2016 05:28:48"
    )
    published = fields.Field(
        column_name='published',
        attribute='published',
        widget=DateTimeWidget(format='%B, %d %Y %H:%M:%S')  # Adjust format if needed
    )

    class Meta:
        model = Report

    def before_import_row(self, row, **kwargs):
        """Convert string dates to correct format before saving."""
        date_fields = ['added', 'published']
        for field in date_fields:
            if row.get(field):  # Check if field exists and is not empty
                try:
                    row[field] = datetime.strptime(row[field], "%B, %d %Y %H:%M:%S")  # Convert to datetime
                except ValueError:
                    try:
                        row[field] = datetime.strptime(row[field], "%B, %d %Y %H:%M")
                    except ValueError:
                        row[field] = None  # Set to None if format is incorrect

# Properly Register ReportAdmin
@admin.register(Report)
class ReportAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ReportResource  # Use the custom resource class

    list_display = ('title', 'sector', 'topic', 'intensity', 'relevance', 'likelihood', 'end_year', 'region', 'pestle', 'source', 'country')
    search_fields = ('title', 'sector', 'topic', 'region', 'source', 'country')
    list_filter = ('end_year', 'sector', 'topic', 'region', 'pestle', 'source', 'country')
